'use client';
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  normalizeProductLinksInText,
  normalizeProductRoute,
} from "@/lib/product-route-normalizer";

/* ─────────────────────────────────────────────
   HYNIVA BRAND - LANDING PAGE COLORS
───────────────────────────────────────────── */
const COLORS = {
  // Navy from hero section
  navy:       "#0D1B2E",
  navyLight:  "#1A2E45",
  navyAlt:    "#111E35",
  
  // Cyan from "weeks" text
  cyan:       "#00E5FF",
  cyanDark:   "#00B8D4",
  cyanMuted:  "rgba(0,229,255,0.1)",
  
  // Blue from button
  blue:       "#4B7FED",
  blueDark:   "#3B6FDD",
  
  // Text
  white:      "#FFFFFF",
  gray:       "#E8EDF7",
  textMuted:  "#8A9BBE",
  
  // Functional
  success:    "#10B981",
  error:      "#EF4444",
};

type ChatRole = "user" | "bot";
interface ChatItem {
  id: string;
  role: ChatRole;
  text: string;
  ts: number;
}

const HYNIVA_ONLY_MESSAGE =
  "I can't help with that. I can help only with information related to Hyniva.";

/* ─────────────────────────────────────────────
   RESPONSIVE HOOK
───────────────────────────────────────────── */
function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "desktop">("desktop");
  useEffect(() => {
    const update = () => setBp(window.innerWidth < 640 ? "mobile" : "desktop");
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

/* ─────────────────────────────────────────────
   QUICK REPLIES
───────────────────────────────────────────── */
const QUICK_REPLIES = [
  "What services do you offer?",
  "Tell me about AI products",
  "How do I contact Hyniva?",
  "Show case studies",
];
 
/* ─────────────────────────────────────────────
   HANDLERS
───────────────────────────────────────────── */
function handleResponse(
  raw: string,
  add: (i: ChatItem) => void,
  router: ReturnType<typeof useRouter>
) {
  const makeItem = (text: string): ChatItem => ({
    id: Math.random().toString(36).slice(2),
    role: "bot",
    text,
    ts: Date.now(),
  });
  try {
    const p = JSON.parse(raw);
    if (p?.message && typeof p.message === "string") {
      add(makeItem(normalizeProductLinksInText(p.message)));
      if (p.target_route && p.target_route !== "null") {
        router.push(normalizeProductRoute(p.target_route));
      }
    } else {
      add(makeItem(raw));
    }
  } catch {
    add(makeItem(raw));
  }
}

/* ─────────────────────────────────────────────
   MESSAGE BUBBLE
───────────────────────────────────────────── */
function MessageBubble({ item, index }: { item: ChatItem; index: number }) {
  const isUser = item.role === "user";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "12px",
        animation: `fadeInUp 0.4s ease-out ${index * 0.08}s both`,
      }}
    >
      <div
        style={{
          maxWidth: "90vw",
          width: "fit-content",
          minWidth: "40px",
          padding: "11px 15px",
          borderRadius: isUser ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
          backgroundColor: isUser ? COLORS.cyan : COLORS.navyLight,
          color: isUser ? COLORS.navy : COLORS.white,
          fontSize: "14px",
          lineHeight: "1.5",
          fontWeight: isUser ? 600 : 400,
          boxShadow: `0 2px 8px ${isUser ? "rgba(0,229,255,0.15)" : "rgba(0,0,0,0.1)"}`,
          wordBreak: "break-word",
          overflowWrap: "anywhere",
        }}
      >
        {item.text}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TYPING INDICATOR
───────────────────────────────────────────── */
function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: "4px", padding: "12px 15px" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: COLORS.cyan,
            opacity: 0.6,
            animation: `typing 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function HynivaChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState<ChatItem[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showQuick, setShowQuick] = useState(true);

  const router = useRouter();
  const bp = useBreakpoint();
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isMobile = bp === "mobile";

  const addItem = useCallback((item: ChatItem) => {
    setChat((p) => [...p, item]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isSending]);

  // Welcome message
  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => inputRef.current?.focus(), 150);
    if (chat.length === 0) {
      addItem({
        id: "welcome",
        role: "bot",
        text: "Hi! 👋 I'm here to help. Ask me anything about Hyniva.",
        ts: Date.now(),
      });
      setShowQuick(true);
    }
  }, [isOpen]);

  async function handleSend(msg?: string) {
    const text = (msg ?? input).trim();
    if (!text) return;

    addItem({ id: Math.random().toString(36).slice(2), role: "user", text, ts: Date.now() });
    setInput("");
    setShowQuick(false);
    setIsSending(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL || "/api/chatbot";
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (res.status === 403) {
        addItem({
          id: Math.random().toString(36).slice(2),
          role: "bot",
          text: HYNIVA_ONLY_MESSAGE,
          ts: Date.now(),
        });
      } else {
        handleResponse(await res.text(), addItem, router);
      }
    } catch {
      addItem({
        id: Math.random().toString(36).slice(2),
        role: "bot",
        text: "Sorry, something went wrong. Please try again.",
        ts: Date.now(),
      });
    }
    setIsSending(false);
  }

  function handleClear() {
    setChat([
      {
        id: "cleared",
        role: "bot",
        text: "Chat cleared. How can I help?",
        ts: Date.now(),
      },
    ]);
    setShowQuick(true);
  }

  const fabSize = isMobile ? 56 : 60;

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fabPop {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes typing {
          0%, 60%, 100% {
            opacity: 0.5;
            transform: translateY(0);
          }
          30% {
            opacity: 1;
            transform: translateY(-8px);
          }
        }

        @keyframes subtle-pulse {
          0%, 100% {
            box-shadow: 0 4px 16px rgba(0, 229, 255, 0.25);
          }
          50% {
            box-shadow: 0 4px 20px rgba(0, 229, 255, 0.35);
          }
        }

        .fab-button {
          animation: fabPop 0.4s cubic-bezier(0.34, 0.69, 0.25, 1);
        }

        .fab-idle {
          animation: subtle-pulse 2.5s ease-in-out infinite;
        }

        .chat-window {
          animation: slideUp 0.4s cubic-bezier(0.34, 0.69, 0.25, 1);
        }

        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: ${COLORS.navyLight};
          border-radius: 2px;
        }

        input:focus {
          outline: none;
          border-color: ${COLORS.cyan};
          box-shadow: 0 0 0 2px rgba(0, 229, 255, 0.1);
        }

        button:hover:not(:disabled) {
          opacity: 0.9;
        }

        button:active:not(:disabled) {
          transform: scale(0.98);
        }
      `}</style>

      {/* Mobile backdrop */}
      {isOpen && isMobile && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9997,
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(2px)",
            animation: "fadeInUp 0.3s ease-out",
          }}
        />
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className={`fab-button ${!isOpen ? "fab-idle" : ""}`}
        style={{
          position: "fixed",
          bottom: isMobile ? 20 : 24,
          right: isMobile ? 20 : 24,
          zIndex: 9999,
          width: fabSize,
          height: fabSize,
          borderRadius: "50%",
          border: "none",
          backgroundColor: isOpen ? COLORS.navyAlt : COLORS.cyan,
          color: isOpen ? COLORS.cyan : COLORS.navy,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          transition: "all 0.3s ease",
          boxShadow: `0 4px 16px ${isOpen ? "rgba(0,0,0,0.3)" : "rgba(0,229,255,0.25)"}`,
        }}
        aria-label="Chat"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="chat-window"
          style={{
            position: "fixed",
            bottom: isMobile ? 0 : 32,
            right: isMobile ? 0 : 32,
            zIndex: 9998,
            width: isMobile ? "100vw" : "clamp(320px, 90vw, 400px)",
            height: isMobile ? "90vh" : "clamp(420px, 80vh, 600px)",
            borderRadius: isMobile ? "20px 20px 0 0" : "16px",
            backgroundColor: COLORS.navy,
            border: isMobile ? "none" : `1px solid ${COLORS.navyLight}`,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 12px 48px rgba(0, 0, 0, 0.4)",
            overflow: "hidden",
            maxWidth: "100vw",
            maxHeight: "100vh",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: isMobile ? "12px 8px 18px" : "12px 16px",
              borderTop: `1px solid ${COLORS.navyLight}`,
              display: "flex",
              gap: isMobile ? "6px" : "10px",
              alignItems: "center",
              flexShrink: 0,
              background: COLORS.navy,
            }}
          >
            <div>
              <div style={{ fontSize: "15px", fontWeight: 600, color: COLORS.white }}>
                Hyniva Assistant
              </div>
              <div style={{ fontSize: "12px", color: COLORS.textMuted, marginTop: "2px" }}>
                • Online
              </div>
            </div>
            <button
              onClick={handleClear}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                color: COLORS.cyan,
                padding: "4px 8px",
                transition: "all 0.2s",
              }}
              title="Clear chat"
            >
              🔄
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: isMobile ? "16px" : "14px 16px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: COLORS.navy,
            }}
          >
            {chat.map((msg, idx) => (
              <MessageBubble key={msg.id} item={msg} index={idx} />
            ))}
            {isSending && <TypingIndicator />}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Replies */}
          {showQuick && chat.length <= 1 && (
            <div style={{ padding: "0 16px 12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  style={{
                    background: "transparent",
                    border: `1px solid ${COLORS.navyLight}`,
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    color: COLORS.textMuted,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.cyan;
                    (e.currentTarget as HTMLButtonElement).style.color = COLORS.cyan;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.navyLight;
                    (e.currentTarget as HTMLButtonElement).style.color = COLORS.textMuted;
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            style={{
              padding: isMobile ? "12px 16px 20px" : "12px 16px",
              borderTop: `1px solid ${COLORS.navyLight}`,
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              style={{
                flex: 1,
                padding: isMobile ? "10px 10px" : "9px 12px",
                borderRadius: "8px",
                border: `1px solid ${COLORS.navyLight}`,
                backgroundColor: COLORS.navyLight,
                color: COLORS.white,
                fontSize: isMobile ? "15px" : "14px",
                transition: "all 0.2s",
                minWidth: 0,
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={isSending || !input.trim()}
              style={{
                background: COLORS.cyan,
                border: "none",
                borderRadius: "8px",
                width: isMobile ? "38px" : "40px",
                height: isMobile ? "38px" : "40px",
                cursor: isSending || !input.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: COLORS.navy,
                fontSize: isMobile ? "17px" : "18px",
                transition: "all 0.2s",
                opacity: isSending || !input.trim() ? 0.5 : 1,
                flexShrink: 0,
              }}
            >
              ↗
            </button>
          </div>

          {/* Footer */}
          <div
            style={{
              textAlign: "center",
              padding: "8px 16px",
              fontSize: "11px",
              color: COLORS.textMuted,
              borderTop: `1px solid ${COLORS.navyLight}`,
              flexShrink: 0,
            }}
          >
            Powered by <span style={{ color: COLORS.cyan, fontWeight: 600 }}>Hyniva</span>
          </div>
        </div>
      )}
    </>
  );
}