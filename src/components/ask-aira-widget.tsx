"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
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

// ─── Brand colours ────────────────────────────────────────────────────────────
const GREEN = "#00c9b1";
const GREEN_LIGHT = "#e6faf8";
const DARK_TEXT = "#1e293b";

// ─── Main Widget ──────────────────────────────────────────────────────────────
export function AskAiraWidget() {
    const router = useRouter();

    // scroll / hover state for show/hide
    const [isMiddle, setIsMiddle] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // chat state
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatInputRef = useRef<HTMLInputElement>(null);
    const isSendingRef = useRef(false);
    const sessionIdRef = useRef("");

    // ── Intersection observer for hero / footer + scroll direction ──
    useEffect(() => {
        const heroEl = document.getElementById("hero-section");
        const footerEl = document.getElementById("site-footer");

        let heroVisible = true;
        let footerVisible = false;
        let hideTimer: ReturnType<typeof setTimeout> | null = null;

        const update = () => {
            const shouldBeMiddle = !heroVisible && !footerVisible;

            // Clear any existing timer
            if (hideTimer) { 
                clearTimeout(hideTimer); 
                hideTimer = null; 
            }

            if (!shouldBeMiddle) {
                // Hero or footer is visible - show chatbot immediately
                setIsMiddle(false);
            } else {
                // In middle section - hide chatbot with a small delay to avoid jumpiness
                hideTimer = setTimeout(() => {
                    setIsMiddle(true);
                    hideTimer = null;
                }, 150);
            }
        };

        const heroObs = new IntersectionObserver(([e]) => {
            heroVisible = e.isIntersecting;
            update();
        }, { threshold: 0.05 });

        const footerObs = new IntersectionObserver(([e]) => {
            footerVisible = e.isIntersecting;
            update();
        }, { threshold: 0.05 });

        if (heroEl) heroObs.observe(heroEl);
        if (footerEl) footerObs.observe(footerEl);

        return () => {
            heroObs.disconnect();
            footerObs.disconnect();
            if (hideTimer) clearTimeout(hideTimer);
        };
    }, []);

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

    const openChat = useCallback(() => {
        setIsOpen(true);
    }, []);

    const clearChat = useCallback(async () => {
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
    }, []);

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
                reply = data.message || JSON.stringify(data);
                if (data.route) routeToNavigate = data.route;
                else if (data.target_route) routeToNavigate = data.target_route;
                if (data.status) reply += `\nStatus: ${data.status}`;
            } catch {
                reply = "Sorry, I couldn't reach the server.";
            }
        }

        const rts = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setMessages(prev => [...prev, { text: reply, isUser: false, timestamp: rts }]);

        if (routeToNavigate) {
            setTimeout(() => navigateFromChat(routeToNavigate!), 500);
        }

        setIsLoading(false);
        isSendingRef.current = false;
    }, [isLoading]);

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue); }
    };

    const isMinimized = isMiddle && !isHovered;

    return (
        <>
            {/* ── Floating pill ── */}
            <div
                className="fixed bottom-8 right-0 z-[100] flex flex-col items-end aira-widget-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    initial={false}
                    animate={{
                        x: isMinimized ? "calc(100% - 80px)" : "-2rem",
                        opacity: 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 28,
                        mass: 1,
                    }}
                    className="relative flex flex-col items-center"
                >
                    {/* Mascot — sits above the button, hands overlap the button */}
                    <motion.img
                        src="/images/AIRA_MASCOT/NEW_HEAD_AND_HAND.png"
                        alt="AIRA Assistant"
                        className="aira-mascot"
                        initial={false}
                        animate={{ y: isMinimized ? 20 : 0, opacity: isMinimized ? 0 : 1, scale: isMinimized ? 0.92 : 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 28,
                            mass: 1,
                            delay: isMinimized ? 0 : 0.08,
                        }}
                        style={{
                            width: "clamp(100px, 160px, 160px)",
                            height: "clamp(100px, 160px, 160px)",
                            objectFit: "contain",
                            pointerEvents: "none",
                            marginBottom: "clamp(-20px, -28px, -28px)",
                            position: "relative",
                            zIndex: 2,
                            display: "block",
                        }}
                    />

                    {/* Button — sits behind the mascot hands */}
                    <button
                        onClick={openChat}
                        className="relative flex items-center justify-between gap-3 rounded-full font-bold text-white border-none cursor-pointer transition-all duration-300 group overflow-visible aira-button"
                        style={{
                            position: "relative",
                            zIndex: 1,
                            background: "linear-gradient(90deg, #00b3ff 0%, #0073ff 50%, #0044ff 100%)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
                            minWidth: isMinimized ? "60px" : "auto",
                            paddingLeft: isMinimized ? "10px" : "16px",
                            paddingRight: isMinimized ? "10px" : "16px",
                            height: "clamp(36px, 44px, 44px)",
                            fontSize: "clamp(10px, 14px, 14px)",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(0,163,255,0.6), 0 4px 16px rgba(0,123,255,0.4), inset 0 1px 0 rgba(255,255,255,0.3)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.3)";
                        }}
                    >
                        {/* Left side: Stars - visible when collapsed */}
                        <div 
                            className="flex items-center justify-start shrink-0"
                            style={{
                                width: isMinimized ? "40px" : "auto",
                                position: isMinimized ? "absolute" : "relative",
                                left: isMinimized ? "0px" : "auto",
                            }}
                        >
                            <svg 
                                width={isMinimized ? "24" : "18"} 
                                height={isMinimized ? "24" : "18"} 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                className="text-white shrink-0 aira-stars"
                                style={{
                                    filter: isMinimized ? "drop-shadow(0 0 8px rgba(255,255,255,0.9)) drop-shadow(0 0 12px rgba(0,163,255,0.8))" : "none",
                                    animation: isMinimized ? "starShine 2s ease-in-out infinite" : "none",
                                    transition: "all 0.3s ease",
                                    marginLeft: isMinimized ? "8px" : "0px",
                                }}
                            >
                                <path d="M10 2C10 2 10.5 8 16 8C10.5 8 10 14 10 14C10 14 9.5 8 4 8C9.5 8 10 2 10 2Z" fill="currentColor" />
                                <path d="M19 12C19 12 19.2 15 22 15C19.2 15 19 18 19 18C19 18 18.8 15 16 15C18.8 15 19 12 19 12Z" fill="currentColor" />
                                <path d="M17 3C17 3 17.15 5.25 19.25 5.25C17.15 5.25 17 7.5 17 7.5C17 7.5 16.85 5.25 14.75 5.25C16.85 5.25 17 3 17 3Z" fill="currentColor" />
                            </svg>
                        </div>
                        
                        {/* Center: Ask AIRA text */}
                        <div 
                            className="flex items-center gap-2"
                            style={{
                                opacity: isMinimized ? 0 : 1,
                                transition: "opacity 0.3s ease",
                                pointerEvents: isMinimized ? "none" : "auto",
                                visibility: isMinimized ? "hidden" : "visible",
                            }}
                        >
                            <span 
                                className="whitespace-nowrap font-medium" 
                                style={{ 
                                    fontSize: "clamp(9px, 11px, 11px)",
                                }}
                            >Ask</span>
                            <Image 
                                src="/aira-text.png" 
                                alt="AIRA" 
                                width={798} 
                                height={230} 
                                className="aira-text-image"
                                style={{ 
                                    height: "clamp(11px, 14px, 14px)", 
                                    width: "auto", 
                                    objectFit: "contain", 
                                    filter: "brightness(0) invert(1)",
                                }} 
                            />
                        </div>
                        
                        {/* Right side: Arrow */}
                        <ChevronRight 
                            className="text-white stroke-[3px] shrink-0 aira-arrow" 
                            size={16}
                            style={{
                                opacity: isMinimized ? 0 : 1,
                                transition: "opacity 0.3s ease",
                                visibility: isMinimized ? "hidden" : "visible",
                            }}
                        />
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
                            {/* Close & Clear */}
                            <div style={{ position: "absolute", top: 10, right: 10, zIndex: 10, display: "flex", gap: 8 }}>
                                {messages.length > 0 && (
                                    <button
                                        onClick={() => void clearChat()}
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
                            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 52px 14px 20px", borderBottom: "1.5px solid #e5e7eb", background: "#ffffff", flexShrink: 0, flexWrap: "wrap" }}>
                                <div style={{ width: 38, height: 38, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="AIRA">
                                    <Image src="/images/AIRA_MASCOT/AIRA_NEW_MASCOT_crop.png" alt="AIRA" width={38} height={38} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center center" }} />
                                </div>
                                <Image src="/aira-text.png" alt="AIRA" width={798} height={230} style={{ height: 22, width: "auto", objectFit: "contain", flexShrink: 0 }} />
                                <span style={{ display: "inline-block", width: 1.5, height: 24, background: "#d1d5db", borderRadius: 1, flexShrink: 0 }} className="hide-on-mobile" />
                                <span style={{ fontSize: 13, fontWeight: 500, color: "#6b7280", whiteSpace: "nowrap" }} className="hide-on-mobile">Your Agentic Assistant</span>
                            </div>

                            {/* Messages */}
                            <div aria-live="polite" style={{ flex: "1 1 0", minHeight: 0, overflowY: "auto", padding: "24px 28px 16px", display: "flex", flexDirection: "column", gap: 16, background: "#ffffff", scrollbarWidth: "thin", scrollbarColor: "#d1d5db transparent" }}>
                                {messages.length === 0 && !isLoading && (
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center", padding: "32px 20px", gap: 16 }}>
                                        <p style={{ fontSize: 24, fontWeight: 700, color: DARK_TEXT, margin: 0 }}>Hi, I&apos;m AIRA</p>
                                        <p style={{ fontSize: 15, color: "#6b7280", maxWidth: 460, lineHeight: 1.65, margin: 0 }}>Ask me anything about Hyniva&apos;s products, services or how we can help your business.</p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 8 }}>
                                            {["Tell me about AIRA", "What services do you offer?", "How can I contact Hyniva?", "What industries do you serve?"].map(q => (
                                                <button key={q} onClick={() => sendMessage(q)} style={{ background: "#f0faf4", border: `1px solid ${GREEN}`, borderRadius: 20, padding: "8px 16px", fontSize: 13, color: GREEN, cursor: "pointer", fontWeight: 500 }}>{q}</button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {messages.map((msg, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, justifyContent: msg.isUser ? "flex-end" : "flex-start", animation: "airaMsgIn 0.22s ease" }}>
                                        {!msg.isUser && (
                                            <div style={{ width: 32, height: 32, flexShrink: 0, marginTop: 2, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="AIRA">
                                                <Image src="/images/AIRA_MASCOT/AIRA_NEW_MASCOT_crop.png" alt="AIRA" width={32} height={32} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center center" }} />
                                            </div>
                                        )}
                                        <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: msg.isUser ? "40%" : "75%", alignItems: msg.isUser ? "flex-end" : "flex-start" }}>
                                            <div style={{ padding: msg.isUser ? "8px 14px" : "12px 16px", borderRadius: msg.isUser ? 20 : 12, borderBottomRightRadius: msg.isUser ? 4 : 12, borderBottomLeftRadius: msg.isUser ? 12 : 4, fontSize: 14, lineHeight: 1.6, wordBreak: "break-word", whiteSpace: "pre-line", background: msg.isUser ? GREEN_LIGHT : "#ffffff", color: DARK_TEXT, border: msg.isUser ? "1px solid #9ee8df" : "1px solid #e5e7eb", fontWeight: msg.isUser ? 500 : 400, boxShadow: msg.isUser ? "none" : "0 1px 3px rgba(0,0,0,0.06)" }}>
                                                <MessageContent text={msg.text} isUser={msg.isUser} />
                                            </div>
                                            <span style={{ fontSize: 10, color: "#9ca3af", padding: "0 3px" }}>{msg.timestamp}</span>
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
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
                .aira-mascot {
                    filter: none;
                    transition: filter 0.3s ease;
                }
                .aira-widget-container:hover .aira-mascot {
                    filter: drop-shadow(0 0 18px rgba(0,163,255,0.7));
                }
                
                /* Mobile responsive styles */
                @media (max-width: 768px) {
                    .hide-on-mobile {
                        display: none !important;
                    }
                    
                    .aira-mascot {
                        width: 100px !important;
                        height: 100px !important;
                        margin-bottom: -20px !important;
                    }
                    
                    .aira-button {
                        height: 36px !important;
                        font-size: 10px !important;
                        padding-left: 12px !important;
                        padding-right: 12px !important;
                        min-width: 50px !important;
                        gap: 6px !important;
                    }
                    
                    .aira-stars {
                        width: 20px !important;
                        height: 20px !important;
                        margin-left: 6px !important;
                    }
                    
                    .aira-text-image {
                        height: 11px !important;
                    }
                    
                    .aira-arrow {
                        width: 14px !important;
                        height: 14px !important;
                    }
                    
                    .aira-widget-container {
                        bottom: 1rem !important;
                    }
                }
            `}</style>
        </>
    );
}
