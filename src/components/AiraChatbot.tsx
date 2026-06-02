"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Send, X, Search } from "lucide-react";
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

const HYNIVA_ONLY_MESSAGE =
  "I can't help with that. I can help only with information related to Hyniva.";

// ─── URL Detection & Link Rendering ───────────────────────────────────────────
function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

interface TextNode {
  type: "text" | "url";
  content: string;
}

function parseMessageForUrls(text: string): TextNode[] {
  // Only match proper http/https URLs — no internal route pattern
  const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]()'"]*/g;
  const parts: TextNode[] = [];
  let lastIndex = 0;

  const matches = Array.from(text.matchAll(urlRegex));

  matches.forEach((match) => {
    // Add text before URL
    if (match.index! > lastIndex) {
      parts.push({
        type: "text",
        content: text.substring(lastIndex, match.index),
      });
    }

    const urlContent = match[0];

    // Only add as a URL node if it's a valid URL
    if (isValidUrl(urlContent)) {
      parts.push({
        type: "url",
        content: urlContent,
      });
    } else {
      parts.push({
        type: "text",
        content: urlContent,
      });
    }

    lastIndex = match.index! + match[0].length;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      content: text.substring(lastIndex),
    });
  }

  return parts.length > 0 ? parts : [{ type: "text", content: text }];
}

// ─── Message content renderer ─────────────────────────────────────────────────
function MessageContent({ text, isUser }: { text: string; isUser: boolean }) {
  const nodes = parseMessageForUrls(text);

  return (
    <>
      {nodes.map((node, index) => {
        if (node.type === "url") {
          return (
            <a
              key={index}
              href={node.content}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#0066cc",
                textDecoration: "underline",
                cursor: "pointer",
                wordBreak: "break-all",
              }}
            >
              {node.content}
            </a>
          );
        }

        return <span key={index}>{node.content}</span>;
      })}
    </>
  );
}

// ─── Fallback responses ───────────────────────────────────────────────────────
function generateFallbackResponse(message: string): string {
  const msg = message.toLowerCase();
  if (["hi", "hello", "hey"].includes(msg) || msg.startsWith("hi ")) {
    return "Hi! I'm AIRA — Hyniva's AI assistant. I can help you learn about our products, services, industries we serve, or connect you with our team. What would you like to know?";
  }
  return "";
}

// ─── Portal wrapper ───────────────────────────────────────────────────────────
function BodyPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

// ─── Main component ───────────────────────────────────────────────────────────
export function AiraChatbot({
  scrolled = false,
  fullWidth = false,
  mobile = false,
}: {
  scrolled?: boolean;
  fullWidth?: boolean;
  mobile?: boolean;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const isSendingRef = useRef(false);

  // Load messages from localStorage on component mount
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem("aira_chat_messages");
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
    setIsMounted(true);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (isMounted && messages.length > 0) {
      try {
        localStorage.setItem("aira_chat_messages", JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save chat history:", error);
      }
    }
  }, [messages, isMounted]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) setTimeout(() => chatInputRef.current?.focus(), 150);
  }, [isOpen]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeChat = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 420); // matches close animation duration
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading || isSendingRef.current) return;
      isSendingRef.current = true;
      const ts = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prev) => [
        ...prev,
        { text: text.trim(), isUser: true, timestamp: ts },
      ]);
      setInputValue("");
      setIsLoading(true);

      let reply = "";
      let routeToNavigate: string | null = null;

      // Only use fallback for greetings, otherwise call API
      if (
        ["hi", "hello", "hey"].includes(text.toLowerCase()) ||
        text.toLowerCase().startsWith("hi ")
      ) {
        reply = generateFallbackResponse(text);
      } else {
        try {
          const apiUrl =
            process.env.NEXT_PUBLIC_CHATBOT_API_URL || "/api/chatbot";
          const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text }),
          });

          if (!res.ok) {
            if (res.status === 403) {
              reply = HYNIVA_ONLY_MESSAGE;
            } else {
              throw new Error("API error");
            }
          }

          if (!reply) {
            const data: ApiResponse = await res.json();

            reply = normalizeProductLinksInText(
              data.message || JSON.stringify(data)
            );

            if (data.route) {
              routeToNavigate = normalizeProductRoute(data.route);
            } else if (data.target_route) {
              routeToNavigate = normalizeProductRoute(data.target_route);
            }

            if (data.status) reply += `\nStatus: ${data.status}`;
          }
        } catch (err) {
          reply = "Sorry, I couldn't reach the server.";
        }
      }

      const rts = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prev) => [
        ...prev,
        { text: reply, isUser: false, timestamp: rts },
      ]);

      // Navigate to route if provided
      if (routeToNavigate) {
        setTimeout(() => {
          router.push(routeToNavigate!);
          closeChat();
        }, 500);
      }

      setIsLoading(false);
      isSendingRef.current = false;
    },
    [isLoading, router, closeChat]
  );

  const handleChatKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  // Hyniva brand colours
  const GREEN = "#00c9b1";
  const GREEN_LIGHT = "#e6faf8";
  const DARK_TEXT = "#1e293b";

  // Pill sizing - matching Contact Us button exactly
  const pillHeight = mobile ? 34 : scrolled ? 32 : 36;
  const pillPaddingLeft = mobile ? 14 : scrolled ? 16 : 18;
  const pillPaddingRight = mobile ? 50 : scrolled ? 56 : 64;
  const fontSize = mobile ? 11 : scrolled ? 11 : 12;

  return (
    <>
      {/* ── ASK AIRA PILL BUTTON ──────────────────────────────────────────── */}
      <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
        {/* Mascot positioned ABOVE the pill, holding it from top */}
        <div
          style={{
            position: "relative",
            width: mobile ? 140 : scrolled ? 160 : 180,
            height: mobile ? 140 : scrolled ? 160 : 180,
            marginBottom: mobile ? -50 : scrolled ? -60 : -70,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 2,
          }}
          aria-label="AIRA mascot"
        >
          <Image
            src="/images/AIRA_MASCOT/NEW_HEAD_AND_HAND.png"
            alt="AIRA"
            width={180}
            height={180}
            priority
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "contain",
              objectPosition: "bottom center",
              filter: "drop-shadow(0 8px 20px rgba(37,99,235,0.6))"
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Ask AIRA"
          className="font-bold"
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: mobile ? 12 : scrolled ? 14 : 16,
            background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
            border: "2px solid rgba(59,130,246,0.6)",
            borderRadius: 9999,
            height: mobile ? 52 : scrolled ? 56 : 60,
            paddingLeft: mobile ? 24 : scrolled ? 28 : 32,
            paddingRight: mobile ? 24 : scrolled ? 28 : 32,
            minWidth: mobile ? 200 : scrolled ? 220 : 240,
            cursor: "pointer",
            flexShrink: 0,
            boxShadow: "0 0 30px rgba(37,99,235,0.5), 0 8px 20px rgba(37,99,235,0.4), inset 0 2px 0 rgba(255,255,255,0.2)",
            transition: "all 0.3s ease",
            overflow: "visible",
            fontSize: mobile ? 18 : scrolled ? 20 : 22,
            color: "white",
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)";
            btn.style.boxShadow = "0 0 40px rgba(37,99,235,0.7), 0 10px 24px rgba(37,99,235,0.5), inset 0 2px 0 rgba(255,255,255,0.3)";
            btn.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)";
            btn.style.boxShadow = "0 0 30px rgba(37,99,235,0.5), 0 8px 20px rgba(37,99,235,0.4), inset 0 2px 0 rgba(255,255,255,0.2)";
            btn.style.transform = "translateY(0)";
          }}
        >
          {/* Chat icon (three dots in speech bubble) */}
          <svg
            width={mobile ? 28 : scrolled ? 30 : 32}
            height={mobile ? 28 : scrolled ? 30 : 32}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 2px 6px rgba(255,255,255,0.6))",
              flexShrink: 0,
            }}
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="9" cy="10" r="1" fill="currentColor" />
            <circle cx="12" cy="10" r="1" fill="currentColor" />
            <circle cx="15" cy="10" r="1" fill="currentColor" />
          </svg>

          {/* Text "Ask AIRA" */}
          <span style={{ 
            fontWeight: 700,
            letterSpacing: "0.03em",
            filter: "drop-shadow(0 2px 6px rgba(255,255,255,0.6))",
            whiteSpace: "nowrap",
          }}>
            Ask AIRA
          </span>

          {/* Arrow icon */}
          <svg
            width={mobile ? 24 : scrolled ? 26 : 28}
            height={mobile ? 24 : scrolled ? 26 : 28}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 2px 6px rgba(255,255,255,0.6))",
              flexShrink: 0,
            }}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* ── CHAT PANEL via Portal ─────────────────────────────────────────── */}
      {isOpen && (
        <BodyPortal>
          {/* Backdrop */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="AIRA Chat"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeChat();
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999999,
              padding: "5vh 5vw",
              boxSizing: "border-box",
              animation: isClosing ? "airaFadeOut 0.42s cubic-bezier(0.32,0.72,0,1) forwards" : "airaFadeIn 0.3s cubic-bezier(0.32,0.72,0,1)",
            }}
          >
            {/* Panel */}
            <div
              style={{
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
                animation: isClosing
                  ? "airaPanelSlideOut 0.42s cubic-bezier(0.32,0.72,0,1) forwards"
                  : "airaPanelSlide 0.42s cubic-bezier(0.32,0.72,0,1)",
              }}
            >
              {/* ── Close & Clear buttons ── */}
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 10,
                  display: "flex",
                  gap: 8,
                }}
              >
                {messages.length > 0 && (
                  <button
                    onClick={() => {
                      setMessages([]);
                      try {
                        localStorage.removeItem("aira_chat_messages");
                      } catch (error) {
                        console.error("Failed to clear chat history:", error);
                      }
                    }}
                    title="Start new session"
                    aria-label="Clear chat"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      border: "1px solid #d1d5db",
                      background: "#f9fafb",
                      color: "#6b7280",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "background 0.2s, color 0.2s",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    ⟲
                  </button>
                )}

                <button
                  onClick={() => closeChat()}
                  aria-label="Close"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "1px solid #d1d5db",
                    background: "#f9fafb",
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  <X size={13} strokeWidth={2.5} />
                </button>
              </div>

              {/* ── Header ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 52px 14px 20px",
                  borderBottom: "1.5px solid #e5e7eb",
                  background: "#ffffff",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    flexShrink: 0,
                    border: "1.5px solid #e5e7eb",
                    overflow: "hidden",
                    backgroundColor: "#0d1b3e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label="AIRA"
                >
                  <Image
                    src="/images/AIRA_MASCOT/NEW_HEAD_AND_HAND.png"
                    alt="AIRA"
                    width={38}
                    height={38}
                    style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center center" }}
                  />
                </div>
                <Image
                  src="/aira-text.png"
                  alt="AIRA"
                  width={798}
                  height={230}
                  style={{
                    height: 22,
                    width: "auto",
                    objectFit: "contain",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    display: "inline-block",
                    width: 1.5,
                    height: 24,
                    background: "#d1d5db",
                    borderRadius: 1,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#6b7280",
                    whiteSpace: "nowrap",
                  }}
                >
                  Your Agentic Assistant
                </span>
              </div>

              {/* ── Messages area ── */}
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                      textAlign: "center",
                      padding: "32px 20px",
                      gap: 16,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: DARK_TEXT,
                        margin: 0,
                      }}
                    >
                      Hi, I&apos;m AIRA
                    </p>
                    <p
                      style={{
                        fontSize: 15,
                        color: "#6b7280",
                        maxWidth: 460,
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      Ask me anything about Hyniva&apos;s products, services or
                      how we can help your business.
                    </p>
                    {/* Quick-prompt chips */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 10,
                        justifyContent: "center",
                        marginTop: 8,
                      }}
                    >
                      {[
                        "Tell me about AIRA",
                        "What services do you offer?",
                        "How can I contact Hyniva?",
                        "What industries do you serve?",
                      ].map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          style={{
                            background: "#f0faf4",
                            border: `1px solid ${GREEN}`,
                            borderRadius: 20,
                            padding: "8px 16px",
                            fontSize: 13,
                            color: GREEN,
                            cursor: "pointer",
                            fontWeight: 500,
                            transition: "background 0.2s",
                          }}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message bubbles */}
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      justifyContent: msg.isUser ? "flex-end" : "flex-start",
                      animation: "airaMsgIn 0.22s ease",
                    }}
                  >
                    {/* Bot avatar */}
                    {!msg.isUser && (
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          flexShrink: 0,
                          marginTop: 2,
                          border: "1.5px solid #e5e7eb",
                          overflow: "hidden",
                          backgroundColor: "#0d1b3e",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        aria-label="AIRA"
                      >
                        <Image
                          src="/images/AIRA_MASCOT/NEW_HEAD_AND_HAND.png"
                          alt="AIRA"
                          width={32}
                          height={32}
                          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center center" }}
                        />
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        maxWidth: msg.isUser ? "40%" : "75%",
                        alignItems: msg.isUser ? "flex-end" : "flex-start",
                      }}
                    >
                      {/* Bubble */}
                      <div
                        style={{
                          padding: msg.isUser ? "8px 14px" : "12px 16px",
                          borderRadius: msg.isUser ? 20 : 12,
                          borderBottomRightRadius: msg.isUser ? 4 : 12,
                          borderBottomLeftRadius: msg.isUser ? 12 : 4,
                          fontSize: 14,
                          lineHeight: 1.6,
                          wordBreak: "break-word",
                          whiteSpace: "pre-line",
                          background: msg.isUser ? GREEN_LIGHT : "#ffffff",
                          color: DARK_TEXT,
                          border: msg.isUser
                            ? `1px solid #9ee8df`
                            : "1px solid #e5e7eb",
                          fontWeight: msg.isUser ? 500 : 400,
                          boxShadow: msg.isUser
                            ? "none"
                            : "0 1px 3px rgba(0,0,0,0.06)",
                        }}
                      >
                        <MessageContent text={msg.text} isUser={msg.isUser} />
                      </div>
                      {/* Timestamp */}
                      <span
                        style={{
                          fontSize: 10,
                          color: "#9ca3af",
                          padding: "0 3px",
                        }}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Typing dots */}
                {isLoading && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        flexShrink: 0,
                        marginTop: 2,
                        border: "1.5px solid #e5e7eb",
                        overflow: "hidden",
                        backgroundColor: "#0d1b3e",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      aria-label="AIRA"
                    >
                      <Image
                        src="/images/AIRA_MASCOT/NEW_HEAD_AND_HAND.png"
                        alt="AIRA"
                        width={32}
                        height={32}
                        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center center" }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "13px 18px",
                        background: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: 12,
                        borderBottomLeftRadius: 4,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                      }}
                    >
                      {[0, 0.2, 0.4].map((d, i) => (
                        <span
                          key={i}
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: GREEN,
                            display: "inline-block",
                            animation: `airaTyping 1.4s ease-in-out ${d}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* ── Input bar ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  margin: "0 16px 16px",
                  padding: "11px 14px",
                  background: "#ffffff",
                  border: `1.5px solid rgba(0,201,177,0.4)`,
                  borderRadius: 12,
                  flexShrink: 0,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <Search
                  size={15}
                  style={{ color: "#9ca3af", flexShrink: 0 }}
                />
                <input
                  ref={chatInputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleChatKey}
                  placeholder="Ask for follow up"
                  aria-label="Ask AIRA"
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: 14,
                    color: DARK_TEXT,
                    caretColor: GREEN,
                  }}
                />
                <button
                  type="button"
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send"
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "none",
                    background:
                      inputValue.trim() && !isLoading ? GREEN : "#e5e7eb",
                    color:
                      inputValue.trim() && !isLoading ? "#ffffff" : "#9ca3af",
                    cursor:
                      inputValue.trim() && !isLoading
                        ? "pointer"
                        : "not-allowed",
                    transition: "background 0.2s",
                  }}
                >
                  <Send size={14} style={{ transform: "rotate(-45deg)" }} />
                </button>
              </div>
            </div>
            {/* /panel */}
          </div>
          {/* /backdrop */}
        </BodyPortal>
      )}

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes airaFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes airaFadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes airaPanelSlide {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes airaPanelSlideOut {
          from { opacity: 1; transform: translateY(0)    scale(1);    }
          to   { opacity: 0; transform: translateY(40px) scale(0.96); }
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
