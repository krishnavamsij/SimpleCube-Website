"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronRight, Send, X, Search, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import {
    normalizeProductLinksInText,
    normalizeProductRoute,
} from "@/lib/product-route-normalizer";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
    text: string;
    isUser: boolean;
    timestamp: string;
}

interface ApiResponse {
    message: string;
    status?: string;
    route?: string;
    target_route?: string;
    detected_intent?: string;
}

type SpeechRecognitionResultEventLike = Event & {
    resultIndex: number;
    results: {
        length: number;
        [index: number]: {
            isFinal: boolean;
            0: { transcript: string };
        };
    };
};

type SpeechRecognitionErrorEventLike = Event & {
    error?:
        | "aborted"
        | "audio-capture"
        | "bad-grammar"
        | "language-not-supported"
        | "network"
        | "no-speech"
        | "not-allowed"
        | "phrases-not-supported"
        | "service-not-allowed"
        | string;
};

type SpeechRecognitionLike = {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    abort: () => void;
    onresult: ((event: SpeechRecognitionResultEventLike) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
    onend: (() => void) | null;
};

type SpeechRecognitionConstructorLike = new () => SpeechRecognitionLike;

declare global {
    interface Window {
        SpeechRecognition?: SpeechRecognitionConstructorLike;
        webkitSpeechRecognition?: SpeechRecognitionConstructorLike;
    }
}

const HYNIVA_ONLY_MESSAGE =
    "I can't help with that. I can help only with information related to Hyniva.";

// ─── Storage & session (behavior only — no UI) ───────────────────────────────
const STORAGE_KEYS = {
    SESSION_ID: "aira_chat_session_id",
    MESSAGES: "aira_chat_messages",
    IS_OPEN: "aira_chat_is_open",
} as const;

const HYNIVA_HOSTS = new Set(["hyniva.com", "www.hyniva.com"]);

function generateSessionId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function emitNavigate(url: string) {
    window.dispatchEvent(new CustomEvent("aira:navigate", { detail: { url } }));
}

function splitUrlAndTrailingPunctuation(raw: string) {
    let href = raw;
    let trailing = "";
    const trailingPattern = /[)\]}"'.,;:!?•·»]+$/;
    while (href.length > 0) {
        const match = href.match(trailingPattern);
        if (!match) break;
        const chunk = match[0];
        if (chunk.includes(")")) {
            const opens = (href.match(/\(/g) || []).length;
            const closes = (href.match(/\)/g) || []).length;
            if (closes <= opens) break;
        }
        trailing = chunk + trailing;
        href = href.slice(0, -chunk.length);
    }
    return { href, trailing };
}

function parseMessageForUrls(text: string) {
    const urlRegex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;
    const parts: { type: "text" | "url"; content: string }[] = [];
    let last = 0;
    for (const m of Array.from(text.matchAll(urlRegex))) {
        const raw = m[0];
        const start = m.index!;
        if (start > last) parts.push({ type: "text", content: text.slice(last, start) });
        const { href, trailing } = splitUrlAndTrailingPunctuation(raw);
        let isValid = false;
        try { new URL(href); isValid = true; } catch { isValid = false; }
        if (isValid) {
            parts.push({ type: "url", content: href });
            if (trailing) parts.push({ type: "text", content: trailing });
        } else {
            parts.push({ type: "text", content: raw });
        }
        last = start + raw.length;
    }
    if (last < text.length) parts.push({ type: "text", content: text.slice(last) });
    return parts.length ? parts : [{ type: "text" as const, content: text }];
}

function buildSpeechText(text: string) {
    return parseMessageForUrls(text)
        .filter((part) => part.type !== "url")
        .map((part) => part.content)
        .join("")
        .replace(/\s+/g, " ")
        .trim();
}

// Script → BCP-47 language tag mapping
const SCRIPT_LANGUAGE_MAP: Array<[RegExp, string]> = [
    [/\p{Script=Devanagari}/u, "hi-IN"],
    [/\p{Script=Bengali}/u, "bn-IN"],
    [/\p{Script=Gujarati}/u, "gu-IN"],
    [/\p{Script=Gurmukhi}/u, "pa-IN"],
    [/\p{Script=Kannada}/u, "kn-IN"],
    [/\p{Script=Malayalam}/u, "ml-IN"],
    [/\p{Script=Tamil}/u, "ta-IN"],
    [/\p{Script=Telugu}/u, "te-IN"],
    [/\p{Script=Arabic}/u, "ar"],
    [/\p{Script=Hebrew}/u, "he-IL"],
    [/\p{Script=Thai}/u, "th-TH"],
    [/\p{Script=Han}/u, "zh-CN"],
    [/\p{Script=Hiragana}|\p{Script=Katakana}/u, "ja-JP"],
    [/\p{Script=Hangul}/u, "ko-KR"],
    [/\p{Script=Cyrillic}/u, "ru-RU"],
    [/\p{Script=Greek}/u, "el-GR"],
];

/** Returns the BCP-47 language tag for a single character, or "en-US" for Latin/other. */
function charLanguage(char: string): string {
    return SCRIPT_LANGUAGE_MAP.find(([pattern]) => pattern.test(char))?.[1] ?? "en-US";
}

/** Detect the dominant (most-frequent) language in text — used for voice input. */
function detectSpeechLanguage(text: string): string {
    return SCRIPT_LANGUAGE_MAP.find(([pattern]) => pattern.test(text))?.[1] ?? "en-US";
}

/**
 * Split text into contiguous segments where each segment shares the same
 * script/language. Adjacent segments of the same language are merged.
 * Pure whitespace is attached to the preceding segment (or the next one if
 * it's the very start) so TTS pauses are natural.
 */
function splitIntoLanguageSegments(text: string): Array<{ text: string; lang: string }> {
    if (!text) return [];

    const segments: Array<{ text: string; lang: string }> = [];
    let currentLang = "";
    let currentChunk = "";

    for (const char of text) {
        // Whitespace: carry it along with the current chunk
        if (/\s/.test(char)) {
            currentChunk += char;
            continue;
        }

        const lang = charLanguage(char);

        if (lang !== currentLang) {
            if (currentChunk.trim()) {
                segments.push({ text: currentChunk, lang: currentLang || "en-US" });
            } else if (currentChunk && segments.length > 0) {
                // Carry leading/trailing whitespace into previous segment
                segments[segments.length - 1].text += currentChunk;
            }
            currentLang = lang;
            currentChunk = char;
        } else {
            currentChunk += char;
        }
    }

    if (currentChunk.trim()) {
        segments.push({ text: currentChunk, lang: currentLang || "en-US" });
    } else if (currentChunk && segments.length > 0) {
        segments[segments.length - 1].text += currentChunk;
    }

    return segments;
}

async function getSpeechSynthesisVoices() {
    if (!("speechSynthesis" in window)) return [];

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) return voices;

    return new Promise<SpeechSynthesisVoice[]>((resolve) => {
        const timeout = window.setTimeout(() => {
            window.speechSynthesis.onvoiceschanged = null;
            resolve(window.speechSynthesis.getVoices());
        }, 600);

        window.speechSynthesis.onvoiceschanged = () => {
            window.clearTimeout(timeout);
            window.speechSynthesis.onvoiceschanged = null;
            resolve(window.speechSynthesis.getVoices());
        };
    });
}

function getPreferredAiraVoice(language: string, voices: SpeechSynthesisVoice[]) {
    if (voices.length === 0) return null;

    const normalizedLanguage = language.toLowerCase();
    const languagePrefix = normalizedLanguage.split("-")[0];

    const sweetFemaleNames = [
        "samantha",
        "jenny",
        "aria",
        "zira",
        "susan",
        "linda",
        "victoria",
        "karen",
        "moira",
        "tessa",
        "google us english",
        "google uk english female",
        "microsoft aria",
        "microsoft jenny",
        "microsoft zira",
        "microsoft heera",
        "microsoft kalpana",
        "microsoft kalpana mobile",
        "microsoft heera mobile",
        "chitra",
        "shruti",
        "swara",
        "pallavi",
        "priya",
        "neerja",
        "sunita",
        "neelam",
        "ananya",
        "meera",
        "lekha",
        "veena",
        "female",
        "woman",
    ];
    const maleNames = [
        "david",
        "mark",
        "george",
        "ravi",
        "alex",
        "daniel",
        "fred",
        "tom",
        "male",
        "man",
    ];

    const scoreVoice = (voice: SpeechSynthesisVoice) => {
        const name = voice.name.toLowerCase();
        const voiceLanguage = voice.lang.toLowerCase();
        let score = 0;

        if (voiceLanguage === normalizedLanguage) score += 240;
        else if (voiceLanguage.startsWith(`${languagePrefix}-`)) score += 200;
        else if (voiceLanguage.startsWith("en-")) score += 20;

        if (sweetFemaleNames.some((femaleName) => name.includes(femaleName))) score += 90;
        if (maleNames.some((maleName) => name.includes(maleName))) score -= 90;
        if (voice.default) score += 2;

        return score;
    };

    const nonMaleVoices = voices.filter((voice) => {
        const name = voice.name.toLowerCase();
        return !maleNames.some((maleName) => name.includes(maleName));
    });
    const candidates = nonMaleVoices.length > 0 ? nonMaleVoices : voices;

    return candidates.toSorted((a, b) => scoreVoice(b) - scoreVoice(a))[0] || null;
}

function toInAppPath(url: string): string | null {
    const trimmed = url.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
        return normalizeProductRoute(trimmed);
    }
    try {
        const parsed = new URL(trimmed, window.location.origin);
        const path = normalizeProductRoute(parsed.pathname + parsed.search + parsed.hash);
        if (parsed.origin === window.location.origin) return path || "/";
        const host = parsed.hostname.replace(/^www\./, "");
        if (HYNIVA_HOSTS.has(parsed.hostname) || host === "hyniva.com") return path || "/";
    } catch {
        if (trimmed.startsWith("/")) return trimmed;
    }
    return null;
}

function navigateFromChat(url: string) {
    const inAppPath = toInAppPath(url);
    if (inAppPath) emitNavigate(inAppPath);
    else window.location.assign(url);
}

function getSpeechRecognitionConstructor() {
    if (typeof window === "undefined") return null;
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function getSpeechRecognitionErrorMessage(error?: string) {
    switch (error) {
        case "audio-capture":
            return "No microphone was found. Please check your input device.";
        case "language-not-supported":
            return "Voice input does not support this language. Try again.";
        case "network":
            return "Voice input had a network issue. Tap the mic to try again.";
        case "no-speech":
            return "I didn't catch that. Tap the mic and try again.";
        case "not-allowed":
        case "service-not-allowed":
            return "Microphone access was blocked.";
        default:
            return "Voice input could not start. Please try again.";
    }
}

/** Only permanently disable mic when the user has blocked microphone permission. */
function shouldDisableVoiceInputAfterError(error?: string) {
    return error === "not-allowed" || error === "service-not-allowed";
}

/** Wipe legacy persisted chat so a full browser refresh always starts clean. */
function clearStaleChatStorage() {
    try {
        for (const key of Object.values(STORAGE_KEYS)) {
            sessionStorage.removeItem(key);
            localStorage.removeItem(key);
        }
    } catch { /* ignore */ }
}

function MessageContent({ text }: { text: string; isUser: boolean }) {
    const handleUrlClick = (e: React.MouseEvent | React.KeyboardEvent, url: string) => {
        e.preventDefault();
        e.stopPropagation();
        navigateFromChat(url);
    };

    return (
        <>
            {parseMessageForUrls(text).map((n, i) =>
                n.type === "url" ? (
                    <span
                        key={i}
                        role="link"
                        tabIndex={0}
                        onClick={(e) => handleUrlClick(e, n.content)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") handleUrlClick(e, n.content);
                        }}
                        style={{ color: "#0066cc", textDecoration: "underline", wordBreak: "break-all", cursor: "pointer" }}
                    >
                        {n.content}
                    </span>
                ) : <span key={i}>{n.content}</span>
            )}
        </>
    );
}

function generateFallbackResponse(message: string): string {
    const msg = message.toLowerCase();
    if (["hi", "hello", "hey"].includes(msg) || msg.startsWith("hi ")) {
        return "Hi! I'm AIRA — Hyniva's AI assistant. I can help you learn about our products, services, industries we serve, or connect you with our team. What would you like to know?";
    }
    return "";
}

const subscribeToClientMount = () => () => undefined;
const getClientMountSnapshot = () => true;
const getServerMountSnapshot = () => false;

function BodyPortal({ children }: { children: React.ReactNode }) {
    const mounted = useSyncExternalStore(
        subscribeToClientMount,
        getClientMountSnapshot,
        getServerMountSnapshot,
    );
    if (!mounted) return null;
    return createPortal(children, document.body);
}

function ClearConfirmDialog({
    onConfirm,
    onCancel,
}: {
    onConfirm: () => void;
    onCancel: () => void;
}) {
    return (
        <div
            style={{
                position: "absolute",
                top: 64,
                left: 0,
                right: 0,
                zIndex: 10,
                display: "flex",
                justifyContent: "center",
                padding: "0 24px",
            }}
        >
            <div
                style={{
                    background: "#fff",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: 12,
                    padding: "16px 20px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    width: "100%",
                    maxWidth: 480,
                }}
            >
                <span style={{ fontSize: 13, color: "#374151", flex: 1 }}>
                    Clear all messages? This cannot be undone.
                </span>
                <button
                    type="button"
                    onClick={onCancel}
                    style={{
                        padding: "6px 14px",
                        borderRadius: 8,
                        border: "1px solid #d1d5db",
                        background: "#fff",
                        fontSize: 13,
                        cursor: "pointer",
                        color: "#374151",
                    }}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    style={{
                        padding: "6px 14px",
                        borderRadius: 8,
                        border: "none",
                        background: "#ef4444",
                        color: "#fff",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    Clear
                </button>
            </div>
        </div>
    );
}

// ─── Brand colours ────────────────────────────────────────────────────────────
const GREEN = "#00c9b1";
const GREEN_LIGHT = "#e6faf8";
const DARK_TEXT = "#1e293b";

// ─── Main Widget ──────────────────────────────────────────────────────────────
export function AskAiraWidget() {
    const router = useRouter();
    const pathname = usePathname();

    // scroll / hover state for show/hide
    const [isMiddle, setIsMiddle] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // chat state
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isVoiceInputUnavailable, setIsVoiceInputUnavailable] = useState(false);
    const [speechError, setSpeechError] = useState("");
    const [speakingMessageIndex, setSpeakingMessageIndex] = useState<number | null>(null);
    const [hasSpeechRecognition, setHasSpeechRecognition] = useState(false);
    const isSpeechSupported = hasSpeechRecognition && !isVoiceInputUnavailable;

    // Detect SpeechRecognition support on the client only (not during SSR)
    useEffect(() => {
        setHasSpeechRecognition(Boolean(getSpeechRecognitionConstructor()));
    }, []);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatInputRef = useRef<HTMLInputElement>(null);
    const isSendingRef = useRef(false);
    const sessionIdRef = useRef("");
    const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
    const listeningBaseInputRef = useRef("");
    const isStoppingVoiceInputRef = useRef(false);

    // ── Intersection observer for hero / footer ──
    // Re-runs on every route change so observers point to the new page's DOM.
    useEffect(() => {
        const footerEl = document.getElementById("site-footer");

        // By default, the widget is minimized on all pages.
        // It expands (isMiddle = false) only when the hero section or footer is visible.
        let isTop = window.scrollY < 150;
        let footerVisible = false;
        let hideTimer: ReturnType<typeof setTimeout> | null = null;

        // Apply initial state after the effect subscribes to the page DOM.
        const initialFrame = requestAnimationFrame(() => setIsMiddle(!isTop));

        const update = () => {
            const shouldBeMiddle = !isTop && !footerVisible;

            if (hideTimer) {
                clearTimeout(hideTimer);
                hideTimer = null;
            }

            if (!shouldBeMiddle) {
                // Top of page or footer is visible — show full capsule immediately.
                setIsMiddle(false);
            } else {
                // In middle section — minimize immediately with smooth animation.
                setIsMiddle(true);
            }
        };

        const handleScroll = () => {
            let newIsTop = false;
            
            if (pathname === "/") {
                const trustBarEl = document.getElementById("trust-bar-section");
                if (trustBarEl) {
                    const rect = trustBarEl.getBoundingClientRect();
                    // Widget stays expanded (newIsTop = true) as long as Trust Bar section 
                    // ("Clients that chose depth over headcount") is more than 100px below the bottom edge of the screen.
                    newIsTop = rect.top > window.innerHeight - 100;
                } else {
                    newIsTop = window.scrollY < 150;
                }
            } else {
                newIsTop = window.scrollY < 150;
            }

            if (newIsTop !== isTop) {
                isTop = newIsTop;
                update();
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        const footerObs = new IntersectionObserver(([e]) => {
            footerVisible = e.isIntersecting;
            update();
        }, { threshold: 0.1 });

        if (footerEl) footerObs.observe(footerEl);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            footerObs.disconnect();
            cancelAnimationFrame(initialFrame);
            if (hideTimer) clearTimeout(hideTimer);
        };
    }, [pathname]); // re-run on every client-side navigation

    // Fresh session on every full page load; in-app navigation keeps React state (layout).
    useEffect(() => {
        clearStaleChatStorage();
        sessionIdRef.current = generateSessionId();
    }, []);

    useEffect(() => {
        return () => {
            isStoppingVoiceInputRef.current = true;
            recognitionRef.current?.abort();
            window.speechSynthesis?.cancel();
            // Cleanup hover timeout
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handler = (e: Event) => {
            const url = (e as CustomEvent<{ url: string }>).detail.url;
            // CLOSE CHATBOT IMMEDIATELY when navigating
            setIsOpen(false);
            setIsClosing(false);
            // Stop voice and speech
            isStoppingVoiceInputRef.current = true;
            recognitionRef.current?.stop();
            recognitionRef.current = null;
            setIsListening(false);
            window.speechSynthesis?.cancel();
            setSpeakingMessageIndex(null);
            // Navigate
            router.push(url);
        };
        window.addEventListener("aira:navigate", handler);
        return () => window.removeEventListener("aira:navigate", handler);
    }, [router]);

    // ── Scroll to bottom ──
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    // ── Focus input on open ──
    useEffect(() => { if (isOpen) setTimeout(() => chatInputRef.current?.focus(), 150); }, [isOpen]);

    // Re-focus after in-app navigation (chat stays mounted in layout)
    useEffect(() => {
        if (isOpen) {
            const t = setTimeout(() => chatInputRef.current?.focus(), 200);
            return () => clearTimeout(t);
        }
    }, [pathname, isOpen]);

    // ── Lock body scroll ──
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const stopVoiceInput = useCallback(() => {
        isStoppingVoiceInputRef.current = true;
        recognitionRef.current?.stop();
        recognitionRef.current = null;
        setIsListening(false);
    }, []);

    const stopReading = useCallback(() => {
        window.speechSynthesis?.cancel();
        setSpeakingMessageIndex(null);
    }, []);

    const closeChat = useCallback(() => {
        stopVoiceInput();
        stopReading();
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 420);
    }, [stopReading, stopVoiceInput]);

    const executeClear = useCallback(async () => {
        setShowClearConfirm(false);

        const closingId = sessionIdRef.current;
        try {
            if (closingId) {
                await fetch("/api/chatbot/session/close", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ session_id: closingId }),
                });
            }
        } catch { /* ignore */ }

        sessionIdRef.current = generateSessionId();
        clearStaleChatStorage();
        setMessages([]);
        setInputValue("");
        stopVoiceInput();
        stopReading();
        setSpeechError("");
        setIsVoiceInputUnavailable(false);
        isSendingRef.current = false;
        setIsLoading(false);
        setTimeout(() => chatInputRef.current?.focus(), 50);
    }, [stopReading, stopVoiceInput]);

    const requestClear = useCallback(() => {
        if (messages.length === 0) return;
        setShowClearConfirm(true);
    }, [messages.length]);

    const toggleVoiceInput = useCallback(() => {
        if (isListening) {
            stopVoiceInput();
            return;
        }

        const SpeechRecognitionCtor = getSpeechRecognitionConstructor();
        if (!SpeechRecognitionCtor) {
            setSpeechError("Voice input is not supported in this browser.");
            return;
        }

        // Reset any previous unavailable state so user can always retry
        setIsVoiceInputUnavailable(false);
        setSpeechError("");
        listeningBaseInputRef.current = inputValue.trim() ? `${inputValue.trim()} ` : "";
        isStoppingVoiceInputRef.current = false;

        const recognition = new SpeechRecognitionCtor();
        recognition.continuous = true;
        recognition.interimResults = true;
        // Use the dominant language of existing input so voice recognition
        // matches what the user is already typing in (falls back to en-US)
        recognition.lang = detectSpeechLanguage(inputValue.trim()) || "en-US";
        recognition.onresult = (event) => {
            let transcript = "";

            for (let index = 0; index < event.results.length; index += 1) {
                transcript += event.results[index][0].transcript;
            }

            setInputValue(`${listeningBaseInputRef.current}${transcript}`.trimStart());
        };
        recognition.onerror = (event) => {
            if (event.error !== "aborted" && !isStoppingVoiceInputRef.current) {
                setSpeechError(getSpeechRecognitionErrorMessage(event.error));
                if (shouldDisableVoiceInputAfterError(event.error)) {
                    setIsVoiceInputUnavailable(true);
                } else {
                    // Transient error — auto-clear the message after 4 s so mic stays usable
                    setTimeout(() => setSpeechError(""), 4000);
                }
            }
            setIsListening(false);
            recognitionRef.current = null;
        };
        recognition.onend = () => {
            isStoppingVoiceInputRef.current = false;
            setIsListening(false);
            recognitionRef.current = null;
            setTimeout(() => chatInputRef.current?.focus(), 50);
        };

        recognitionRef.current = recognition;

        try {
            recognition.start();
            setIsListening(true);
        } catch {
            setSpeechError("Voice input could not start. Please try again.");
            recognitionRef.current = null;
            setIsListening(false);
        }
    }, [inputValue, isListening, isVoiceInputUnavailable, stopVoiceInput]);

    const readMessage = useCallback(async (text: string, index: number) => {
        if (!("speechSynthesis" in window)) return;

        if (speakingMessageIndex === index) {
            stopReading();
            return;
        }

        window.speechSynthesis.cancel();

        const speechText = buildSpeechText(text);
        if (!speechText) return;

        const voices = await getSpeechSynthesisVoices();
        // Guard: user may have toggled while voices were loading
        if (speakingMessageIndex === index) return;

        // Split text into per-language segments for natural mixed-language TTS
        const segments = splitIntoLanguageSegments(speechText);

        if (segments.length === 0) return;

        setSpeakingMessageIndex(index);

        const speakSegment = (segIndex: number) => {
            if (segIndex >= segments.length) {
                setSpeakingMessageIndex(null);
                return;
            }

            const segment = segments[segIndex];
            if (!segment.text.trim()) {
                speakSegment(segIndex + 1);
                return;
            }

            const utterance = new SpeechSynthesisUtterance(segment.text);
            const preferredVoice = getPreferredAiraVoice(segment.lang, voices);
            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }
            utterance.lang = preferredVoice?.lang || segment.lang;
            utterance.rate = 0.84;
            utterance.pitch = 1.18;
            utterance.volume = 0.92;

            utterance.onend = () => speakSegment(segIndex + 1);
            utterance.onerror = () => setSpeakingMessageIndex(null);

            window.speechSynthesis.speak(utterance);
        };

        speakSegment(0);
    }, [speakingMessageIndex, stopReading]);

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || isLoading || isSendingRef.current) return;
        stopVoiceInput();
        stopReading();
        setSpeechError("");
        isSendingRef.current = true;
        const ts = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setMessages(prev => [...prev, { text: text.trim(), isUser: true, timestamp: ts }]);
        setInputValue("");
        setIsLoading(true);

        let reply = "";
        let routeToNavigate: string | null = null;

        if (["hi", "hello", "hey"].includes(text.toLowerCase()) || text.toLowerCase().startsWith("hi ")) {
            reply = generateFallbackResponse(text);
        } else {
            if (!sessionIdRef.current) {
                sessionIdRef.current = generateSessionId();
            }
            try {
                const apiUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL || "/api/chatbot";
                const res = await fetch(apiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        message: text,
                        session_id: sessionIdRef.current,
                    }),
                });
                if (!res.ok) {
                    if (res.status === 403) {
                        reply = HYNIVA_ONLY_MESSAGE;
                    } else {
                        throw new Error("API error");
                    }
                }
                if (reply) {
                    routeToNavigate = null;
                } else {
                    const data: ApiResponse = await res.json();
                    reply = normalizeProductLinksInText(
                        data.message || "Sorry, I couldn't understand that.",
                    );
                    routeToNavigate = data.route || data.target_route || null;
                    if (routeToNavigate) {
                        routeToNavigate = normalizeProductRoute(routeToNavigate);
                    }
                }
            } catch {
                reply =
                    "Sorry, I couldn't reach the server right now. Please try again.";
            }
        }

        const rts = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setMessages(prev => [...prev, { text: reply, isUser: false, timestamp: rts }]);

        if (routeToNavigate) {
            setTimeout(() => navigateFromChat(routeToNavigate!), 700);
        }

        setIsLoading(false);
        isSendingRef.current = false;
    }, [isLoading, stopReading, stopVoiceInput]);

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue); }
    };

    const voiceInputTitle = isVoiceInputUnavailable
        ? "Microphone access was blocked. Please allow it in your browser settings."
        : isSpeechSupported
            ? (isListening ? "Stop voice input" : "Start voice input")
            : "Voice input is not supported in this browser";

    return (
        <>
            {/* ── Floating pill ── */}
            <div
                className="fixed aira-widget-container"
                onMouseEnter={() => {
                    // Clear any pending timeout
                    if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current);
                        hoverTimeoutRef.current = null;
                    }
                    // Set hover immediately on enter
                    setIsHovered(true);
                }}
                onMouseLeave={() => {
                    // Clear any pending timeout
                    if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current);
                    }
                    // Add delay before removing hover state to prevent flickering
                    hoverTimeoutRef.current = setTimeout(() => {
                        setIsHovered(false);
                        hoverTimeoutRef.current = null;
                    }, 150);
                }}
                style={{
                    pointerEvents: "auto",
                    right: (isMiddle && !isHovered) ? "0" : "1rem",
                    bottom: "2rem",
                    left: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    paddingRight: "0px",
                    transition: "right 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), padding-right 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    zIndex: 9999,
                }}
            >
                {/* Ambient background glow on hover */}
                {isHovered && (
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "300px",
                            height: "300px",
                            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 40%, transparent 70%)",
                            borderRadius: "50%",
                            filter: "blur(40px)",
                            zIndex: 0,
                            pointerEvents: "none",
                            animation: "airaGlowPulse 2s ease-in-out infinite",
                        }}
                    />
                )}

                <motion.div
                    initial={false}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 28,
                        mass: 1,
                    }}
                    className="relative flex flex-col items-center"
                    style={{
                        pointerEvents: "auto",
                    }}
                >


                    {/* Mascot holding the pill from the top */}
                    <motion.div
                        className={`aira-mascot-container ${(isMiddle && !isHovered) ? 'aira-mascot-minimized' : 'aira-mascot-expanded'}`}
                        initial={false}
                        animate={{
                            opacity: (isMiddle && !isHovered) ? 0 : 1,
                            scale: (isMiddle && !isHovered) ? 0.5 : 1,
                            y: (isMiddle && !isHovered) ? 20 : 0,
                            x: "-45%",
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [0.34, 1.56, 0.64, 1],
                        }}
                        style={{
                            position: "absolute",
                            left: "50%",
                            bottom: (isMiddle && !isHovered) ? "-10px" : "27px",
                            width: (isMiddle && !isHovered) ? "0px" : "85px",
                            height: (isMiddle && !isHovered) ? "0px" : "85px",
                            visibility: (isMiddle && !isHovered) ? "hidden" : "visible",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            pointerEvents: "none",
                            zIndex: 3,
                            overflow: "visible",
                        }}
                    >
                        <img
                            src="/images/AIRA_MASCOT/AIRA_New.png"
                            alt="AIRA Assistant"
                            width={120}
                            height={120}
                            className="aira-mascot-grip"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                objectPosition: "bottom center",
                                filter: isHovered 
                                    ? "drop-shadow(0 0 3px rgba(59, 130, 246, 1)) drop-shadow(0 0 8px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 15px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 25px rgba(59, 130, 246, 0.4)) drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                                    : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                                transition: "filter 0.3s ease-out",
                            }}
                        />
                    </motion.div>

                    {/* Button — Glowing pill */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className={`relative flex items-center justify-center rounded-full font-black text-white border-none cursor-pointer transition-all group overflow-visible uppercase tracking-wide aira-button ${(isMiddle && !isHovered) ? 'aira-button-minimized' : 'aira-button-expanded'}`}
                        style={{
                            position: "relative",
                            zIndex: 2,
                            background: "#2563eb",
                            boxShadow: isHovered 
                                ? "0 0 2px 1px rgba(59, 130, 246, 1), 0 0 8px 2px rgba(59, 130, 246, 0.8), 0 0 20px 4px rgba(59, 130, 246, 0.5), 0 0 40px 8px rgba(59, 130, 246, 0.3), 0 4px 12px rgba(37,99,235,0.5)"
                                : "0 2px 8px rgba(37,99,235,0.3)",
                            minWidth: (isMiddle && !isHovered) ? "42px" : "auto",
                            paddingLeft: (isMiddle && !isHovered) ? "11px" : "16px",
                            paddingRight: (isMiddle && !isHovered) ? "11px" : "16px",
                            height: "32px",
                            fontSize: "11px",
                            borderRadius: (isMiddle && !isHovered) ? "21px 0 0 21px" : "21px",
                            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = "#2563eb";
                        }}
                    >
                        {/* Stars Icon - always visible */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.9))' }}>
                                <path d="M10 2L11.5 7.5L17 9L11.5 10.5L10 16L8.5 10.5L3 9L8.5 7.5L10 2Z" />
                                <path d="M18 12L18.75 14.25L21 15L18.75 15.75L18 18L17.25 15.75L15 15L17.25 14.25L18 12Z" />
                                <path d="M17 3L17.5 4.5L19 5L17.5 5.5L17 7L16.5 5.5L15 5L16.5 4.5L17 3Z" />
                            </svg>
                        </div>

                        {/* Text and Chevron */}
                        <span 
                            className={`aira-button-text ${(isMiddle && !isHovered) ? 'aira-text-minimized' : 'aira-text-expanded'}`}
                            style={{
                                opacity: (isMiddle && !isHovered) ? 0 : 1,
                                transition: "opacity 0.3s ease-out",
                                width: (isMiddle && !isHovered) ? "0px" : "auto",
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                marginLeft: (isMiddle && !isHovered) ? "0px" : "8px",
                            }}
                        >
                            <img src="/aira-text.png" alt="AIRA" style={{ height: "11px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                            <ChevronRight size={14} strokeWidth={3} />
                        </span>
                    </button>
                </motion.div>
            </div>

            {/* ── Chat panel ── */}
            {isOpen && (
                <BodyPortal>
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="AIRA Chat"
                        onClick={(e) => { if (e.target === e.currentTarget) closeChat(); }}
                        style={{
                            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                            width: "100vw", height: "100vh",
                            background: "rgba(0,0,0,0.45)",
                            backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            zIndex: 999999, padding: "5vh 5vw", boxSizing: "border-box",
                            animation: isClosing
                                ? "airaFadeOut 0.42s cubic-bezier(0.32,0.72,0,1) forwards"
                                : "airaFadeIn 0.3s cubic-bezier(0.32,0.72,0,1)",
                        }}
                    >
                        {/* Panel */}
                        <div
                            className="aira-chat-panel"
                            style={{
                                position: "relative", width: "100%", height: "100%",
                                maxWidth: "75vw", maxHeight: "75vh",
                                background: "#ffffff",
                                border: `4px solid ${GREEN}`,
                                borderRadius: 18,
                                display: "flex", flexDirection: "column", overflow: "hidden",
                                boxShadow: `0 24px 80px rgba(3,11,59,0.35), 0 0 0 1px rgba(0,201,177,0.2)`,
                                animation: isClosing
                                    ? "airaPanelSlideOut 0.42s cubic-bezier(0.32,0.72,0,1) forwards"
                                    : "airaPanelSlide 0.42s cubic-bezier(0.32,0.72,0,1)",
                            }}
                        >
                            {showClearConfirm && (
                                <ClearConfirmDialog
                                    onConfirm={() => void executeClear()}
                                    onCancel={() => setShowClearConfirm(false)}
                                />
                            )}

                            {/* Close & Clear */}
                            <div style={{ position: "absolute", top: 10, right: 10, zIndex: 10, display: "flex", gap: 8 }}>
                                {messages.length > 0 && (
                                    <button
                                        onClick={requestClear}
                                        title="Start new session" aria-label="Clear chat"
                                        style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid #d1d5db", background: "#f9fafb", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 12, fontWeight: "bold" }}
                                    >⟲</button>
                                )}
                                <button
                                    onClick={closeChat} aria-label="Close"
                                    style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid #d1d5db", background: "#f9fafb", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                                >
                                    <X size={13} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Header */}
                            <div className="aira-chat-header" style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 52px 14px 20px", borderBottom: "1.5px solid #e5e7eb", background: "#ffffff", flexShrink: 0, flexWrap: "wrap" }}>
                                <div style={{ width: 38, height: 38, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="AIRA">
                                    <Image src="/images/AIRA_MASCOT/AIRA_NEW_MASCOT_crop.png" alt="AIRA" width={38} height={38} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center center" }} />
                                </div>
                                <Image src="/aira-text.png" alt="AIRA" width={798} height={230} className="aira-header-logo" style={{ height: 22, width: "auto", objectFit: "contain", flexShrink: 0 }} />
                                <span style={{ display: "inline-block", width: 1.5, height: 24, background: "#d1d5db", borderRadius: 1, flexShrink: 0 }} className="hide-on-mobile" />
                                <span style={{ fontSize: 13, fontWeight: 500, color: "#6b7280", whiteSpace: "nowrap" }} className="hide-on-mobile">Your Agentic Assistant</span>
                            </div>

                            {/* Messages */}
                            <div className="aira-messages-container" aria-live="polite" style={{ flex: "1 1 0", minHeight: 0, overflowY: "auto", padding: "24px 28px 16px", display: "flex", flexDirection: "column", gap: 16, background: "#ffffff", scrollbarWidth: "thin", scrollbarColor: "#d1d5db transparent" }}>
                                {messages.length === 0 && !isLoading && (
                                    <div className="aira-welcome" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center", padding: "32px 20px", gap: 16 }}>
                                        <p style={{ fontSize: 24, fontWeight: 700, color: DARK_TEXT, margin: 0 }}>Hi, I&apos;m AIRA</p>
                                        <p style={{ fontSize: 15, color: "#6b7280", maxWidth: 460, lineHeight: 1.65, margin: 0 }}>Ask me anything about Hyniva&apos;s products, services or how we can help your business.</p>
                                        <div className="aira-quick-questions" style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 8 }}>
                                            {["Tell me about AIRA", "What services do you offer?", "How can I contact Hyniva?", "What industries do you serve?"].map(q => (
                                                <button key={q} onClick={() => sendMessage(q)} style={{ background: "#f0faf4", border: `1px solid ${GREEN}`, borderRadius: 20, padding: "8px 16px", fontSize: 13, color: GREEN, cursor: "pointer", fontWeight: 500 }}>{q}</button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className="aira-message"
                                        data-testid={msg.isUser ? "chat-message-user" : "chat-message-assistant"}
                                        style={{ display: "flex", alignItems: "flex-start", gap: 10, justifyContent: msg.isUser ? "flex-end" : "flex-start", animation: "airaMsgIn 0.22s ease" }}
                                    >
                                        {!msg.isUser && (
                                            <div className="aira-bot-avatar" style={{ width: 32, height: 32, flexShrink: 0, marginTop: 2, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="AIRA">
                                                <Image src="/images/AIRA_MASCOT/AIRA_NEW_MASCOT_crop.png" alt="AIRA" width={32} height={32} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center center" }} />
                                            </div>
                                        )}
                                        <div className="aira-message-content" style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: "85%", alignItems: msg.isUser ? "flex-end" : "flex-start" }}>
                                            <div style={{ padding: msg.isUser ? "8px 14px" : "12px 16px", borderRadius: msg.isUser ? 20 : 12, borderBottomRightRadius: msg.isUser ? 4 : 12, borderBottomLeftRadius: msg.isUser ? 12 : 4, fontSize: 14, lineHeight: 1.6, wordBreak: "normal", overflowWrap: "break-word", whiteSpace: "pre-wrap", width: "fit-content", background: msg.isUser ? GREEN_LIGHT : "#ffffff", color: DARK_TEXT, border: msg.isUser ? "1px solid #9ee8df" : "1px solid #e5e7eb", fontWeight: msg.isUser ? 500 : 400, boxShadow: msg.isUser ? "none" : "0 1px 3px rgba(0,0,0,0.06)" }}>
                                                <MessageContent text={msg.text} isUser={msg.isUser} />
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 3px" }}>
                                                <span style={{ fontSize: 10, color: "#9ca3af" }}>{msg.timestamp}</span>
                                                {!msg.isUser && (
                                                    <button
                                                        type="button"
                                                        onClick={() => readMessage(msg.text, i)}
                                                        aria-label={speakingMessageIndex === i ? "Stop reading response" : "Read response aloud"}
                                                        title={speakingMessageIndex === i ? "Stop reading" : "Read response"}
                                                        style={{
                                                            width: 22,
                                                            height: 22,
                                                            borderRadius: "50%",
                                                            border: "1px solid #d1d5db",
                                                            background: speakingMessageIndex === i ? GREEN_LIGHT : "#ffffff",
                                                            color: speakingMessageIndex === i ? GREEN : "#6b7280",
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            padding: 0,
                                                        }}
                                                    >
                                                        {speakingMessageIndex === i ? <VolumeX size={12} /> : <Volume2 size={12} />}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div data-testid="chat-typing-indicator" style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                        <div style={{ width: 32, height: 32, flexShrink: 0, marginTop: 2, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="AIRA">
                                            <Image src="/images/AIRA_MASCOT/AIRA_NEW_MASCOT_crop.png" alt="AIRA" width={32} height={32} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center center" }} />
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "13px 18px", background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, borderBottomLeftRadius: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                                            {[0, 0.2, 0.4].map((d, i) => (
                                                <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: GREEN, display: "inline-block", animation: `airaTyping 1.4s ease-in-out ${d}s infinite` }} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div style={{ margin: "0 16px 16px", flexShrink: 0 }}>
                                <div className="aira-input-bar" style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: "#ffffff", border: `1.5px solid ${isListening ? GREEN : "rgba(0,201,177,0.4)"}`, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                                    <Search size={15} style={{ color: "#9ca3af", flexShrink: 0 }} />
                                    <input
                                        ref={chatInputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={e => {
                                            setInputValue(e.target.value);
                                            setSpeechError("");
                                        }}
                                        onKeyDown={handleKey}
                                        placeholder={isListening ? "Listening..." : "Ask for follow up"}
                                        aria-label="Ask AIRA"
                                        style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontSize: 14, color: DARK_TEXT, caretColor: GREEN }}
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleVoiceInput}
                                        disabled={!isSpeechSupported || isLoading}
                                        aria-label={isListening ? "Stop voice input" : "Start voice input"}
                                        title={voiceInputTitle}
                                        style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", border: `1px solid ${isListening ? GREEN : "#d1d5db"}`, background: isListening ? GREEN_LIGHT : "#ffffff", color: isListening ? GREEN : "#6b7280", cursor: isSpeechSupported && !isLoading ? "pointer" : "not-allowed", opacity: isSpeechSupported && !isLoading ? 1 : 0.55, transition: "background 0.2s, border-color 0.2s, color 0.2s" }}
                                    >
                                        {isListening ? <MicOff size={14} /> : <Mic size={14} />}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => sendMessage(inputValue)}
                                        disabled={!inputValue.trim() || isLoading}
                                        aria-label="Send"
                                        style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", border: "none", background: inputValue.trim() && !isLoading ? GREEN : "#e5e7eb", color: inputValue.trim() && !isLoading ? "#ffffff" : "#9ca3af", cursor: inputValue.trim() && !isLoading ? "pointer" : "not-allowed", transition: "background 0.2s" }}
                                    >
                                        <Send size={14} style={{ transform: "rotate(45deg)" }} />
                                    </button>
                                </div>
                                {speechError && (
                                    <p role="status" style={{ margin: "6px 4px 0", color: "#dc2626", fontSize: 11, lineHeight: 1.4 }}>
                                        {speechError}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </BodyPortal>
            )}

            {/* Keyframes */}
            <style>{`
                @keyframes airaFadeIn  { from { opacity: 0; } to { opacity: 1; } }
                @keyframes airaFadeOut { from { opacity: 1; } to { opacity: 0; } }
                @keyframes airaPanelSlide    { from { opacity: 0; transform: translateY(40px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes airaPanelSlideOut { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(40px) scale(0.96); } }
                @keyframes airaMsgIn   { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes airaTyping  { 0%,60%,100% { transform: translateY(0); opacity: 0.35; } 30% { transform: translateY(-8px); opacity: 1; } }
                @keyframes starShine   { 0%, 100% { filter: drop-shadow(0 0 8px rgba(255,255,255,0.9)) drop-shadow(0 0 12px rgba(0,163,255,0.8)); opacity: 1; } 50% { filter: drop-shadow(0 0 16px rgba(255,255,255,1)) drop-shadow(0 0 20px rgba(0,163,255,1)); opacity: 0.8; } }
                
                /* Remove glow from AIRA mascot by default, add on hover */
                .aira-mascot-grip {
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
                    transition: filter 0.3s ease;
                }
                .aira-widget-container:hover .aira-mascot-grip {
                    filter: drop-shadow(0 0 18px rgba(0,163,255,0.7)) drop-shadow(0 2px 4px rgba(0,0,0,0.1));
                }
                
                /* Ensure mascot container is always visible when expanded */
                .aira-mascot-container {
                    will-change: transform, opacity;
                }
                
                .aira-widget-container {
                    will-change: padding-right;
                }
                
                /* Mobile responsive styles */
                @media (max-width: 768px) {
                    .hide-on-mobile {
                        display: none !important;
                    }
                    
                    /* Keep mascot same size as desktop */
                    .aira-mascot-expanded {
                        width: 85px !important;
                        height: 85px !important;
                        bottom: 27px !important;
                    }
                    
                    .aira-mascot-minimized {
                        width: 0px !important;
                        height: 0px !important;
                        bottom: -10px !important;
                    }
                    
                    /* Keep button same size as desktop */
                    .aira-button-expanded {
                        height: 32px !important;
                        padding-left: 16px !important;
                        padding-right: 16px !important;
                    }
                    
                    .aira-button-minimized {
                        height: 32px !important;
                        min-width: 42px !important;
                        padding-left: 11px !important;
                        padding-right: 11px !important;
                        border-radius: 21px 0 0 21px !important;
                    }
                    
                    /* Position widget in bottom-right corner, fully visible */
                    .aira-widget-container {
                        bottom: 1.5rem !important;
                    }
                    
                    /* Chat panel mobile styles */
                    .aira-chat-panel {
                        max-width: 95vw !important;
                        max-height: 90vh !important;
                        border-width: 2px !important;
                        border-radius: 12px !important;
                    }
                    
                    .aira-chat-header {
                        padding: 10px 40px 10px 12px !important;
                        gap: 8px !important;
                    }
                    
                    .aira-chat-header > div:first-child {
                        width: 28px !important;
                        height: 28px !important;
                    }
                    
                    .aira-header-logo {
                        height: 16px !important;
                    }
                    
                    .aira-messages-container {
                        padding: 16px 12px 12px !important;
                        gap: 12px !important;
                    }
                    
                    .aira-welcome {
                        padding: 20px 12px !important;
                        gap: 12px !important;
                    }
                    
                    .aira-welcome p:first-child {
                        font-size: 20px !important;
                    }
                    
                    .aira-welcome p:nth-child(2) {
                        font-size: 13px !important;
                    }
                    
                    .aira-quick-questions {
                        gap: 6px !important;
                        margin-top: 6px !important;
                    }
                    
                    .aira-quick-questions button {
                        font-size: 11px !important;
                        padding: 6px 12px !important;
                    }
                    
                    .aira-message {
                        gap: 6px !important;
                    }
                    
                    .aira-bot-avatar {
                        width: 24px !important;
                        height: 24px !important;
                    }
                    
                    .aira-message-content {
                        max-width: 85% !important;
                        gap: 2px !important;
                    }
                    
                    .aira-message-content > div {
                        font-size: 13px !important;
                        padding: 8px 12px !important;
                    }
                    
                    .aira-message-content > span {
                        font-size: 9px !important;
                    }
                }
            `}</style>
        </>
    );
}

