"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Send, X, Search } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

// ─── Fallback responses ───────────────────────────────────────────────────────
function generateFallbackResponse(message: string): string {
  const msg = message.toLowerCase();
  if (["hi", "hello", "hey"].includes(msg) || msg.startsWith("hi ")) {
    return "Hi! I'm AIRA — Hyniva's AI assistant. I can help you learn about our products, services, industries we serve, or connect you with our team. What would you like to know?";
  }
  if (msg.includes("aira")) {
    return "AIRA is Hyniva's enterprise-ready AI platform. It combines autonomous reasoning, compliance-first design and OneAPI integration into one scalable platform that financial institutions can trust for mission-critical decisions.";
  }
  if (msg.includes("finxserve")) {
    return "FinXServe is our Salesforce-native omnichannel experience orchestration layer. It sits above your existing core banking system to unify and streamline consumer acquisition for loans, cards and deposits.";
  }
  if (msg.includes("claim pioneer") || msg.includes("claim")) {
    return "Claim Pioneer is our end-to-end claims automation platform — from intake to closure. It features AI-driven assignment, mobile-first field execution and real-time visibility into every step of the claim lifecycle.";
  }
  if (msg.includes("hyper")) {
    return "Hyper is our digital investment journey platform. It takes investors from goal discovery to personalized portfolio recommendations, helping advisors scale AUM and reduce acquisition costs.";
  }
  if (msg.includes("service") || msg.includes("what do you do")) {
    return "Hyniva offers: Digital Transformation, Enterprise Platforms (Salesforce, Microsoft, AWS), Product Engineering, and Strategy Consulting. We're an end-to-end technology partner with 15+ years in regulated industries.";
  }
  if (msg.includes("contact") || msg.includes("talk") || msg.includes("reach")) {
    return "You can reach our team at hyniva.com/contact or schedule a free 30-minute discovery call. No commitment, no sales pitch — just a real conversation about your challenges.";
  }
  if (msg.includes("industry") || msg.includes("banking") || msg.includes("insurance") || msg.includes("finance")) {
    return "We serve Banking & Credit Unions, Wealth & Asset Management, Insurance, Transportation & Logistics, and Education. Our teams have deep domain expertise built over 15+ years inside these industries.";
  }
  if (msg.includes("price") || msg.includes("cost") || msg.includes("pricing")) {
    return "Pricing depends on your specific needs and scope. We'd love to have a discovery call to understand your requirements and provide a transparent estimate. Visit hyniva.com/contact to get started.";
  }
  return "I'm AIRA, Hyniva's AI assistant. I can help with information about our products (FinXServe, AIRA, Claim Pioneer, Hyper), services, industries we serve, or how to get in touch with our team. What would you like to know?";
}

// ─── Portal wrapper ───────────────────────────────────────────────────────────
function BodyPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

// ─── Main component ───────────────────────────────────────────────────────────
export function AiraChatbot({ scrolled = false }: { scrolled?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typedPlaceholder, setTypedPlaceholder] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const isSendingRef = useRef(false);

  const placeholderText = "What are you looking for?";

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Typing animation for pill placeholder
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let idx = 0;
    let mounted = true;
    const tick = () => {
      if (!mounted) return;
      if (idx <= placeholderText.length) {
        setTypedPlaceholder(placeholderText.slice(0, idx++));
        timer = setTimeout(tick, 70);
      } else {
        timer = setTimeout(() => {
          if (!mounted) return;
          idx = 0;
          setTypedPlaceholder("");
          timer = setTimeout(tick, 300);
        }, 2000);
      }
    };
    tick();
    return () => { mounted = false; clearTimeout(timer); };
  }, [placeholderText]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) setTimeout(() => chatInputRef.current?.focus(), 150);
  }, [isOpen]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || isSendingRef.current) return;
    isSendingRef.current = true;
    const ts = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { text: text.trim(), isUser: true, timestamp: ts }]);
    setInputValue("");
    setIsLoading(true);
    setIsOpen(true);
    await new Promise(r => setTimeout(r, 700));
    const reply = generateFallbackResponse(text);
    const rts = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { text: reply, isUser: false, timestamp: rts }]);
    setIsLoading(false);
    isSendingRef.current = false;
  }, [isLoading]);

  const handleBarSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(inputValue); };
  const handleChatKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue); }
  };

  // Hyniva brand colours
  const GREEN = "#00c9b1";        // thick border — Hyniva teal
  const GREEN_LIGHT = "#e6faf8";  // user bubble bg
  const TEAL = "#00c9b1";         // send button
  const NAVY = "#030b3b";         // send button text / panel bg
  const DARK_TEXT = "#1e293b";    // main text inside white panel

  return (
    <>
      {/* ── PILL BAR ─────────────────────────────────────────────────────── */}
      <form
        onSubmit={handleBarSubmit}
        autoComplete="off"
        aria-label="Ask AIRA"
        style={{
          display: "flex",
          alignItems: "center",
          background: "#ffffff",
          border: "1.5px solid #e2e8f0",
          borderRadius: 9999,
          height: scrolled ? 32 : 36,
          width: scrolled ? 220 : 280,
          overflow: "hidden",
          flexShrink: 0,
          cursor: "text",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          transition: "height 0.3s ease, width 0.3s ease",
        }}
      >
        {/* Brand */}
        <div style={{
          display: "flex", alignItems: "center", gap: 3,
          padding: scrolled ? "0 5px 0 8px" : "0 6px 0 10px", flexShrink: 0,
          borderRight: "1.5px solid #e2e8f0", height: "100%",
        }}>
          <Image src="/aira-logo.png" alt="AIRA" width={18} height={18}
            style={{ width: scrolled ? 14 : 16, height: scrolled ? 14 : 16, objectFit: "contain" }} />
          <span style={{ fontSize: 7, fontWeight: 800, letterSpacing: "1.5px",
            textTransform: "uppercase", color: "#64748b", lineHeight: 1 }}>
            ASK
          </span>
          <Image src="/AIRA.png" alt="AIRA" width={28} height={11}
            style={{ height: scrolled ? 9 : 11, width: "auto", objectFit: "contain" }} />
        </div>

        {/* Input */}
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder={typedPlaceholder || placeholderText}
          aria-label="Ask AIRA a question"
          style={{
            flex: 1, minWidth: 0, border: "none", outline: "none",
            background: "transparent",
            fontSize: scrolled ? 11 : 12,
            color: "#1e293b",
            padding: scrolled ? "0 10px" : "0 12px",
            height: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
      </form>

      {/* ── CHAT PANEL via Portal ─────────────────────────────────────────── */}
      {isOpen && (
        <BodyPortal>
          {/* Backdrop */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="AIRA Chat"
            onClick={e => { if (e.target === e.currentTarget) setIsOpen(false); }}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              width: "100vw", height: "100vh",
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999999,
              padding: "5vh 5vw",
              boxSizing: "border-box",
              animation: "airaFadeIn 0.2s ease",
            }}
          >
            {/* Panel — white interior, thick green border */}
            <div style={{
              position: "relative",
              width: "100%",
              height: "100%",
              maxWidth: "min(1100px, 90vw)",
              maxHeight: "min(800px, 80vh)",
              background: "#ffffff",
              border: `4px solid ${GREEN}`,
              borderRadius: 18,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: `0 24px 80px rgba(3,11,59,0.35), 0 0 0 1px rgba(0,201,177,0.2)`,
              animation: "airaPanelSlide 0.28s cubic-bezier(0.32,0.72,0,1)",
            }}>

              {/* ── Close button ── */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                style={{
                  position: "absolute", top: 10, right: 10, zIndex: 10,
                  width: 28, height: 28, borderRadius: "50%",
                  border: "1px solid #d1d5db",
                  background: "#f9fafb",
                  color: "#6b7280",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                <X size={13} strokeWidth={2.5} />
              </button>

              {/* ── Header — white with bottom divider ── */}
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "14px 52px 14px 20px",
                borderBottom: "1.5px solid #e5e7eb",
                background: "#ffffff",
                flexShrink: 0,
              }}>
                <Image src="/aira-logo.png" alt="AIRA" width={34} height={34}
                  style={{ width: 34, height: 34, objectFit: "contain", flexShrink: 0 }} />
                <Image src="/aira-text.png" alt="AIRA" width={64} height={17}
                  style={{ height: 17, width: "auto", objectFit: "contain", flexShrink: 0 }} />
                <span style={{
                  display: "inline-block", width: 1.5, height: 24,
                  background: "#d1d5db", borderRadius: 1, flexShrink: 0,
                }} />
                <span style={{
                  fontSize: 13, fontWeight: 500,
                  color: "#6b7280", whiteSpace: "nowrap",
                }}>
                  Your Agentic Assistant
                </span>
              </div>

              {/* ── Messages area — white bg ── */}
              <div
                aria-live="polite"
                style={{
                  flex: "1 1 0",
                  minHeight: 0,
                  overflowY: "auto",
                  padding: "24px 28px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  background: "#ffffff",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#d1d5db transparent",
                }}
              >
                {/* Welcome / empty state */}
                {messages.length === 0 && !isLoading && (
                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", flex: 1, textAlign: "center",
                    padding: "32px 20px", gap: 16,
                  }}>
                    <Image src="/aira-logo.png" alt="AIRA" width={72} height={72}
                      style={{ width: 72, height: 72, objectFit: "contain",
                        animation: "airaWelcomePulse 3s ease-in-out infinite" }} />
                    <p style={{ fontSize: 24, fontWeight: 700, color: DARK_TEXT, margin: 0 }}>
                      Hi, I&apos;m AIRA
                    </p>
                    <p style={{ fontSize: 15, color: "#6b7280",
                      maxWidth: 460, lineHeight: 1.65, margin: 0 }}>
                      Ask me anything about Hyniva&apos;s products, services or how we can help your business.
                    </p>
                    {/* Quick-prompt chips */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10,
                      justifyContent: "center", marginTop: 8 }}>
                      {[
                        "Tell me about AIRA",
                        "What services do you offer?",
                        "How can I contact Hyniva?",
                        "What industries do you serve?",
                      ].map(q => (
                        <button key={q} onClick={() => sendMessage(q)} style={{
                          background: "#f0faf4",
                          border: `1px solid ${GREEN}`,
                          borderRadius: 20, padding: "8px 16px",
                          fontSize: 13, color: GREEN, cursor: "pointer",
                          fontWeight: 500,
                          transition: "background 0.2s",
                        }}>
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message bubbles */}
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    justifyContent: msg.isUser ? "flex-end" : "flex-start",
                    animation: "airaMsgIn 0.22s ease",
                  }}>
                    {/* Bot avatar */}
                    {!msg.isUser && (
                      <Image src="/aira-logo.png" alt="AIRA" width={30} height={30}
                        style={{ width: 30, height: 30, borderRadius: "50%",
                          objectFit: "cover", flexShrink: 0, marginTop: 2,
                          border: "1.5px solid #e5e7eb" }} />
                    )}

                    <div style={{
                      display: "flex", flexDirection: "column", gap: 4,
                      maxWidth: msg.isUser ? "40%" : "75%",
                      alignItems: msg.isUser ? "flex-end" : "flex-start",
                    }}>
                      {/* Bubble */}
                      <div style={{
                        padding: msg.isUser ? "8px 14px" : "12px 16px",
                        borderRadius: msg.isUser ? 20 : 12,
                        borderBottomRightRadius: msg.isUser ? 4 : 12,
                        borderBottomLeftRadius: msg.isUser ? 12 : 4,
                        fontSize: 14, lineHeight: 1.6,
                        wordBreak: "break-word", whiteSpace: "pre-line",
                        // User: small grey pill (like reference)
                        // Bot: white card with border, full width feel
                        background: msg.isUser ? GREEN_LIGHT : "#ffffff",
                        color: DARK_TEXT,
                        border: msg.isUser
                          ? `1px solid #9ee8df`
                          : "1px solid #e5e7eb",
                        fontWeight: msg.isUser ? 500 : 400,
                        boxShadow: msg.isUser ? "none" : "0 1px 3px rgba(0,0,0,0.06)",
                      }}>
                        {msg.text}
                      </div>
                      {/* Timestamp */}
                      <span style={{ fontSize: 10, color: "#9ca3af", padding: "0 3px" }}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Typing dots */}
                {isLoading && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <Image src="/aira-logo.png" alt="AIRA" width={30} height={30}
                      style={{ width: 30, height: 30, borderRadius: "50%",
                        objectFit: "cover", flexShrink: 0, marginTop: 2,
                        border: "1.5px solid #e5e7eb" }} />
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "13px 18px",
                      background: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: 12, borderBottomLeftRadius: 4,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    }}>
                      {[0, 0.2, 0.4].map((d, i) => (
                        <span key={i} style={{
                          width: 7, height: 7, borderRadius: "50%",
                          background: GREEN, display: "inline-block",
                          animation: `airaTyping 1.4s ease-in-out ${d}s infinite`,
                        }} />
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* ── Input bar — white with green-tinted border ── */}
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                margin: "0 16px 16px",
                padding: "11px 14px",
                background: "#ffffff",
                border: `1.5px solid rgba(0,201,177,0.4)`,
                borderRadius: 12,
                flexShrink: 0,
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
                <Search size={15} style={{ color: "#9ca3af", flexShrink: 0 }} />
                <input
                  ref={chatInputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleChatKey}
                  placeholder="Ask for follow up"
                  aria-label="Ask AIRA"
                  style={{
                    flex: 1, border: "none", outline: "none",
                    background: "transparent", fontSize: 14,
                    color: DARK_TEXT, caretColor: GREEN,
                  }}
                />
                <button
                  type="button"
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send"
                  style={{
                    flexShrink: 0, display: "flex", alignItems: "center",
                    justifyContent: "center", width: 32, height: 32,
                    borderRadius: "50%", border: "none",
                    background: inputValue.trim() && !isLoading ? GREEN : "#e5e7eb",
                    color: inputValue.trim() && !isLoading ? "#ffffff" : "#9ca3af",
                    cursor: inputValue.trim() && !isLoading ? "pointer" : "not-allowed",
                    transition: "background 0.2s",
                  }}
                >
                  <Send size={14} style={{ transform: "rotate(-45deg)" }} />
                </button>
              </div>

            </div>{/* /panel */}
          </div>{/* /backdrop */}
        </BodyPortal>
      )}

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes airaFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes airaPanelSlide {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes airaWelcomePulse {
          0%,100% { transform: scale(1);    opacity: 0.85; }
          50%     { transform: scale(1.07); opacity: 1;    }
        }
        @keyframes airaMsgIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes airaTyping {
          0%,60%,100% { transform: translateY(0);    opacity: 0.35; }
          30%         { transform: translateY(-8px); opacity: 1;    }
        }
      `}</style>
    </>
  );
}
