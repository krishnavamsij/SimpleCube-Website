"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronRight, Send, X, Search, Mic, MicOff, Volume2, VolumeX, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import {
    normalizeProductLinksInText,
    normalizeProductRoute,
} from "@/lib/product-route-normalizer";

// ─── Text formatter for API responses ──────────────────────────────────────────
function formatToBullets(text: string): string {
    if (!text) return text;
    return text;
}

// Put each URL as an indented sub-point when multiple URLs share a line
function separateUrls(text: string): string {
    const urlRegex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;
    const urls = text.match(urlRegex);
    if (!urls || urls.length < 2) return text;

    const parts = text.split(urlRegex);
    const result: string[] = [];
    for (let i = 0; i < urls.length; i++) {
        if (i === 0) {
            const intro = parts[0].replace(/\s+(?:and|or)\s*$/, "").trim();
            if (intro) result.push(intro);
        }
        result.push(`  > ${urls[i]}`);
    }
    const trailing = parts[parts.length - 1].trim();
    if (trailing && !/^(?:and|or)$/i.test(trailing)) {
        result.push(trailing);
    }
    return result.join("\n");
}
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

// ─── Onboarding state machine ─────────────────────────────────────────────────
type OnboardStep =
    | "ask_name"
    | "ask_email"
    | "ask_intent"
    | "ask_custom_intent"
    | "ask_challenge"
    | "chat"
    | "ask_call_time"
    | "ask_sme_contact";

interface LeadData {
    name: string;
    email: string;
    intent: string;
    challenge: string;
    organisation: string;
}

const INTENTS = [
    { label: "Digital Transformation",          emoji: "🔄" },
    { label: "Enterprise Platforms",             emoji: "🏗️" },
    { label: "Product Engineering",              emoji: "⚙️" },
    { label: "Data, AI & Automation",            emoji: "🤖" },
    { label: "Cloud & Infrastructure Services",  emoji: "☁️" },
    { label: "Strategy & IT Consulting",         emoji: "🧭" },
    { label: "Managed Services & Support",       emoji: "🛠️" },
    { label: "Hyniva Products & Solutions",      emoji: "🚀" },
    { label: "Partnership Opportunities",        emoji: "🤝" },
    { label: "Other",                            emoji: "💬" },
] as const;

// ─── Speech types ─────────────────────────────────────────────────────────────
type SpeechRecognitionResultEventLike = Event & {
    resultIndex: number;
    results: {
        length: number;
        [index: number]: { isFinal: boolean; 0: { transcript: string } };
    };
};

type SpeechRecognitionErrorEventLike = Event & {
    error?:
        | "aborted" | "audio-capture" | "bad-grammar" | "language-not-supported"
        | "network" | "no-speech" | "not-allowed" | "phrases-not-supported"
        | "service-not-allowed" | string;
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

// ─── Storage & session ────────────────────────────────────────────────────────
const STORAGE_KEYS = {
    SESSION_ID: "aira_chat_session_id",
    MESSAGES:   "aira_chat_messages",
    IS_OPEN:    "aira_chat_is_open",
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
        .filter((p) => p.type !== "url")
        .map((p) => p.content)
        .join("")
        .replace(/\s+/g, " ")
        .trim();
}

const SCRIPT_LANGUAGE_MAP: Array<[RegExp, string]> = [
    [/\p{Script=Devanagari}/u,            "hi-IN"],
    [/\p{Script=Bengali}/u,               "bn-IN"],
    [/\p{Script=Gujarati}/u,              "gu-IN"],
    [/\p{Script=Gurmukhi}/u,              "pa-IN"],
    [/\p{Script=Kannada}/u,               "kn-IN"],
    [/\p{Script=Malayalam}/u,             "ml-IN"],
    [/\p{Script=Tamil}/u,                 "ta-IN"],
    [/\p{Script=Telugu}/u,                "te-IN"],
    [/\p{Script=Arabic}/u,                "ar"],
    [/\p{Script=Hebrew}/u,                "he-IL"],
    [/\p{Script=Thai}/u,                  "th-TH"],
    [/\p{Script=Han}/u,                   "zh-CN"],
    [/\p{Script=Hiragana}|\p{Script=Katakana}/u, "ja-JP"],
    [/\p{Script=Hangul}/u,                "ko-KR"],
    [/\p{Script=Cyrillic}/u,              "ru-RU"],
    [/\p{Script=Greek}/u,                 "el-GR"],
];

function charLanguage(char: string): string {
    return SCRIPT_LANGUAGE_MAP.find(([p]) => p.test(char))?.[1] ?? "en-US";
}
function detectSpeechLanguage(text: string): string {
    return SCRIPT_LANGUAGE_MAP.find(([p]) => p.test(text))?.[1] ?? "en-US";
}

function splitIntoLanguageSegments(text: string): Array<{ text: string; lang: string }> {
    if (!text) return [];
    const segments: Array<{ text: string; lang: string }> = [];
    let currentLang = "";
    let currentChunk = "";
    for (const char of text) {
        if (/\s/.test(char)) { currentChunk += char; continue; }
        const lang = charLanguage(char);
        if (lang !== currentLang) {
            if (currentChunk.trim()) segments.push({ text: currentChunk, lang: currentLang || "en-US" });
            else if (currentChunk && segments.length > 0) segments[segments.length - 1].text += currentChunk;
            currentLang = lang;
            currentChunk = char;
        } else { currentChunk += char; }
    }
    if (currentChunk.trim()) segments.push({ text: currentChunk, lang: currentLang || "en-US" });
    else if (currentChunk && segments.length > 0) segments[segments.length - 1].text += currentChunk;
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
    const norm = language.toLowerCase();
    const prefix = norm.split("-")[0];
    const femaleNames = ["samantha","jenny","aria","zira","susan","linda","victoria","karen","moira","tessa","google us english","google uk english female","microsoft aria","microsoft jenny","microsoft zira","microsoft heera","microsoft kalpana","microsoft kalpana mobile","microsoft heera mobile","chitra","shruti","swara","pallavi","priya","neerja","sunita","neelam","ananya","meera","lekha","veena","female","woman"];
    const maleNames = ["david","mark","george","ravi","alex","daniel","fred","tom","male","man"];
    const score = (v: SpeechSynthesisVoice) => {
        const n = v.name.toLowerCase(); const vl = v.lang.toLowerCase(); let s = 0;
        if (vl === norm) s += 240; else if (vl.startsWith(`${prefix}-`)) s += 200; else if (vl.startsWith("en-")) s += 20;
        if (femaleNames.some((f) => n.includes(f))) s += 90;
        if (maleNames.some((m) => n.includes(m))) s -= 90;
        if (v.default) s += 2;
        return s;
    };
    const nonMale = voices.filter((v) => !maleNames.some((m) => v.name.toLowerCase().includes(m)));
    return (nonMale.length > 0 ? nonMale : voices).toSorted((a, b) => score(b) - score(a))[0] || null;
}

function toInAppPath(url: string): string | null {
    const t = url.trim();
    if (!t) return null;
    if (t.startsWith("/") && !t.startsWith("//")) return normalizeProductRoute(t);
    try {
        const parsed = new URL(t, window.location.origin);
        const path = normalizeProductRoute(parsed.pathname + parsed.search + parsed.hash);
        if (parsed.origin === window.location.origin) return path || "/";
        const host = parsed.hostname.replace(/^www\./, "");
        if (HYNIVA_HOSTS.has(parsed.hostname) || host === "hyniva.com") return path || "/";
    } catch { if (t.startsWith("/")) return t; }
    return null;
}

function navigateFromChat(url: string) {
    const p = toInAppPath(url);
    if (p) emitNavigate(p); else window.open(url, "_blank", "noopener,noreferrer");
}

function getSpeechRecognitionConstructor() {
    if (typeof window === "undefined") return null;
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function getSpeechRecognitionErrorMessage(error?: string) {
    switch (error) {
        case "audio-capture":          return "No microphone was found. Please check your input device.";
        case "language-not-supported": return "Voice input does not support this language. Try again.";
        case "network":                return "Voice input had a network issue. Tap the mic to try again.";
        case "no-speech":              return "I didn't catch that. Tap the mic and try again.";
        case "not-allowed":
        case "service-not-allowed":    return "Microphone access was blocked.";
        default:                       return "Voice input could not start. Please try again.";
    }
}

function shouldDisableVoiceInputAfterError(error?: string) {
    return error === "not-allowed" || error === "service-not-allowed";
}

function clearStaleChatStorage() {
    try {
        for (const key of Object.values(STORAGE_KEYS)) {
            sessionStorage.removeItem(key);
            localStorage.removeItem(key);
        }
    } catch { /* ignore */ }
}

// ─── API helpers ──────────────────────────────────────────────────────────────
function fireLead(lead: LeadData) {
    fetch("/api/leads/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: lead.name,
            email: lead.email,
            intent: lead.intent,
            organisation: lead.organisation,
            problem: lead.challenge || lead.intent,
        }),
    }).catch(() => {});
}

function fireSMEConnect(lead: LeadData) {
    fetch("/api/leads/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: lead.name,
            email: lead.email,
            intent: `SME Connect Request — ${lead.intent}`,
            organisation: lead.organisation,
            problem: lead.challenge || lead.intent,
        }),
    }).catch(() => {});
}

function fireBookCall(lead: LeadData, preferredTime: string) {
    fetch("/api/leads/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: lead.name,
            email: lead.email,
            intent: lead.intent,
            organisation: lead.organisation,
            preferredTime,
        }),
    }).catch(() => {});
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function makeTs() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function botMsg(text: string): Message { return { text, isUser: false, timestamp: makeTs() }; }
function userMsg(text: string): Message { return { text, isUser: true,  timestamp: makeTs() }; }

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Brand colours ────────────────────────────────────────────────────────────
const GREEN      = "#00c9b1";
const GREEN_LIGHT = "#e6faf8";
const DARK_TEXT  = "#1e293b";

// ─── Resource link extraction ─────────────────────────────────────────────────
// Pulls trailing "Learn more: <url>" / "Related case study: <url>" / "Read more: <url>"
// lines out of the main message body so they can be rendered as clean link cards
// instead of inline blue text dumped at the end of a paragraph.
interface ParsedMessage {
    body: string;
    resources: { label: string; url: string }[];
}

const RESOURCE_LINE_PATTERN =
    /^(Related case study|Related|Case study|Learn more(?: here)?|Read more|See also|Reference|More info(?:rmation)?)\s*:?\s*(https?:\/\/\S+)$/i;

function extractResourceLinks(text: string): ParsedMessage {
    if (!text) return { body: text, resources: [] };

    const lines = text.split("\n");
    const bodyLines: string[] = [];
    const resources: { label: string; url: string }[] = [];

    for (const rawLine of lines) {
        const trimmed = rawLine.trim();
        const match = trimmed.match(RESOURCE_LINE_PATTERN);
        if (match) {
            const { href, trailing } = splitUrlAndTrailingPunctuation(match[2]);
            let isValid = false;
            try { new URL(href); isValid = true; } catch { isValid = false; }
            if (isValid) {
                resources.push({ label: normalizeResourceLabel(match[1]), url: href });
                continue; // drop this line, trailing punctuation (if any) is discarded intentionally
            }
            void trailing;
        }
        bodyLines.push(rawLine);
    }

    // Trim trailing blank lines left behind after stripping resource lines
    while (bodyLines.length > 0 && bodyLines[bodyLines.length - 1].trim() === "") {
        bodyLines.pop();
    }

    return { body: bodyLines.join("\n"), resources };
}

function normalizeResourceLabel(rawLabel: string): string {
    const lower = rawLabel.toLowerCase();
    if (lower.includes("case study")) return "Case Study";
    if (lower.includes("learn more")) return "Learn More";
    if (lower.includes("read more")) return "Read More";
    if (lower.includes("see also")) return "See Also";
    if (lower.includes("reference")) return "Reference";
    if (lower.includes("more info")) return "More Information";
    return "Related Link";
}

// Friendly display title derived from a Hyniva URL path, e.g.
// "https://www.hyniva.com/insights/case-studies/modernizing-case-management-for-a-community-healthcare-provider-stop"
// -> "Modernizing Case Management For A Community Healthcare Provider"
function urlToDisplayTitle(url: string): string {
    try {
        const parsed = new URL(url);
        const segments = parsed.pathname.split("/").filter(Boolean);
        let last = segments[segments.length - 1] || parsed.hostname;
        last = last.replace(/-stop$/i, "");
        const words = last
            .split(/[-_]/)
            .filter(Boolean)
            .map((w) => (w.length <= 3 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)));
        const title = words.join(" ");
        return title || parsed.hostname.replace(/^www\./, "");
    } catch {
        return url;
    }
}

// ─── ResourceLinks ────────────────────────────────────────────────────────────
function ResourceLinks({ resources }: { resources: { label: string; url: string }[] }) {
    if (resources.length === 0) return null;
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12, paddingTop: 12, borderTop: "1px solid #f1f5f9", width: "100%" }}>
            {resources.map((r, i) => (
                <button
                    key={`${r.url}-${i}`}
                    type="button"
                    onClick={() => navigateFromChat(r.url)}
                    style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "10px 12px", borderRadius: 10,
                        border: "1px solid #e5f6f4", background: GREEN_LIGHT,
                        color: DARK_TEXT, fontSize: 12.5, fontWeight: 500,
                        textAlign: "left", cursor: "pointer", width: "100%",
                        transition: "background 0.15s, border-color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "#d3f5f1";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = GREEN;
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = GREEN_LIGHT;
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#e5f6f4";
                    }}
                >
                    <span style={{
                        flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                        width: 28, height: 28, borderRadius: 8, background: "#ffffff",
                        color: GREEN, fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
                    }}>
                        {r.label === "Case Study" ? "CS" : <ExternalLink size={13} />}
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0, flex: 1 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: GREEN, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            {r.label}
                        </span>
                        <span style={{
                            fontSize: 12.5, color: DARK_TEXT, fontWeight: 600,
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>
                            {urlToDisplayTitle(r.url)}
                        </span>
                    </span>
                    <ChevronRight size={14} style={{ color: GREEN, flexShrink: 0 }} />
                </button>
            ))}
        </div>
    );
}

// ─── MessageContent ───────────────────────────────────────────────────────────
function MessageContent({ text, isUser }: { text: string; isUser: boolean }) {
    const handleUrlClick = (e: React.MouseEvent | React.KeyboardEvent, url: string) => {
        e.preventDefault(); e.stopPropagation(); navigateFromChat(url);
    };

    // Render inline: bold (**text**) + URLs
    const renderInline = (str: string, baseKey: string) => {
        const parts = parseMessageForUrls(str);
        return parts.map((n, i) => {
            if (n.type === "url") {
                return (
                    <span key={`${baseKey}-u${i}`} role="link" tabIndex={0}
                        onClick={(e) => handleUrlClick(e, n.content)}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleUrlClick(e, n.content); }}
                        style={{ color: "#0ea5e9", textDecoration: "underline", wordBreak: "break-all", cursor: "pointer", fontWeight: 500 }}>
                        {n.content}
                    </span>
                );
            }
            // parse bold within text segments
            const boldRegex = /\*\*(.*?)\*\*/g;
            const elems: React.ReactNode[] = [];
            let last = 0; let m; let k = 0;
            while ((m = boldRegex.exec(n.content)) !== null) {
                if (m.index > last) elems.push(<span key={`${baseKey}-t${i}-${k++}`}>{n.content.slice(last, m.index)}</span>);
                elems.push(<strong key={`${baseKey}-b${i}-${k++}`} style={{ fontWeight: 700, color: isUser ? "inherit" : "#0f172a" }}>{m[1]}</strong>);
                last = boldRegex.lastIndex;
            }
            if (last < n.content.length) elems.push(<span key={`${baseKey}-t${i}-${k++}`}>{n.content.slice(last)}</span>);
            return <span key={`${baseKey}-s${i}`}>{elems}</span>;
        });
    };

    // Split text into lines and group into paragraphs, bullet, and sub-bullet lists
    const rawLines = separateUrls(text).split("\n");
    type BulletEntry = { text: string; subs: string[] };
    type ParsedLine =
        | { kind: "bullet"; data: BulletEntry }
        | { kind: "blank" }
        | { kind: "text"; text: string; subs: string[] };

    const parsed: ParsedLine[] = [];

    for (let i = 0; i < rawLines.length; i++) {
        const trimmed = rawLines[i].trim();

        // Sub-bullet: lines starting with ">" (from separateUrls)
        const subMatch = trimmed.match(/^>\s(.+)/);
        if (subMatch) {
            const last = parsed[parsed.length - 1];
            if (last && last.kind === "bullet") {
                last.data.subs.push(subMatch[1]);
            } else if (last && last.kind === "text") {
                last.subs.push(subMatch[1]);
            } else {
                parsed.push({ kind: "bullet", data: { text: subMatch[1], subs: [] } });
            }
            continue;
        }

        // Top-level bullet
        const bulletMatch = trimmed.match(/^([•●\-\*]|\d+\.) (.+)/);
        if (bulletMatch) {
            parsed.push({ kind: "bullet", data: { text: bulletMatch[2], subs: [] } });
            continue;
        }

        if (trimmed === "") {
            parsed.push({ kind: "blank" });
        } else {
            parsed.push({ kind: "text", text: trimmed, subs: [] });
        }
    }

    const elements: React.ReactNode[] = [];
    let itemKey = 0;
    let i = 0;

    while (i < parsed.length) {
        const item = parsed[i];

        if (item.kind === "bullet") {
            const run: BulletEntry[] = [];
            while (i < parsed.length && parsed[i].kind === "bullet") {
                run.push((parsed[i] as { kind: "bullet"; data: BulletEntry }).data);
                i++;
            }
            elements.push(
                <ul key={`ul-${itemKey++}`} style={{ margin: "6px 0 6px 0", padding: "0 0 0 16px", listStyle: "none" }}>
                    {run.map((b, bi) => (
                        <li key={bi} style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: b.subs.length ? 6 : 4, fontSize: "inherit", lineHeight: 1.55 }}>
                            <span style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                                <span style={{ color: GREEN, fontWeight: 700, flexShrink: 0, marginTop: 2, fontSize: 10 }}>●</span>
                                <span>{renderInline(b.text, `bl-${itemKey}-${bi}`)}</span>
                            </span>
                            {b.subs.length > 0 && (
                                <ul style={{ margin: "2px 0 0 20px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 3, fontSize: 14 }}>
                                    {b.subs.map((sub, si) => (
                                        <li key={si} style={{ display: "flex", alignItems: "flex-start", gap: 6, lineHeight: 1.5, fontSize: 14 }}>
                                            <span style={{ color: GREEN, opacity: 0.6, flexShrink: 0, marginTop: 3, fontSize: 8 }}>◦</span>
                                            <span style={{ fontSize: 14 }}>{renderInline(sub, `sub-${itemKey}-${bi}-${si}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            );
        } else if (item.kind === "blank") {
            if (i > 0 && i < parsed.length - 1) {
                elements.push(<div key={`sp-${itemKey++}`} style={{ height: 6 }} />);
            }
            i++;
        } else {
            elements.push(
                <div key={`tx-${itemKey}`} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ display: "block", lineHeight: 1.6 }}>
                        {renderInline(item.text, `ln-${itemKey}`)}
                    </span>
                    {item.subs.length > 0 && (
                        <ul style={{ margin: "2px 0 0 20px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 3, fontSize: 14 }}>
                            {item.subs.map((sub, si) => (
                                <li key={si} style={{ display: "flex", alignItems: "flex-start", gap: 6, lineHeight: 1.5, fontSize: 14 }}>
                                    <span style={{ color: GREEN, opacity: 0.6, flexShrink: 0, marginTop: 3, fontSize: 8 }}>◦</span>
                                    <span style={{ fontSize: 14 }}>{renderInline(sub, `txsub-${itemKey}-${si}`)}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            );
            itemKey++;
            i++;
        }
    }

    return <>{elements}</>;
}

// ─── Portal ───────────────────────────────────────────────────────────────────
const subscribeToClientMount = () => () => undefined;
const getClientMountSnapshot = () => true;
const getServerMountSnapshot = () => false;

function BodyPortal({ children }: { children: React.ReactNode }) {
    const mounted = useSyncExternalStore(subscribeToClientMount, getClientMountSnapshot, getServerMountSnapshot);
    if (!mounted) return null;
    return createPortal(children, document.body);
}

// ─── Clear confirm ────────────────────────────────────────────────────────────
function ClearConfirmDialog({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
    return (
        <div style={{ position: "absolute", top: 64, left: 0, right: 0, zIndex: 10, display: "flex", justifyContent: "center", padding: "0 24px" }}>
            <div style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 12, padding: "16px 20px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", gap: 16, width: "100%", maxWidth: 480 }}>
                <span style={{ fontSize: 13, color: "#374151", flex: 1 }}>Clear all messages? This cannot be undone.</span>
                <button type="button" onClick={onCancel} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", fontSize: 13, cursor: "pointer", color: "#374151" }}>Cancel</button>
                <button type="button" onClick={onConfirm} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: "#ef4444", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Clear</button>
            </div>
        </div>
    );
}

// ─── Intent buttons ───────────────────────────────────────────────────────────
function IntentButtons({ onSelect }: { onSelect: (intent: string) => void }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12, padding: "8px 0 16px 0", width: "100%" }}>
            {INTENTS.map(({ label, emoji }) => (
                <button key={label} type="button" onClick={() => onSelect(label)}
                    style={{ 
                        display: "flex", alignItems: "center", gap: 12, 
                        padding: "14px 16px", borderRadius: 12, 
                        border: "1.5px solid #f3f4f6", background: "#ffffff", 
                        color: "#374151", fontWeight: 600, fontSize: 13, 
                        cursor: "pointer", textAlign: "left",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                    onMouseEnter={e => { 
                        (e.currentTarget as HTMLButtonElement).style.borderColor = GREEN; 
                        (e.currentTarget as HTMLButtonElement).style.background = "#f0fdfa"; // Very light teal/green
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 16px rgba(45, 212, 191, 0.15)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => { 
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#f3f4f6"; 
                        (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 6px rgba(0,0,0,0.03)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                    }}>
                    <span style={{ fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#f8fafc", borderRadius: 8 }}>{emoji}</span>
                    <span style={{ lineHeight: 1.3 }}>{label}</span>
                </button>
            ))}
        </div>
    );
}

// ─── Post-challenge action buttons (2 only) ──────────────────────────────────
function ChallengeActionButtons({ onSME, onCall, onChangeIntent }: {
    onSME: () => void; onCall: () => void; onChangeIntent: () => void;
}) {
    const btn: React.CSSProperties = {
        padding: "9px 14px", borderRadius: 12, border: `1.5px solid ${GREEN}`,
        background: GREEN_LIGHT, color: GREEN, fontWeight: 600, fontSize: 12,
        cursor: "pointer", textAlign: "left" as const, transition: "background 0.15s",
    };
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "0 0 16px 0" }}>
            <button type="button" onClick={onSME} style={btn}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GREEN; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = GREEN_LIGHT; (e.currentTarget as HTMLButtonElement).style.color = GREEN; }}>
                🧑‍💼 Connect with an Expert
            </button>
            <button type="button" onClick={onCall} style={btn}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GREEN; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = GREEN_LIGHT; (e.currentTarget as HTMLButtonElement).style.color = GREEN; }}>
                📅 Schedule a Consultation
            </button>
            <button type="button" onClick={onChangeIntent} style={btn}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GREEN; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = GREEN_LIGHT; (e.currentTarget as HTMLButtonElement).style.color = GREEN; }}>
                🔄 Change Area of Interest
            </button>
        </div>
    );
}

// ─── Ongoing action buttons (after challenge captured) ────────────────────────
function ActionButtons({ onSME, onBook, onChangeIntent, smeConnected }: { onSME: () => void; onBook: () => void; onChangeIntent: () => void; smeConnected: boolean }) {
    const btn: React.CSSProperties = {
        padding: "9px 18px", borderRadius: 20, border: `1.5px solid ${GREEN}`,
        background: "#ffffff", color: GREEN, fontWeight: 600, fontSize: 13,
        cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.15s",
    };
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, padding: "0 0 16px 0" }}>
            {!smeConnected && (
                <button type="button" onClick={onSME} style={btn}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GREEN_LIGHT; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#ffffff"; }}>
                    🧑‍💼 Connect with an SME
                </button>
            )}
            <button type="button" onClick={onBook} style={btn}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GREEN_LIGHT; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#ffffff"; }}>
                📅 Book a call
            </button>
            <button type="button" onClick={onChangeIntent} style={btn}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GREEN_LIGHT; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#ffffff"; }}>
                🔄 Change Area of Interest
            </button>
        </div>
    );
}

// ─── Call booking form ────────────────────────────────────────────────────────
function CallBookingForm({ onSubmit }: { onSubmit: (name: string, email: string, org: string, date: string, time: string, tz: string) => void }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [org, setOrg] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [tz, setTz] = useState("IST (UTC+5:30)");
    const [error, setError] = useState("");

    const today = new Date().toISOString().split("T")[0];

    const timeSlots: string[] = [];
    for (let h = 6; h <= 22; h++) {
        ["00", "30"].forEach((m) => {
            const hour12 = h % 12 === 0 ? 12 : h % 12;
            const ampm = h < 12 ? "AM" : "PM";
            timeSlots.push(`${String(hour12).padStart(2, "0")}:${m} ${ampm}`);
        });
    }

    const timezones = [
        "IST (UTC+5:30)", "EST (UTC-5)", "PST (UTC-8)", "GMT (UTC+0)",
        "CET (UTC+1)", "GST (UTC+4)", "SGT (UTC+8)", "AEST (UTC+10)", "JST (UTC+9)",
    ];

    const inputStyle: React.CSSProperties = {
        width: "100%", padding: "8px 10px", borderRadius: 8,
        border: "1px solid #e5e7eb", fontSize: 13, color: DARK_TEXT,
        marginTop: 4, marginBottom: 10, boxSizing: "border-box" as const,
        background: "#fff", outline: "none",
    };

    return (
        <div style={{ background: "#fff", border: `1.5px solid ${GREEN}`, borderRadius: 12, padding: "16px 18px", marginBottom: 12, animation: "airaMsgIn 0.22s ease" }}>
            <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: DARK_TEXT }}>📅 Schedule a Consultation</p>
            <p style={{ margin: "0 0 14px", fontSize: 12, color: "#6b7280" }}>Share your details and preferred time — our team will confirm the meeting.</p>

            <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>Your Name *</label>
            <input type="text" placeholder="e.g. John Smith" value={name}
                onChange={e => { setName(e.target.value); setError(""); }} style={inputStyle} />

            <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>Business Email *</label>
            <input type="email" placeholder="e.g. john@company.com" value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }} style={inputStyle} />

            <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>Organisation *</label>
            <input type="text" placeholder="e.g. Acme Corp" value={org}
                onChange={e => { setOrg(e.target.value); setError(""); }} style={inputStyle} />

            <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>Preferred Date *</label>
            <input type="date" min={today} value={date}
                onChange={e => { setDate(e.target.value); setError(""); }} style={inputStyle} />

            <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>Preferred Time *</label>
            <select value={time} onChange={e => { setTime(e.target.value); setError(""); }} style={inputStyle}>
                <option value="">Select a time...</option>
                {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>Timezone</label>
            <select value={tz} onChange={e => setTz(e.target.value)} style={inputStyle}>
                {timezones.map(z => <option key={z} value={z}>{z}</option>)}
            </select>

            {error && <p style={{ color: "#dc2626", fontSize: 12, margin: "0 0 8px" }}>{error}</p>}

            <button
                type="button"
                onClick={() => {
                    if (!name.trim()) { setError("Please enter your name."); return; }
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError("Please enter a valid business email."); return; }
                    if (!org.trim()) { setError("Please enter your organisation name."); return; }
                    if (!date || !time) { setError("Please select a preferred date and time."); return; }
                    onSubmit(name.trim(), email.trim(), org.trim(), date, time, tz);
                }}
                style={{ width: "100%", padding: "10px", borderRadius: 20, border: "none", background: GREEN, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", marginTop: 4 }}>
                Confirm Meeting Request →
            </button>
        </div>
    );
}

// ─── SME Contact Form ─────────────────────────────────────────────────────────
function SMEContactForm({ onSubmit }: { onSubmit: (name: string, email: string, org: string) => void }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [org, setOrg] = useState("");
    const [error, setError] = useState("");

    const inputStyle: React.CSSProperties = {
        width: "100%", padding: "8px 10px", borderRadius: 8,
        border: "1px solid #e5e7eb", fontSize: 13, color: DARK_TEXT,
        marginTop: 4, marginBottom: 10, boxSizing: "border-box" as const,
        background: "#fff", outline: "none",
    };

    return (
        <div style={{ background: "#fff", border: `1.5px solid ${GREEN}`, borderRadius: 12, padding: "16px 18px", marginBottom: 12, animation: "airaMsgIn 0.22s ease" }}>
            <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: DARK_TEXT }}>🧑‍💼 Connect with an Expert</p>
            <p style={{ margin: "0 0 14px", fontSize: 12, color: "#6b7280" }}>Share your contact details and we'll have the right person reach out.</p>

            <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>Your Name *</label>
            <input
                type="text" placeholder="e.g. John Smith"
                value={name} onChange={e => { setName(e.target.value); setError(""); }}
                style={inputStyle}
            />

            <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>Business Email *</label>
            <input
                type="email" placeholder="e.g. john@company.com"
                value={email} onChange={e => { setEmail(e.target.value); setError(""); }}
                style={inputStyle}
            />

            <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>Organisation *</label>
            <input
                type="text" placeholder="e.g. Acme Corp"
                value={org} onChange={e => { setOrg(e.target.value); setError(""); }}
                style={inputStyle}
            />

            {error && <p style={{ color: "#dc2626", fontSize: 12, margin: "0 0 8px" }}>{error}</p>}

            <button
                type="button"
                onClick={() => {
                    if (!name.trim()) { setError("Please enter your name."); return; }
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError("Please enter a valid business email."); return; }
                    if (!org.trim()) { setError("Please enter your organisation name."); return; }
                    onSubmit(name.trim(), email.trim(), org.trim());
                }}
                style={{ width: "100%", padding: "10px", borderRadius: 20, border: "none", background: GREEN, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", marginTop: 4 }}>
                Connect Me with an Expert →
            </button>
        </div>
    );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────
export function AskAiraWidget() {
    const router = useRouter();
    const pathname = usePathname();

    // scroll / hover state
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

    // onboarding state
    const [onboardStep, setOnboardStep] = useState<OnboardStep>("ask_intent");
    const [leadData, setLeadData] = useState<LeadData>({ name: "", email: "", intent: "", challenge: "", organisation: "" });
    const [leadCaptured, setLeadCaptured] = useState(false);
    const [smeConnected, setSmeConnected] = useState(false);
    const [showCallForm, setShowCallForm] = useState(false);
    const [showSMEForm, setShowSMEForm] = useState(false);
    const [showChallengeActions, setShowChallengeActions] = useState(false);
    const [chatTurnCount, setChatTurnCount] = useState(0);

    // voice state
    const [isListening, setIsListening] = useState(false);
    const [isVoiceInputUnavailable, setIsVoiceInputUnavailable] = useState(false);
    const [speechError, setSpeechError] = useState("");
    const [speakingMessageIndex, setSpeakingMessageIndex] = useState<number | null>(null);
    const [hasSpeechRecognition, setHasSpeechRecognition] = useState(false);
    const isSpeechSupported = hasSpeechRecognition && !isVoiceInputUnavailable;
    const networkRetryCountRef = useRef(0);
    const MAX_NETWORK_RETRIES = 3;

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatInputRef = useRef<HTMLInputElement>(null);
    const isSendingRef = useRef(false);
    const sessionIdRef = useRef(generateSessionId());
    const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
    const listeningBaseInputRef = useRef("");
    const isStoppingVoiceInputRef = useRef(false);

    useEffect(() => { setHasSpeechRecognition(Boolean(getSpeechRecognitionConstructor())); }, []);

    // ── Scroll / footer observer ──────────────────────────────────────────────
    useEffect(() => {
        const footerEl = document.getElementById("site-footer");
        let isTop = window.scrollY < 150;
        let footerVisible = false;
        const initialFrame = requestAnimationFrame(() => setIsMiddle(!isTop));
        const update = () => setIsMiddle(!isTop && !footerVisible);
        const handleScroll = () => {
            let newIsTop = false;
            if (pathname === "/") {
                const el = document.getElementById("trust-bar-section");
                newIsTop = el ? el.getBoundingClientRect().top > window.innerHeight - 100 : window.scrollY < 150;
            } else { newIsTop = window.scrollY < 150; }
            if (newIsTop !== isTop) { isTop = newIsTop; update(); }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        const obs = new IntersectionObserver(([e]) => { footerVisible = e.isIntersecting; update(); }, { threshold: 0.1 });
        if (footerEl) obs.observe(footerEl);
        return () => { window.removeEventListener("scroll", handleScroll); obs.disconnect(); cancelAnimationFrame(initialFrame); };
    }, [pathname]);

    useEffect(() => { clearStaleChatStorage(); sessionIdRef.current = generateSessionId(); }, []);

    useEffect(() => {
        return () => {
            isStoppingVoiceInputRef.current = true;
            recognitionRef.current?.abort();
            window.speechSynthesis?.cancel();
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        const handler = (e: Event) => {
            const url = (e as CustomEvent<{ url: string }>).detail.url;
            setIsOpen(false); setIsClosing(false);
            isStoppingVoiceInputRef.current = true;
            recognitionRef.current?.stop(); recognitionRef.current = null;
            setIsListening(false); window.speechSynthesis?.cancel(); setSpeakingMessageIndex(null);
            router.push(url);
        };
        window.addEventListener("aira:navigate", handler);
        return () => window.removeEventListener("aira:navigate", handler);
    }, [router]);

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, showCallForm, showChallengeActions]);
    useEffect(() => { if (isOpen) setTimeout(() => chatInputRef.current?.focus(), 150); }, [isOpen]);
    useEffect(() => {
        if (isOpen) { const t = setTimeout(() => chatInputRef.current?.focus(), 200); return () => clearTimeout(t); }
    }, [pathname, isOpen]);
    useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isOpen]);

    // Inject welcome message when chat opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([botMsg("Great solutions start with the right conversation. 💡\n\nI'm AIRA, Hyniva's intelligent business advisor.\n\nHere's how I can help:\n• Share your goals, challenges, or ideas\n• Identify the right expertise and solutions tailored to your needs\n• Map out actionable next steps for your business")]);
        }
    }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

    const stopVoiceInput = useCallback(() => {
        isStoppingVoiceInputRef.current = true;
        recognitionRef.current?.stop(); recognitionRef.current = null; setIsListening(false);
    }, []);

    const stopReading = useCallback(() => { window.speechSynthesis?.cancel(); setSpeakingMessageIndex(null); }, []);

    const closeChat = useCallback(() => {
        stopVoiceInput(); stopReading(); setIsClosing(true);
        setTimeout(() => { setIsOpen(false); setIsClosing(false); }, 420);
    }, [stopReading, stopVoiceInput]);

    const executeClear = useCallback(async () => {
        setShowClearConfirm(false);
        try {
            await fetch("/api/chatbot/session/close", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ session_id: sessionIdRef.current }),
            });
        } catch { /* ignore */ }
        sessionIdRef.current = generateSessionId();
        clearStaleChatStorage();
        setMessages([botMsg("Great solutions start with the right conversation. 💡\n\nI'm AIRA, Hyniva's intelligent business advisor.\n\nHere's how I can help:\n• Share your goals, challenges, or ideas\n• Identify the right expertise and solutions tailored to your needs\n• Map out actionable next steps for your business")]);
        setOnboardStep("ask_intent");
        setLeadData({ name: "", email: "", intent: "", challenge: "", organisation: "" });
        setLeadCaptured(false); setSmeConnected(false);
        setShowCallForm(false); setShowSMEForm(false); setShowChallengeActions(false);
        setInputValue(""); stopVoiceInput(); stopReading();
        setSpeechError(""); setIsVoiceInputUnavailable(false);
        isSendingRef.current = false; setIsLoading(false);
        setTimeout(() => chatInputRef.current?.focus(), 50);
    }, [stopReading, stopVoiceInput]);

    const requestClear = useCallback(() => { if (messages.length === 0) return; setShowClearConfirm(true); }, [messages.length]);

    // ── sendMessage ───────────────────────────────────────────────────────────
    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || isLoading || isSendingRef.current) return;
        stopVoiceInput(); stopReading(); setSpeechError("");
        isSendingRef.current = true;
        const trimmed = text.trim();
        setInputValue("");

        // ── ask_custom_intent (user typed freely instead of picking a button) ──
        if (onboardStep === "ask_intent" || onboardStep === "ask_custom_intent") {
            // Store what they typed as intent, go straight to chat
            const updatedLead: LeadData = { ...leadData, intent: trimmed };
            setLeadData(updatedLead);
            setLeadCaptured(true);
            setOnboardStep("chat");
            setMessages(prev => [...prev, userMsg(trimmed)]);
            setIsLoading(true);
            isSendingRef.current = true;

            let reply = "";
            let routeToNavigate: string | null = null;
            try {
                const sessionId = sessionIdRef.current;
                const res = await fetch("/api/chatbot", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: trimmed, session_id: sessionId, user_intent: trimmed }),
                });
                if (!res.ok) {
                    reply = res.status === 403 ? HYNIVA_ONLY_MESSAGE : "";
                    if (!reply) throw new Error("API error");
                } else {
                    const data: ApiResponse = await res.json();
                    reply = formatToBullets(normalizeProductLinksInText(data.message || "Sorry, I couldn't understand that."));
                    routeToNavigate = data.route || data.target_route || null;
                    if (routeToNavigate) routeToNavigate = normalizeProductRoute(routeToNavigate);
                }
            } catch {
                reply = "Sorry, I couldn't reach the server right now. Please try again.";
            }
            setMessages(prev => [...prev, botMsg(reply)]);
            if (routeToNavigate) setTimeout(() => navigateFromChat(routeToNavigate!), 700);
            setShowChallengeActions(true);
            setChatTurnCount(1);
            setIsLoading(false);
            isSendingRef.current = false;
            return;
        }

        // ── ask_challenge ─────────────────────────────────────────────────────
        if (onboardStep === "ask_challenge") {
            const updatedLead: LeadData = { ...leadData, challenge: trimmed };
            setLeadData(updatedLead);
            setLeadCaptured(true);
            
            setMessages(prev => [...prev, userMsg(trimmed)]);
            setIsLoading(true);
            isSendingRef.current = true;
            
            let reply = "";
            let routeToNavigate: string | null = null;
            
            try {
                const sessionId = sessionIdRef.current;
                // ✅ user_intent sent ONCE here to initialise backend session context.
                // All subsequent messages rely on backend session memory — no user_intent appended.
                const combinedIntent = `${updatedLead.intent} — ${updatedLead.challenge}`;
                
                const res = await fetch("/api/chatbot", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        message: trimmed,
                        session_id: sessionId,
                        user_intent: combinedIntent,
                    }),
                });
                
                if (!res.ok) {
                    reply = res.status === 403 ? HYNIVA_ONLY_MESSAGE : "";
                    if (!reply) throw new Error("API error");
                } else {
                    const data: ApiResponse = await res.json();
                    reply = formatToBullets(normalizeProductLinksInText(data.message || "Sorry, I couldn't understand that."));
                    routeToNavigate = data.route || data.target_route || null;
                    if (routeToNavigate) routeToNavigate = normalizeProductRoute(routeToNavigate);
                }
            } catch {
                reply = "Sorry, I couldn't reach the server right now. Please try again.";
            }
            
            setMessages(prev => [...prev, botMsg(reply)]);
            if (routeToNavigate) setTimeout(() => navigateFromChat(routeToNavigate!), 700);
            
            setOnboardStep("chat");
            setShowChallengeActions(false);
            setChatTurnCount(1);
            setIsLoading(false);
            isSendingRef.current = false;
            return;
        }

        // ── ask_call_time (typed fallback) ────────────────────────────────────
        if (onboardStep === "ask_call_time") {
            fireBookCall(leadData, trimmed);
            setShowCallForm(false);
            setMessages(prev => [...prev, userMsg(trimmed),
                botMsg(`Thank you, ${leadData.name}.\n\nI've recorded your preferred meeting time:\n📅 ${trimmed}\n\nOur team will review your request and reach out to ${leadData.email} to confirm the call.\n\nIs there anything else I can help with?`)]);
            setOnboardStep("chat");
            isSendingRef.current = false; return;
        }

        // ── chat step — intercepts before API ─────────────────────────────────
        const isSmeRequest  = /connect.*sme|sme.*connect|speak.*expert|talk.*expert|connect.*expert|connect.*specialist|connect with a solution|connect with an expert/i.test(trimmed);
        const isBookRequest = /book.*call|schedule.*call|book.*meeting|schedule a|book a call|i.d like to book|schedule a consultation/i.test(trimmed);
        const isShortYes    = /^(yes|yeah|yep|yup|sure|ok|okay|👍)\.?$/i.test(trimmed);
        const isChangeIntent = /change.*topic|change.*intent|different.*topic|different.*intent|talk.*about.*something.*else|another.*topic/i.test(trimmed);

        if (isChangeIntent && leadCaptured) {
            setShowChallengeActions(false); // hide while picking new intent
            setChatTurnCount(0); // reset so buttons reappear after new challenge
            setMessages(prev => [...prev, userMsg(trimmed),
                botMsg(`No problem, ${leadData.name}. What other area would you like to explore?`)]);
            setOnboardStep("ask_intent");
            isSendingRef.current = false; return;
        }

        if (isSmeRequest && leadCaptured) {
            // Show contact form — collect name/email/org before firing lead email
            setShowSMEForm(true);
            setOnboardStep("ask_sme_contact");
            isSendingRef.current = false; return;
        }

        if (isBookRequest && leadCaptured) {
            setShowChallengeActions(false); // hide while booking form is shown
            setMessages(prev => [...prev, userMsg(trimmed),
                botMsg(`Great, ${leadData.name}!\n\nTo help us arrange the discussion, please fill in your preferred meeting details below 👇`)]);
            setOnboardStep("ask_call_time");
            setShowCallForm(true);
            isSendingRef.current = false; return;
        }

        if (isShortYes && leadCaptured) {
            // keep buttons visible — just let them continue chatting
            setMessages(prev => [...prev, userMsg(trimmed),
                botMsg(`Of course, ${leadData.name}! What would you like to know? I'm here to help 😊`)]);
            isSendingRef.current = false; return;
        }

        // ── Normal API call ───────────────────────────────────────────────────
        // user_intent is NOT sent here — it was sent once during ask_challenge to
        // initialise backend session context. All subsequent messages rely on
        // backend session memory so the bot can respond naturally to any topic.
        // showChallengeActions stays true so buttons persist after every reply.
        setChatTurnCount(prev => prev + 1);
        setMessages(prev => [...prev, userMsg(trimmed)]);
        setIsLoading(true);

        let reply = "";
        let routeToNavigate: string | null = null;

        try {
            const sessionId = sessionIdRef.current;

            const res = await fetch("/api/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: trimmed,
                    session_id: sessionId,
                    // ✅ No user_intent — backend uses session context from initial setup
                }),
            });

            if (!res.ok) {
                reply = res.status === 403 ? HYNIVA_ONLY_MESSAGE : "";
                if (!reply) throw new Error("API error");
            } else {
                const data: ApiResponse = await res.json();
                reply = formatToBullets(normalizeProductLinksInText(data.message || "Sorry, I couldn't understand that."));
                routeToNavigate = data.route || data.target_route || null;
                if (routeToNavigate) routeToNavigate = normalizeProductRoute(routeToNavigate);
            }
        } catch {
            reply = "Sorry, I couldn't reach the server right now. Please try again.";
        }

        setMessages(prev => [...prev, botMsg(reply)]);
        if (routeToNavigate) setTimeout(() => navigateFromChat(routeToNavigate!), 700);
        setIsLoading(false);
        isSendingRef.current = false;
    }, [isLoading, onboardStep, leadData, leadCaptured, stopReading, stopVoiceInput]);

    // ── Intent button handler ─────────────────────────────────────────────────
    const intentPrompts: Record<string, string> = {
        "Digital Transformation": `Excellent choice.

To better understand your digital transformation goals, please briefly describe your business challenge or project requirement.

What are you looking to achieve, what problem are you trying to solve, or what support do you need from Hyniva?

For example:
• Modernizing legacy applications and business systems
• Improving customer and member digital experiences
• Building custom web, mobile, or self-service portals
• Automating manual workflows and business processes
• Replacing outdated systems with scalable cloud solutions
• Accelerating digital initiatives with AI-powered capabilities
• Streamlining operations across departments and teams
• Creating seamless omnichannel customer journeys
• Driving enterprise-wide transformation with measurable business outcomes`,
        "Enterprise Platforms": `Excellent choice.

To better understand your platform requirements, please briefly describe your business challenge or project requirement.

What are you looking to achieve, what problem are you trying to solve, or what support do you need from Hyniva?

For example:
• Implementing Salesforce Financial Services Cloud or Agentforce
• Modernizing CRM, ERP, or customer service platforms
• Deploying Microsoft Dynamics 365 or Power Platform solutions
• Integrating enterprise applications and data sources
• Optimizing existing Salesforce or Microsoft environments
• Automating customer onboarding and servicing processes
• Enhancing reporting, analytics, and business visibility
• Migrating from legacy platforms to modern enterprise solutions
• Building custom applications on Salesforce or Microsoft ecosystems`,
        "Product Engineering": `Excellent choice.

To better understand your product vision, please briefly describe your business challenge or product requirement.

What are you looking to build, improve, or scale with Hyniva?

For example:
• Building a new SaaS product or digital platform
• Developing AI-powered applications and intelligent solutions
• Creating customer-facing web and mobile applications
• Accelerating product development and MVP delivery
• Modernizing an existing software product
• Enhancing product performance, security, and scalability
• Building APIs, microservices, and cloud-native architectures
• Implementing DevOps and automated testing practices
• Scaling engineering teams to support business growth`,
        "Data, AI & Automation": `Excellent choice.

To better understand your AI and automation goals, please briefly describe your business challenge or project requirement.

What are you looking to achieve, what problem are you trying to solve, or what support do you need from Hyniva?

For example:
• Building AI agents, copilots, or virtual assistants
• Automating repetitive business processes and workflows
• Leveraging Generative AI to improve productivity
• Creating intelligent document processing solutions
• Implementing predictive analytics and machine learning models
• Modernizing data platforms and reporting capabilities
• Improving decision-making through real-time insights
• Automating customer service and support operations
• Developing compliance-focused AI solutions for regulated industries`,
        "Cloud & Infrastructure Services": `Excellent choice.

To better understand your cloud and infrastructure requirements, please briefly describe your business challenge or project requirement.

What are you looking to achieve, what problem are you trying to solve, or what support do you need from Hyniva?

For example:
• Migrating applications and workloads to AWS, Azure, or Google Cloud
• Modernizing legacy infrastructure and applications
• Designing cloud-native architectures and services
• Improving scalability, reliability, and system performance
• Strengthening security, compliance, and disaster recovery
• Optimizing cloud spending and operational efficiency
• Implementing DevOps and infrastructure automation
• Building multi-cloud or hybrid cloud environments
• Enhancing business continuity and operational resilience`,
        "Strategy & IT Consulting": `Excellent choice.

To better understand your strategic goals, please briefly describe your business challenge or project requirement.

What are you looking to achieve, what problem are you trying to solve, or what support do you need from Hyniva?

For example:
• Defining a digital transformation roadmap
• Creating an AI adoption and innovation strategy
• Evaluating technology platforms and architecture options
• Aligning IT investments with business objectives
• Assessing cloud modernization opportunities
• Optimizing enterprise operating models and processes
• Improving governance, compliance, and risk management
• Planning large-scale modernization initiatives
• Developing a long-term technology growth strategy`,
        "Managed Services & Support": `Excellent choice.

To better understand your support requirements, please briefly describe your business challenge or operational need.

What are you looking to achieve, what problem are you trying to solve, or what support do you need from Hyniva?

For example:
• Managing and supporting business-critical applications
• Establishing 24/7 monitoring and operational support
• Improving application performance and availability
• Managing cloud infrastructure and platform operations
• Reducing support costs and operational overhead
• Enhancing incident, problem, and change management processes
• Extending internal IT and engineering teams
• Maintaining security, compliance, and governance standards
• Scaling support services as your business grows`,
        "Hyniva Products & Solutions": `Excellent choice.

To better understand your requirements, please briefly describe your business challenge or project requirement.

Which Hyniva solution would you like to explore, or what business outcome are you looking to achieve?

For example:
• Exploring FinXServe for lending and customer acquisition journeys
• Evaluating AIRA for enterprise AI and intelligent automation
• Learning about Claim Pioneer for claims management automation
• Discovering Hyper for wealth and portfolio recommendation experiences
• Requesting a product demonstration or consultation
• Understanding implementation timelines and requirements
• Integrating Hyniva products with existing systems
• Enhancing customer experiences with ready-to-deploy solutions
• Accelerating business transformation using proven platforms`,
        "Partnership Opportunities": `Excellent choice.

To better understand your partnership interests, please briefly describe your goals and collaboration requirements.

How would you like to partner with Hyniva?

For example:
• Technology alliance and ecosystem partnerships
• Salesforce, Microsoft, AWS, or AI-focused collaborations
• Joint go-to-market initiatives and solution offerings
• Product integration and co-innovation opportunities
• Delivery and implementation partnerships
• Referral and channel partner programs
• Industry-specific solution development initiatives
• Strategic business and consulting partnerships
• Global delivery and engineering collaboration opportunities`,
    };

    const handleIntentSelect = useCallback((intent: string) => {
        if (intent === "Other") {
            setMessages(prev => [...prev, userMsg("Something else"),
                botMsg(`Please tell us more about your inquiry, business challenge, or project requirement.\n\nHow can Hyniva help you today?\n\nFor example:\n• Learning more about Hyniva's services and capabilities\n• Exploring solutions for a unique business challenge\n• Requesting a consultation or discovery session\n• Discussing digital transformation initiatives\n• Seeking guidance on AI, cloud, or enterprise platforms\n• Understanding Hyniva's industry expertise and experience\n• Exploring potential collaboration opportunities\n• Requesting information about products and solutions\n• Any other requirement not listed above`)]);
            setOnboardStep("ask_challenge"); return;
        }
        setLeadData(prev => ({ ...prev, intent }));
        setChatTurnCount(0);
        setMessages(prev => [...prev, userMsg(intent),
            botMsg(intentPrompts[intent] || `Excellent choice.\n\nPlease briefly describe your business challenge or project requirement.\n\nWhat are you looking to achieve, what problem are you trying to solve, or what support do you need from Hyniva?`)]);
        setOnboardStep("ask_challenge");
    }, [leadData.name]);

    // ── Voice input ───────────────────────────────────────────────────────────
    const toggleVoiceInput = useCallback(() => {
        if (isListening) { stopVoiceInput(); return; }
        const Ctor = getSpeechRecognitionConstructor();
        if (!Ctor) { setSpeechError("Voice input is not supported in this browser."); return; }
        setIsVoiceInputUnavailable(false); setSpeechError("");
        networkRetryCountRef.current = 0;
        listeningBaseInputRef.current = inputValue.trim() ? `${inputValue.trim()} ` : "";
        isStoppingVoiceInputRef.current = false;
        let isRetrying = false;

        const startRecognition = () => {
            const C = getSpeechRecognitionConstructor(); if (!C) return;
            const r = new C();
            r.continuous = true; r.interimResults = true;
            r.lang = detectSpeechLanguage(inputValue.trim()) || "en-US";
            r.onresult = (ev) => {
                let t = "";
                for (let i = 0; i < ev.results.length; i++) t += ev.results[i][0].transcript;
                setInputValue(`${listeningBaseInputRef.current}${t}`.trimStart());
            };
            r.onerror = (ev) => {
                if (isStoppingVoiceInputRef.current || ev.error === "aborted") {
                    isRetrying = false; setIsListening(false); recognitionRef.current = null; return;
                }
                if (ev.error === "network" && networkRetryCountRef.current < MAX_NETWORK_RETRIES) {
                    networkRetryCountRef.current++; isRetrying = true; setSpeechError("Reconnecting mic…");
                    recognitionRef.current = null;
                    setTimeout(() => {
                        if (!isStoppingVoiceInputRef.current) { setSpeechError(""); startRecognition(); }
                        else { isRetrying = false; setIsListening(false); }
                    }, 1200);
                } else {
                    isRetrying = false; setSpeechError(getSpeechRecognitionErrorMessage(ev.error));
                    if (shouldDisableVoiceInputAfterError(ev.error)) setIsVoiceInputUnavailable(true);
                    else setTimeout(() => setSpeechError(""), 4000);
                    setIsListening(false); recognitionRef.current = null;
                }
            };
            r.onend = () => {
                if (isRetrying) { recognitionRef.current = null; return; }
                isStoppingVoiceInputRef.current = false; setIsListening(false); recognitionRef.current = null;
                setTimeout(() => chatInputRef.current?.focus(), 50);
            };
            recognitionRef.current = r;
            try { r.start(); setIsListening(true); }
            catch { isRetrying = false; setSpeechError("Voice input could not start. Please try again."); recognitionRef.current = null; setIsListening(false); }
        };
        startRecognition();
    }, [inputValue, isListening, isVoiceInputUnavailable, stopVoiceInput]);

    // ── TTS ───────────────────────────────────────────────────────────────────
    const readMessage = useCallback(async (text: string, index: number) => {
        if (!("speechSynthesis" in window)) return;
        if (speakingMessageIndex === index) { stopReading(); return; }
        window.speechSynthesis.cancel();
        const st = buildSpeechText(text); if (!st) return;
        const voices = await getSpeechSynthesisVoices();
        if (speakingMessageIndex === index) return;
        const segs = splitIntoLanguageSegments(st); if (!segs.length) return;
        setSpeakingMessageIndex(index);
        const speak = (i: number) => {
            if (i >= segs.length) { setSpeakingMessageIndex(null); return; }
            const seg = segs[i]; if (!seg.text.trim()) { speak(i + 1); return; }
            const u = new SpeechSynthesisUtterance(seg.text);
            const v = getPreferredAiraVoice(seg.lang, voices);
            if (v) u.voice = v; u.lang = v?.lang || seg.lang;
            u.rate = 0.84; u.pitch = 1.18; u.volume = 0.92;
            u.onend = () => speak(i + 1); u.onerror = () => setSpeakingMessageIndex(null);
            window.speechSynthesis.speak(u);
        };
        speak(0);
    }, [speakingMessageIndex, stopReading]);

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue); }
    };

    const inputDisabled = onboardStep === "ask_intent" || onboardStep === "ask_call_time" || onboardStep === "ask_sme_contact";
    const inputPlaceholder = isListening ? "Listening..." : ({
        ask_intent:        "Or type your goal or challenge...",
        ask_custom_intent: "Describe what you're looking for...",
        ask_challenge:     "Describe your challenge...",
        ask_sme_contact:   "Fill in the form above...",
        ask_call_time:     "Or type your preferred time here...",
        chat:              "Ask a follow up...",
    } as Record<OnboardStep, string>)[onboardStep] ?? "Message AIRA...";

    const voiceInputTitle = isVoiceInputUnavailable
        ? "Microphone access was blocked." : isSpeechSupported
            ? (isListening ? "Stop voice input" : "Start voice input")
            : "Voice input is not supported in this browser";

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <>
            {/* ── Floating pill ── */}
            <div
                className="fixed aira-widget-container"
                onMouseEnter={() => {
                    if (hoverTimeoutRef.current) { clearTimeout(hoverTimeoutRef.current); hoverTimeoutRef.current = null; }
                    setIsHovered(true);
                }}
                onMouseLeave={() => {
                    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                    hoverTimeoutRef.current = setTimeout(() => { setIsHovered(false); hoverTimeoutRef.current = null; }, 150);
                }}
                style={{
                    pointerEvents: "auto",
                    right: (isMiddle && !isHovered) ? "0" : "1rem",
                    bottom: "2rem", left: "auto",
                    display: "flex", flexDirection: "column", alignItems: "flex-end",
                    transition: "right 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)", zIndex: 9999,
                }}
            >
                {isHovered && (
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 300, height: 300, background: "radial-gradient(circle,rgba(59,130,246,0.15) 0%,rgba(59,130,246,0.08) 40%,transparent 70%)", borderRadius: "50%", filter: "blur(40px)", zIndex: 0, pointerEvents: "none", animation: "airaGlowPulse 2s ease-in-out infinite" }} />
                )}
                <motion.div initial={false} animate={{ opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 28 }} className="relative flex flex-col items-center" style={{ pointerEvents: "auto" }}>
                    <motion.div
                        className={`aira-mascot-container ${(isMiddle && !isHovered) ? "aira-mascot-minimized" : "aira-mascot-expanded"}`}
                        initial={false}
                        animate={{ opacity: (isMiddle && !isHovered) ? 0 : 1, scale: (isMiddle && !isHovered) ? 0.5 : 1, y: (isMiddle && !isHovered) ? 20 : 0, x: "-45%" }}
                        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                        style={{ position: "absolute", left: "50%", bottom: (isMiddle && !isHovered) ? "-10px" : "27px", width: (isMiddle && !isHovered) ? 0 : 85, height: (isMiddle && !isHovered) ? 0 : 85, visibility: (isMiddle && !isHovered) ? "hidden" : "visible", display: "flex", alignItems: "flex-end", justifyContent: "center", pointerEvents: "none", zIndex: 3, overflow: "visible" }}
                    >
                        <img src="/images/AIRA_MASCOT/AIRA_New.png" alt="AIRA" width={120} height={120} className="aira-mascot-grip"
                            style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom center", filter: isHovered ? "drop-shadow(0 0 3px rgba(59,130,246,1)) drop-shadow(0 0 8px rgba(59,130,246,0.8)) drop-shadow(0 0 15px rgba(59,130,246,0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.1))" : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))", transition: "filter 0.3s ease-out" }} />
                    </motion.div>
                    <button onClick={() => setIsOpen(true)}
                        className={`relative flex items-center justify-center rounded-full font-black text-white border-none cursor-pointer uppercase tracking-wide aira-button ${(isMiddle && !isHovered) ? "aira-button-minimized" : "aira-button-expanded"}`}
                        style={{ position: "relative", zIndex: 2, background: "#2563eb", boxShadow: isHovered ? "0 0 2px 1px rgba(59,130,246,1),0 0 8px 2px rgba(59,130,246,0.8),0 0 20px 4px rgba(59,130,246,0.5),0 4px 12px rgba(37,99,235,0.5)" : "0 2px 8px rgba(37,99,235,0.3)", minWidth: (isMiddle && !isHovered) ? 42 : "auto", paddingLeft: (isMiddle && !isHovered) ? 11 : 16, paddingRight: (isMiddle && !isHovered) ? 11 : 16, height: 32, fontSize: 11, borderRadius: (isMiddle && !isHovered) ? "21px 0 0 21px" : 21, transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#2563eb"; }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.9))" }}>
                                <path d="M10 2L11.5 7.5L17 9L11.5 10.5L10 16L8.5 10.5L3 9L8.5 7.5L10 2Z" />
                                <path d="M18 12L18.75 14.25L21 15L18.75 15.75L18 18L17.25 15.75L15 15L17.25 14.25L18 12Z" />
                                <path d="M17 3L17.5 4.5L19 5L17.5 5.5L17 7L16.5 5.5L15 5L16.5 4.5L17 3Z" />
                            </svg>
                        </div>
                        <span className={`aira-button-text ${(isMiddle && !isHovered) ? "aira-text-minimized" : "aira-text-expanded"}`}
                            style={{ opacity: (isMiddle && !isHovered) ? 0 : 1, transition: "opacity 0.3s ease-out", width: (isMiddle && !isHovered) ? 0 : "auto", overflow: "hidden", display: "flex", alignItems: "center", gap: 4, marginLeft: (isMiddle && !isHovered) ? 0 : 8 }}>
                            <img src="/aira-text.png" alt="AIRA" style={{ height: 11, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                            <ChevronRight size={14} strokeWidth={3} />
                        </span>
                    </button>
                </motion.div>
            </div>

            {/* ── Chat panel ── */}
            {isOpen && (
                <BodyPortal>
                    <div role="dialog" aria-modal="true" aria-label="AIRA Chat"
                        onClick={(e) => { if (e.target === e.currentTarget) closeChat(); }}
                        style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999999, padding: "5vh 5vw", boxSizing: "border-box", animation: isClosing ? "airaFadeOut 0.42s cubic-bezier(0.32,0.72,0,1) forwards" : "airaFadeIn 0.3s cubic-bezier(0.32,0.72,0,1)" }}>
                        <div className="aira-chat-panel"
                            style={{ position: "relative", width: "100%", height: "100%", maxWidth: "75vw", maxHeight: "75vh", background: "#fff", border: `4px solid ${GREEN}`, borderRadius: 18, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: `0 24px 80px rgba(3,11,59,0.35)`, animation: isClosing ? "airaPanelSlideOut 0.42s cubic-bezier(0.32,0.72,0,1) forwards" : "airaPanelSlide 0.42s cubic-bezier(0.32,0.72,0,1)" }}>

                            {showClearConfirm && <ClearConfirmDialog onConfirm={() => void executeClear()} onCancel={() => setShowClearConfirm(false)} />}

                            {/* Buttons top-right */}
                            <div style={{ position: "absolute", top: 10, right: 10, zIndex: 10, display: "flex", gap: 8 }}>
                                {messages.length > 0 && (
                                    <button onClick={requestClear} title="New session" aria-label="Clear chat"
                                        style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid #d1d5db", background: "#f9fafb", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 12, fontWeight: "bold" }}>⟲</button>
                                )}
                                <button onClick={closeChat} aria-label="Close"
                                    style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid #d1d5db", background: "#f9fafb", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                                    <X size={13} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Header */}
                            <div className="aira-chat-header" style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 52px 14px 20px", borderBottom: "1.5px solid #e5e7eb", background: "#fff", flexShrink: 0, flexWrap: "wrap" }}>
                                <div style={{ width: 38, height: 38, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Image src="/images/AIRA_MASCOT/AIRA_NEW_MASCOT_crop.png" alt="AIRA" width={38} height={38} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                </div>
                                <Image src="/aira-text.png" alt="AIRA" width={798} height={230} className="aira-header-logo" style={{ height: 22, width: "auto", objectFit: "contain", flexShrink: 0 }} />
                                <span style={{ display: "inline-block", width: 1.5, height: 24, background: "#d1d5db", borderRadius: 1, flexShrink: 0 }} className="hide-on-mobile" />
                                <span style={{ fontSize: 13, fontWeight: 500, color: "#6b7280", whiteSpace: "nowrap" }} className="hide-on-mobile">Your Agentic Assistant</span>
                            </div>

                            {/* Messages */}
                            <div className="aira-messages-container" aria-live="polite"
                                style={{ flex: "1 1 0", minHeight: 0, overflowY: "auto", padding: "24px 28px 16px", display: "flex", flexDirection: "column", gap: 16, background: "#fff", scrollbarWidth: "thin", scrollbarColor: "#d1d5db transparent" }}>

                                {messages.map((msg, i) => {
                                    // For bot messages, split out trailing "Related case study / Learn more"
                                    // style links so they render as clean cards instead of inline blue text.
                                    const { body, resources } = msg.isUser
                                        ? { body: msg.text, resources: [] as { label: string; url: string }[] }
                                        : extractResourceLinks(msg.text);

                                    return (
                                        <div key={i} className="aira-message"
                                            data-testid={msg.isUser ? "chat-message-user" : "chat-message-assistant"}
                                            style={{ display: "flex", alignItems: "flex-start", gap: 10, justifyContent: msg.isUser ? "flex-end" : "flex-start", animation: "airaMsgIn 0.22s ease" }}>
                                            {!msg.isUser && (
                                                <div className="aira-bot-avatar" style={{ width: 32, height: 32, flexShrink: 0, marginTop: 2, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <Image src="/images/AIRA_MASCOT/AIRA_NEW_MASCOT_crop.png" alt="AIRA" width={32} height={32} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                                </div>
                                            )}
                                            <div className="aira-message-content" style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: "88%", alignItems: msg.isUser ? "flex-end" : "flex-start" }}>
                                                <div style={{
                                                    padding: msg.isUser ? "10px 16px" : "16px 20px",
                                                    borderRadius: msg.isUser ? 20 : 16,
                                                    borderBottomRightRadius: msg.isUser ? 4 : 16,
                                                    borderBottomLeftRadius: msg.isUser ? 16 : 4,
                                                    fontSize: 14,
                                                    lineHeight: 1.65,
                                                    letterSpacing: "0.01em",
                                                    wordBreak: "normal",
                                                    overflowWrap: "break-word",
                                                    whiteSpace: "pre-wrap",
                                                    width: "fit-content",
                                                    maxWidth: "100%",
                                                    background: msg.isUser ? GREEN_LIGHT : "#ffffff",
                                                    color: msg.isUser ? DARK_TEXT : "#374151",
                                                    border: msg.isUser ? "1px solid #9ee8df" : "1px solid #f3f4f6",
                                                    fontWeight: msg.isUser ? 500 : 400,
                                                    boxShadow: msg.isUser ? "none" : "0 4px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"
                                                }}>
                                                    <MessageContent text={body} isUser={msg.isUser} />
                                                    {!msg.isUser && <ResourceLinks resources={resources} />}
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 3px" }}>
                                                    <span style={{ fontSize: 10, color: "#9ca3af" }}>{msg.timestamp}</span>
                                                    {!msg.isUser && (
                                                        <button type="button" onClick={() => readMessage(msg.text, i)}
                                                            aria-label={speakingMessageIndex === i ? "Stop reading" : "Read aloud"}
                                                            style={{ width: 22, height: 22, borderRadius: "50%", border: "1px solid #d1d5db", background: speakingMessageIndex === i ? GREEN_LIGHT : "#fff", color: speakingMessageIndex === i ? GREEN : "#6b7280", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                                                            {speakingMessageIndex === i ? <VolumeX size={12} /> : <Volume2 size={12} />}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Intent buttons */}
                                {onboardStep === "ask_intent" && !isLoading && (
                                    <IntentButtons onSelect={handleIntentSelect} />
                                )}

                                {/* Post-challenge action buttons */}
                                {showChallengeActions && onboardStep === "chat" && !isLoading && (
                                    <ChallengeActionButtons
                                        onSME={() => {
                                            setShowSMEForm(true);
                                            setOnboardStep("ask_sme_contact");
                                        }}
                                        onCall={() => { setShowChallengeActions(false); sendMessage("I'd like to schedule a consultation call"); }}
                                        onChangeIntent={() => {
                                            setMessages(prev => [...prev, userMsg("I want to discuss a different topic"),
                                                botMsg(`No problem, ${leadData.name}. What other area would you like to explore?`)]);
                                            setOnboardStep("ask_intent");
                                            setChatTurnCount(0);
                                        }}
                                    />
                                )}

                                {/* SME Contact Form */}
                                {showSMEForm && onboardStep === "ask_sme_contact" && !isLoading && (
                                    <SMEContactForm
                                        onSubmit={(name, email, org) => {
                                            const updatedLead: LeadData = { ...leadData, name, email, organisation: org };
                                            setLeadData(updatedLead);
                                            setLeadCaptured(true);
                                            setSmeConnected(true);
                                            setShowSMEForm(false);
                                            // Fire lead + SME connect with full context
                                            fireLead(updatedLead);
                                            fireSMEConnect(updatedLead);
                                            setOnboardStep("chat");
                                            setShowChallengeActions(true);
                                            setMessages(prev => [...prev,
                                                botMsg(`Thank you, ${name} 🙏\n\nI've notified our consulting team. A specialist will review your requirements and reach out to ${email} shortly.\n\nIn the meantime, feel free to keep exploring — I'm here to help.`)
                                            ]);
                                        }}
                                    />
                                )}

                                {/* Call booking form */}
                                {showCallForm && onboardStep === "ask_call_time" && !isLoading && (
                                    <CallBookingForm
                                        onSubmit={(name, email, org, date, time, tz) => {
                                            const formatted = `${date} at ${time} ${tz}`;
                                            const updatedLead: LeadData = { ...leadData, name, email, organisation: org };
                                            setLeadData(updatedLead);
                                            setLeadCaptured(true);
                                            setShowCallForm(false);
                                            fireBookCall(updatedLead, formatted);
                                            setOnboardStep("chat");
                                            setShowChallengeActions(true);
                                            setMessages(prev => [...prev,
                                                botMsg(`Thank you, ${name} 🙏\n\nI've recorded your preferred meeting time:\n📅 ${date}\n🕒 ${time} ${tz}\n\nOur team will review your request and reach out to ${email} to confirm the call.\n\nIs there anything else I can help with?`)
                                            ]);
                                        }}
                                    />
                                )}

                                {/* Typing indicator */}
                                {isLoading && (
                                    <div data-testid="chat-typing-indicator" style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                        <div style={{ width: 32, height: 32, flexShrink: 0, marginTop: 2, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Image src="/images/AIRA_MASCOT/AIRA_NEW_MASCOT_crop.png" alt="AIRA" width={32} height={32} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "13px 18px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, borderBottomLeftRadius: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                                            {[0, 0.2, 0.4].map((d, idx) => (
                                                <span key={idx} style={{ width: 7, height: 7, borderRadius: "50%", background: GREEN, display: "inline-block", animation: `airaTyping 1.4s ease-in-out ${d}s infinite` }} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Ongoing action buttons */}
                                {onboardStep === "chat" && !showChallengeActions && !isLoading && messages.length > 0 && leadCaptured && chatTurnCount >= 1 && (
                                    <ActionButtons
                                        onSME={() => sendMessage("I'd like to connect with an SME")}
                                        onBook={() => sendMessage("I'd like to book a call")}
                                        onChangeIntent={() => {
                                            setMessages(prev => [...prev, userMsg("I want to discuss a different topic"),
                                                botMsg(`No problem, ${leadData.name}. What other area would you like to explore?`)]);
                                            setOnboardStep("ask_intent");
                                            setChatTurnCount(0);
                                        }}
                                        smeConnected={smeConnected}
                                    />
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input bar */}
                            <div style={{ margin: "0 16px 16px", flexShrink: 0 }}>
                                <div className="aira-input-bar" style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: inputDisabled ? "#f9fafb" : "#fff", border: `1.5px solid ${isListening ? GREEN : "rgba(0,201,177,0.4)"}`, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", opacity: inputDisabled ? 0.7 : 1 }}>
                                    <Search size={15} style={{ color: "#9ca3af", flexShrink: 0 }} />
                                    <input ref={chatInputRef} type="text" value={inputValue} disabled={inputDisabled}
                                        onChange={e => { setInputValue(e.target.value); setSpeechError(""); }}
                                        onKeyDown={handleKey}
                                        placeholder={inputPlaceholder}
                                        aria-label="Ask AIRA"
                                        style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontSize: 14, color: DARK_TEXT, caretColor: GREEN, cursor: inputDisabled ? "not-allowed" : "text" }} />
                                    {onboardStep === "chat" && (
                                        <button type="button" onClick={toggleVoiceInput} disabled={!isSpeechSupported || isLoading}
                                            aria-label={isListening ? "Stop voice input" : "Start voice input"} title={voiceInputTitle}
                                            style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", border: `1px solid ${isListening ? GREEN : "#d1d5db"}`, background: isListening ? GREEN_LIGHT : "#fff", color: isListening ? GREEN : "#6b7280", cursor: isSpeechSupported && !isLoading ? "pointer" : "not-allowed", opacity: isSpeechSupported && !isLoading ? 1 : 0.55, transition: "background 0.2s" }}>
                                            {isListening ? <MicOff size={14} /> : <Mic size={14} />}
                                        </button>
                                    )}
                                    <button type="button" onClick={() => sendMessage(inputValue)}
                                        disabled={!inputValue.trim() || isLoading || inputDisabled} aria-label="Send"
                                        style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", border: "none", background: inputValue.trim() && !isLoading && !inputDisabled ? GREEN : "#e5e7eb", color: inputValue.trim() && !isLoading && !inputDisabled ? "#fff" : "#9ca3af", cursor: inputValue.trim() && !isLoading && !inputDisabled ? "pointer" : "not-allowed", transition: "background 0.2s" }}>
                                        <Send size={14} style={{ transform: "rotate(45deg)" }} />
                                    </button>
                                </div>
                                {speechError && <p role="status" style={{ margin: "6px 4px 0", color: "#dc2626", fontSize: 11, lineHeight: 1.4 }}>{speechError}</p>}
                            </div>
                        </div>
                    </div>
                </BodyPortal>
            )}

            <style>{`
                @keyframes airaFadeIn  { from { opacity:0; } to { opacity:1; } }
                @keyframes airaFadeOut { from { opacity:1; } to { opacity:0; } }
                @keyframes airaPanelSlide    { from { opacity:0; transform:translateY(40px) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }
                @keyframes airaPanelSlideOut { from { opacity:1; transform:translateY(0) scale(1); } to { opacity:0; transform:translateY(40px) scale(0.96); } }
                @keyframes airaMsgIn   { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
                @keyframes airaTyping  { 0%,60%,100% { transform:translateY(0); opacity:0.35; } 30% { transform:translateY(-8px); opacity:1; } }
                @keyframes airaGlowPulse { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
                .aira-mascot-grip { filter:drop-shadow(0 2px 4px rgba(0,0,0,0.1)); transition:filter 0.3s ease; }
                .aira-widget-container:hover .aira-mascot-grip { filter:drop-shadow(0 0 18px rgba(0,163,255,0.7)) drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
                .aira-mascot-container { will-change:transform,opacity; }
                @media (max-width:768px) {
                    .hide-on-mobile { display:none !important; }
                    .aira-mascot-expanded { width:85px !important; height:85px !important; bottom:27px !important; }
                    .aira-mascot-minimized { width:0 !important; height:0 !important; bottom:-10px !important; }
                    .aira-button-expanded { height:32px !important; padding-left:16px !important; padding-right:16px !important; }
                    .aira-button-minimized { height:32px !important; min-width:42px !important; padding-left:11px !important; padding-right:11px !important; border-radius:21px 0 0 21px !important; }
                    .aira-widget-container { bottom:1.5rem !important; }
                    .aira-chat-panel { max-width:95vw !important; max-height:90vh !important; border-width:2px !important; border-radius:12px !important; }
                    .aira-chat-header { padding:10px 40px 10px 12px !important; }
                    .aira-header-logo { height:16px !important; }
                    .aira-messages-container { padding:16px 12px 12px !important; gap:12px !important; }
                    .aira-message { gap:6px !important; }
                    .aira-bot-avatar { width:24px !important; height:24px !important; }
                    .aira-message-content { max-width:85% !important; }
                    .aira-message-content > div { font-size:13px !important; padding:8px 12px !important; }
                    .aira-input-bar { padding:9px 10px !important; }
                }
            `}</style>
        </>
    );
}