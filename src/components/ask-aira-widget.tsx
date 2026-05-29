"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronRight, Send, X, Search } from "lucide-react";
import { motion } from "framer-motion";

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

function toInAppPath(url: string): string | null {
    const trimmed = url.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return trimmed;
    try {
        const parsed = new URL(trimmed, window.location.origin);
        const path = parsed.pathname + parsed.search + parsed.hash;
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

function BodyPortal({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
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

    // chat state
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatInputRef = useRef<HTMLInputElement>(null);
    const isSendingRef = useRef(false);
    const sessionIdRef = useRef("");

    // ── Intersection observer for hero / footer ──
    // Re-runs on every route change so observers point to the new page's DOM.
    useEffect(() => {
        const heroEl = document.getElementById("hero-section");
        const footerEl = document.getElementById("site-footer");

        // By default, the widget is minimized on all pages.
        // It expands (isMiddle = false) only when the hero section or footer is visible.
        let isTop = window.scrollY < 150;
        let footerVisible = false;
        let hideTimer: ReturnType<typeof setTimeout> | null = null;

        // Apply initial state immediately
        setIsMiddle(!isTop);

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
                // In middle section — minimize with small delay.
                hideTimer = setTimeout(() => {
                    setIsMiddle(true);
                    hideTimer = null;
                }, 150);
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
            if (hideTimer) clearTimeout(hideTimer);
        };
    }, [pathname]); // re-run on every client-side navigation

    // Fresh session on every full page load; in-app navigation keeps React state (layout).
    useEffect(() => {
        clearStaleChatStorage();
        sessionIdRef.current = generateSessionId();
    }, []);

    useEffect(() => {
        const handler = (e: Event) => {
            const url = (e as CustomEvent<{ url: string }>).detail.url;
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

    const closeChat = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 420);
    }, []);

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
        isSendingRef.current = false;
        setIsLoading(false);
        setTimeout(() => chatInputRef.current?.focus(), 50);
    }, []);

    const requestClear = useCallback(() => {
        if (messages.length === 0) return;
        setShowClearConfirm(true);
    }, [messages.length]);

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || isLoading || isSendingRef.current) return;
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
                if (!res.ok) throw new Error("API error");
                const data: ApiResponse = await res.json();
                reply = data.message || "Sorry, I couldn't understand that.";
                routeToNavigate = data.route || data.target_route || null;
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
    }, [isLoading]);

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue); }
    };

    return (
        <>
            {/* ── Floating pill ── */}
            <div
                className="fixed bottom-8 flex flex-col items-end aira-widget-container"
                onMouseEnter={() => {
                    setIsHovered(true);
                }}
                onMouseLeave={() => {
                    setIsHovered(false);
                }}
                style={{
                    pointerEvents: "auto",
                    right: "0px",
                    paddingRight: (isMiddle && !isHovered) ? "0px" : "1rem",
                    transition: "padding-right 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
                    zIndex: 9999,
                }}
            >
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
                            y: (isMiddle && !isHovered) ? 30 : 0,
                            x: "-50%",
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            mass: 0.8,
                            delay: (isMiddle && !isHovered) ? 0 : 0.1,
                        }}
                        style={{
                            position: "absolute",
                            left: "50%",
                            bottom: (isMiddle && !isHovered) ? "-10px" : "36px",
                            width: (isMiddle && !isHovered) ? "0px" : "120px",
                            height: (isMiddle && !isHovered) ? "0px" : "120px",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            pointerEvents: "none",
                            zIndex: 10,
                            transition: "all 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
                            overflow: "visible",
                        }}
                    >
                        <img
                            src="/images/AIRA_MASCOT/NEW_HEAD_AND_HAND.png"
                            alt="AIRA Assistant"
                            className="aira-mascot-grip"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                objectPosition: "bottom center",
                                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                            }}
                        />
                    </motion.div>

                    {/* Button — Glowing pill */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className={`relative flex items-center justify-center rounded-full font-black text-white border-none cursor-pointer transition-all duration-300 group overflow-visible uppercase tracking-wide aira-button ${(isMiddle && !isHovered) ? 'aira-button-minimized' : 'aira-button-expanded'}`}
                        style={{
                            position: "relative",
                            zIndex: 2,
                            background: "#2563eb",
                            boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
                            minWidth: (isMiddle && !isHovered) ? "42px" : "140px",
                            paddingLeft: (isMiddle && !isHovered) ? "11px" : "16px",
                            paddingRight: (isMiddle && !isHovered) ? "11px" : "12px",
                            height: "42px",
                            borderRadius: (isMiddle && !isHovered) ? "21px 0 0 21px" : "21px",
                            transition: "all 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8";
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 12px rgba(37,99,235,0.5)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = "#2563eb";
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 8px rgba(37,99,235,0.3)";
                        }}
                    >
                        {/* Stars Icon - always visible */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.9))' }}>
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
                                transition: "opacity 0.3s ease",
                                width: (isMiddle && !isHovered) ? "0px" : "auto",
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px", // Added gap between items
                                marginLeft: (isMiddle && !isHovered) ? "0px" : "12px",
                            }}
                        >
                            <img src="/aira-text.png" alt="AIRA" style={{ height: "14px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                            <ChevronRight size={18} strokeWidth={3} />
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
                                            <span style={{ fontSize: 10, color: "#9ca3af", padding: "0 3px" }}>{msg.timestamp}</span>
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
                            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 16px 16px", padding: "11px 14px", background: "#ffffff", border: `1.5px solid rgba(0,201,177,0.4)`, borderRadius: 12, flexShrink: 0, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                                <Search size={15} style={{ color: "#9ca3af", flexShrink: 0 }} />
                                <input
                                    ref={chatInputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                    onKeyDown={handleKey}
                                    placeholder="Ask for follow up"
                                    aria-label="Ask AIRA"
                                    style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 14, color: DARK_TEXT, caretColor: GREEN }}
                                />
                                <button
                                    type="button"
                                    onClick={() => sendMessage(inputValue)}
                                    disabled={!inputValue.trim() || isLoading}
                                    aria-label="Send"
                                    style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", border: "none", background: inputValue.trim() && !isLoading ? GREEN : "#e5e7eb", color: inputValue.trim() && !isLoading ? "#ffffff" : "#9ca3af", cursor: inputValue.trim() && !isLoading ? "pointer" : "not-allowed", transition: "background 0.2s" }}
                                >
                                    <Send size={14} style={{ transform: "rotate(-45deg)" }} />
                                </button>
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
                    
                    .aira-mascot-expanded {
                        width: 90px !important;
                        height: 90px !important;
                        bottom: 28px !important;
                    }
                    
                    .aira-mascot-minimized {
                        width: 0px !important;
                        height: 0px !important;
                        bottom: -10px !important;
                    }
                    
                    .aira-button-expanded {
                        height: 38px !important;
                        min-width: 104px !important;
                        padding-left: 12px !important;
                        padding-right: 12px !important;
                    }
                    
                    .aira-button-minimized {
                        height: 38px !important;
                        min-width: 38px !important;
                        padding-left: 11px !important;
                        padding-right: 11px !important;
                        border-radius: 19px 0 0 19px !important;
                    }
                    
                    .aira-button-text {
                        gap: 4px !important;
                    }
                    
                    .aira-text-expanded {
                        margin-left: 6px !important;
                    }
                    
                    .aira-text-minimized {
                        margin-left: 0px !important;
                    }
                    
                    .aira-button img {
                        height: 11px !important;
                    }
                    
                    .aira-button svg {
                        width: 14px !important;
                        height: 14px !important;
                    }
                    
                    .aira-widget-container {
                        bottom: 1.5rem !important;
                        right: 0 !important;
                    }
                    
                    .aira-widget-container:hover {
                        padding-right: 1rem !important;
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

