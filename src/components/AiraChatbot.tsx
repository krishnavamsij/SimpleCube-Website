"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import {
  Send,
  X,
  RotateCcw,
  MessageSquare,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// UUID Generator
// ─────────────────────────────────────────────────────────────
function generateSessionId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r =
        crypto.getRandomValues(new Uint8Array(1))[0] % 16;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
}

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface ApiResponse {
  message: string;
  route?: string;
  target_route?: string;
  detected_intent?: string;
  confidence?: number;
}

const STORAGE_KEYS = {
  SESSION_ID: "aira_chat_session_id",
  MESSAGES: "aira_chat_messages",
  IS_OPEN: "aira_chat_is_open",
} as const;

// ─────────────────────────────────────────────────────────────
// Custom navigation event — bridges portal → Router tree
// ─────────────────────────────────────────────────────────────
function emitNavigate(url: string) {
  window.dispatchEvent(
    new CustomEvent("aira:navigate", { detail: { url } })
  );
}

// ─────────────────────────────────────────────────────────────
// URL parsing & in-app navigation (preserves chat sessionStorage)
// ─────────────────────────────────────────────────────────────
interface TextNode {
  type: "text" | "url";
  content: string;
}

const HYNIVA_HOSTS = new Set(["hyniva.com", "www.hyniva.com"]);

/** Strip trailing sentence punctuation from a matched URL token. */
function splitUrlAndTrailingPunctuation(raw: string): {
  href: string;
  trailing: string;
} {
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

function parseMessageForUrls(text: string): TextNode[] {
  const urlRegex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;
  const parts: TextNode[] = [];
  let lastIndex = 0;
  const matches = Array.from(text.matchAll(urlRegex));

  matches.forEach((match) => {
    const raw = match[0];
    const start = match.index!;
    if (start > lastIndex) {
      parts.push({
        type: "text",
        content: text.substring(lastIndex, start),
      });
    }

    const { href, trailing } = splitUrlAndTrailingPunctuation(raw);
    let isValid = false;
    try {
      new URL(href);
      isValid = true;
    } catch {
      isValid = false;
    }

    if (isValid) {
      parts.push({ type: "url", content: href });
      if (trailing) {
        parts.push({ type: "text", content: trailing });
      }
    } else {
      parts.push({ type: "text", content: raw });
    }

    lastIndex = start + raw.length;
  });

  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      content: text.substring(lastIndex),
    });
  }

  return parts.length ? parts : [{ type: "text", content: text }];
}

/** Resolve a URL to an in-app path for client-side router.push. */
function toInAppPath(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed, window.location.origin);
    const path =
      parsed.pathname + parsed.search + parsed.hash;

    if (parsed.origin === window.location.origin) {
      return path || "/";
    }

    const host = parsed.hostname.replace(/^www\./, "");
    if (HYNIVA_HOSTS.has(parsed.hostname) || host === "hyniva.com") {
      return path || "/";
    }
  } catch {
    if (trimmed.startsWith("/")) return trimmed;
  }

  return null;
}

function navigateFromChat(url: string) {
  const inAppPath = toInAppPath(url);
  if (inAppPath) {
    emitNavigate(inAppPath);
    return;
  }
  window.location.assign(url);
}

function persistChatSnapshot(
  messages: Message[],
  isOpen: boolean,
  sessionId: string
) {
  try {
    sessionStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    sessionStorage.setItem(STORAGE_KEYS.IS_OPEN, isOpen ? "1" : "0");
    if (sessionId) {
      sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
    }
  } catch {
    // ignore
  }
}

// ─────────────────────────────────────────────────────────────
// MessageContent — only the URL substring is underlined/clickable
// ─────────────────────────────────────────────────────────────
function MessageContent({ text }: { text: string }) {
  const nodes = parseMessageForUrls(text);

  const handleUrlClick = (
    e: React.MouseEvent | React.KeyboardEvent,
    url: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigateFromChat(url);
  };

  return (
    <>
      {nodes.map((node, index) => {
        if (node.type === "url") {
          return (
            <span
              key={index}
              role="link"
              tabIndex={0}
              onClick={(e) => handleUrlClick(e, node.content)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleUrlClick(e, node.content);
                }
              }}
              title={node.content}
              style={{
                color: "#00c9b1",
                textDecoration: "underline",
                wordBreak: "break-word",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              {node.content}
            </span>
          );
        }
        return <span key={index}>{node.content}</span>;
      })}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// BodyPortal — renders children into document.body
// No internal mount state needed — parent isMounted guards this already
// ─────────────────────────────────────────────────────────────
function BodyPortal({ children }: { children: React.ReactNode }) {
  return createPortal(children, document.body);
}

// ─────────────────────────────────────────────────────────────
// ClearConfirmDialog
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// TypingIndicator
// ─────────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 16,
          padding: "10px 16px",
        }}
      >
        <span style={{ fontSize: 12, color: "#64748b", marginRight: 6 }}>
          AIRA is typing
        </span>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00c9b1",
              display: "inline-block",
              animation: `aira-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes aira-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// EmptyState
// ─────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div
      style={{
        margin: "auto",
        textAlign: "center",
        padding: "40px 24px",
        maxWidth: 480,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00c9b1 0%, #00a896 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
        }}
      >
        <MessageSquare size={26} color="#fff" />
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px", color: "#111827" }}>
        Hi, I'm AIRA
      </h2>
      <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
        Ask me about Hyniva products, services, blogs, podcasts, careers,
        industries, or company information.
      </p>
      <div
        style={{
          marginTop: 24,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
        }}
      >
        {[
          "What services does Hyniva offer?",
          "Show me recent blogs",
          "Career opportunities",
          "Contact information",
        ].map((suggestion) => (
          <button
            key={suggestion}
            style={{
              padding: "8px 14px",
              borderRadius: 20,
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
              fontSize: 12,
              color: "#374151",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#00c9b1";
              (e.currentTarget as HTMLButtonElement).style.color = "#00c9b1";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e8f0";
              (e.currentTarget as HTMLButtonElement).style.color = "#374151";
            }}
            data-suggestion={suggestion}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────
export function AiraChatbot() {
  const router = useRouter();
  const pathname = usePathname(); // used to re-focus when route changes

  // ── Hydration guard ──────────────────────────────────────
  const [isMounted, setIsMounted] = useState(false);

  // ── UI state ─────────────────────────────────────────────
  // isOpen defaults to false; corrected from sessionStorage after mount
  const [isOpen, setIsOpenState] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // ── Session ───────────────────────────────────────────────
  const [sessionId, setSessionId] = useState("");
  // Ref mirror — always readable inside async callbacks without stale closure
  const sessionIdRef = useRef<string>("");

  // ── Refs ──────────────────────────────────────────────────
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isSendingRef = useRef(false);
  const messagesAreaRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<Message[]>([]);
  const isOpenRef = useRef(false);
  // Prevent the persist effect from writing stale data during a clear
  const isClearing = useRef(false);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const ensureSessionId = useCallback(() => {
    if (sessionIdRef.current) return sessionIdRef.current;
    const sid = generateSessionId();
    sessionIdRef.current = sid;
    setSessionId(sid);
    try {
      sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sid);
    } catch {
      // ignore
    }
    return sid;
  }, []);

  // ─────────────────────────────────────────────────────────
  // Wrapped setIsOpen — keeps sessionStorage in sync so open
  // state survives Next.js client-side navigations
  // ─────────────────────────────────────────────────────────
  const setIsOpen = useCallback((value: boolean) => {
    setIsOpenState(value);
    try {
      sessionStorage.setItem(STORAGE_KEYS.IS_OPEN, value ? "1" : "0");
    } catch {
      // ignore
    }
  }, []);

  // Keep ref in sync so sendMessage always reads the latest session ID
  // even if the state hasn't flushed yet in an async context
  useEffect(() => {
    sessionIdRef.current = sessionId;
  }, [sessionId]);

  // ─────────────────────────────────────────────────────────
  // Mount + rehydration in ONE effect so setMessages batches with
  // setIsMounted before the persist effect runs (avoids writing []
  // over saved history on refresh / remount).
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    setIsMounted(true);

    try {
      // ── Session ID ───────────────────────────────────────
      let sid = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
      if (!sid) {
        sid = generateSessionId();
        sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sid);
      }
      sessionIdRef.current = sid;
      setSessionId(sid);

      // ── Messages (migrate legacy localStorage key from AskAiraWidget) ──
      let savedMessages = sessionStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (!savedMessages) {
        const legacy = localStorage.getItem(STORAGE_KEYS.MESSAGES);
        if (legacy) {
          savedMessages = legacy;
          sessionStorage.setItem(STORAGE_KEYS.MESSAGES, legacy);
          localStorage.removeItem(STORAGE_KEYS.MESSAGES);
        }
      }
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }

      // ── Open state ───────────────────────────────────────
      const wasOpen = sessionStorage.getItem(STORAGE_KEYS.IS_OPEN);
      if (wasOpen === "1") {
        setIsOpenState(true);
      }
    } catch (error) {
      console.error("Session rehydration failed:", error);
    }
  }, []);

  // ─────────────────────────────────────────────────────────
  // Persist messages on change (skipped during clear / empty state)
  // Never write [] unless executeClear pre-wrote it — prevents the
  // mount race from wiping sessionStorage before rehydration applies.
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isMounted) return;
    if (isClearing.current) return;
    if (messages.length === 0) return;
    try {
      sessionStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages, isMounted]);

  // ─────────────────────────────────────────────────────────
  // Listen for aira:navigate events from MessageContent (portal)
  // and from sendMessage — uses router.push for client-side nav
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: Event) => {
      const url = (e as CustomEvent<{ url: string }>).detail.url;
      persistChatSnapshot(
        messagesRef.current,
        isOpenRef.current,
        sessionIdRef.current
      );
      router.push(url);
    };
    window.addEventListener("aira:navigate", handler);
    return () => window.removeEventListener("aira:navigate", handler);
  }, [router]);

  // ─────────────────────────────────────────────────────────
  // Re-focus input whenever route changes while chat is open
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [pathname, isOpen]);

  // ─────────────────────────────────────────────────────────
  // Auto-scroll to latest message
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // ─────────────────────────────────────────────────────────
  // Focus input when chat opens
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ─────────────────────────────────────────────────────────
  // Body scroll lock
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isMounted) return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isMounted]);

  // ─────────────────────────────────────────────────────────
  // Escape key closes chat
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowClearConfirm(false);
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, setIsOpen]);

  // ─────────────────────────────────────────────────────────
  // Suggestion chip click handler (bubbled from EmptyState)
  // ─────────────────────────────────────────────────────────
  const handleMessagesAreaClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      const suggestion = target
        .closest("[data-suggestion]")
        ?.getAttribute("data-suggestion");
      if (suggestion) {
        sendMessage(suggestion);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // ─────────────────────────────────────────────────────────
  // Close chat
  // ─────────────────────────────────────────────────────────
  const closeChat = useCallback(() => {
    setShowClearConfirm(false);
    setIsOpen(false);
  }, [setIsOpen]);

  // ─────────────────────────────────────────────────────────
  // Execute clear — called after user confirms
  // FIX: pre-write [] to storage BEFORE setMessages([]) so
  // the persist effect never re-saves the old message list.
  // ─────────────────────────────────────────────────────────
  const executeClear = useCallback(async () => {
    setShowClearConfirm(false);
    isClearing.current = true; // block the persist effect

    // Notify backend to close session
    try {
      const closingId = sessionIdRef.current;
      if (closingId) {
        await fetch("/api/chatbot/session/close", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: closingId }),
        });
      }
    } catch (error) {
      console.error("Session close failed:", error);
    }

    // Pre-write empty state FIRST — before React re-renders
    try {
      sessionStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify([]));
      sessionStorage.removeItem(STORAGE_KEYS.SESSION_ID);
    } catch {
      // ignore
    }

    // Reset UI
    setMessages([]);
    setInputValue("");
    isSendingRef.current = false;
    setIsLoading(false);

    // Fresh session
    const freshSession = generateSessionId();
    try {
      sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, freshSession);
    } catch {
      // ignore
    }
    sessionIdRef.current = freshSession; // sync immediately
    setSessionId(freshSession);

    // Release the clearing guard after React has flushed
    setTimeout(() => {
      isClearing.current = false;
      inputRef.current?.focus();
    }, 50);
  }, []);

  // ─────────────────────────────────────────────────────────
  // Request clear
  // ─────────────────────────────────────────────────────────
  const requestClear = useCallback(() => {
    if (messages.length === 0) return;
    setShowClearConfirm(true);
  }, [messages.length]);

  // ─────────────────────────────────────────────────────────
  // Send Message
  // FIX: routeToNavigate uses emitNavigate → router.push
  // instead of window.location.href (no full reload)
  // ─────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      if (isSendingRef.current) return;

      isSendingRef.current = true;
      setIsLoading(true);
      setShowClearConfirm(false);

      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages((prev) => [
        ...prev,
        { text: trimmed, isUser: true, timestamp },
      ]);

      setInputValue("");

      const activeSessionId = ensureSessionId();

      let reply = "";
      let routeToNavigate: string | null = null;

      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_CHATBOT_API_URL || "/api/chatbot";

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            session_id: activeSessionId,
          }),
        });

        if (!response.ok) throw new Error(`API error ${response.status}`);

        const data: ApiResponse = await response.json();
        reply = data.message || "Sorry, I couldn't understand that.";
        routeToNavigate = data.route || data.target_route || null;
      } catch (error) {
        console.error("Chatbot API error:", error);
        reply =
          "Sorry, I couldn't reach the server right now. Please try again.";
      }

      const replyTimestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages((prev) => {
        const next = [
          ...prev,
          { text: reply, isUser: false, timestamp: replyTimestamp },
        ];
        messagesRef.current = next;
        persistChatSnapshot(
          next,
          isOpenRef.current,
          sessionIdRef.current
        );
        return next;
      });

      setIsLoading(false);
      isSendingRef.current = false;

      // Client-side navigation — preserves chat history in sessionStorage
      if (routeToNavigate) {
        setTimeout(() => {
          navigateFromChat(routeToNavigate!);
        }, 700);
      }
    },
    [ensureSessionId]
  );

  // ─────────────────────────────────────────────────────────
  // Enter key submits
  // ─────────────────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  // ─────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Floating trigger button ── */}
      {/* Always rendered (not inside isOpen guard) so it's
          visible on every page even when chat is closed */}
      <button
        aria-label="Open AIRA chat"
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          border: "none",
          borderRadius: 999,
          padding: "14px 22px",
          background: "#00c9b1",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
          boxShadow: "0 8px 30px rgba(0,201,177,0.35)",
          display: isOpen ? "none" : "flex", // hide when modal is open
          alignItems: "center",
          gap: 8,
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform =
            "translateY(-2px)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 12px 36px rgba(0,201,177,0.45)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform =
            "translateY(0)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 8px 30px rgba(0,201,177,0.35)";
        }}
      >
        <MessageSquare size={18} />
        Ask AIRA
      </button>

      {/* ── Modal portal — only rendered after mount + isOpen ── */}
      {isMounted && isOpen && (
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
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999999,
              backdropFilter: "blur(2px)",
            }}
          >
            {/* Chat window */}
            <div
              style={{
                width: "90%",
                maxWidth: 1100,
                height: "82vh",
                background: "#fff",
                borderRadius: 18,
                border: "2px solid #00c9b1",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
              }}
            >
              {/* ── Header ── */}
              <div
                style={{
                  padding: "14px 18px",
                  borderBottom: "1px solid #e5e7eb",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexShrink: 0,
                  background: "#fff",
                  zIndex: 2,
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  <Image
                    src="/images/AIRA MASCOT/AIRA NEW MASCOT crop.png"
                    alt="AIRA mascot"
                    width={42}
                    height={42}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      AIRA
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>
                      Your Agentic Assistant
                    </div>
                  </div>
                </div>

                <div
                  style={{ display: "flex", gap: 8, alignItems: "center" }}
                >
                  {/* Reset / Clear button */}
                  <button
                    onClick={requestClear}
                    title="Clear conversation"
                    disabled={messages.length === 0}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 999,
                      border: "1px solid #d1d5db",
                      background: "#fff",
                      cursor:
                        messages.length === 0 ? "not-allowed" : "pointer",
                      opacity: messages.length === 0 ? 0.4 : 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "border-color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (messages.length > 0)
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.borderColor = "#ef4444";
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLButtonElement
                      ).style.borderColor = "#d1d5db";
                    }}
                  >
                    <RotateCcw
                      size={15}
                      color={messages.length === 0 ? "#94a3b8" : "#374151"}
                    />
                  </button>

                  {/* Close button */}
                  <button
                    onClick={closeChat}
                    title="Close chat"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 999,
                      border: "1px solid #d1d5db",
                      background: "#fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "border-color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLButtonElement
                      ).style.borderColor = "#374151";
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLButtonElement
                      ).style.borderColor = "#d1d5db";
                    }}
                  >
                    <X size={15} color="#374151" />
                  </button>
                </div>
              </div>

              {/* ── Clear confirm dialog ── */}
              {showClearConfirm && (
                <ClearConfirmDialog
                  onConfirm={executeClear}
                  onCancel={() => setShowClearConfirm(false)}
                />
              )}

              {/* ── Messages area ── */}
              <div
                ref={messagesAreaRef}
                onClick={handleMessagesAreaClick}
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  scrollBehavior: "smooth",
                }}
              >
                {messages.length === 0 && !isLoading && <EmptyState />}

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    data-testid={
                      msg.isUser ? "chat-message-user" : "chat-message-assistant"
                    }
                    style={{
                      display: "flex",
                      justifyContent: msg.isUser ? "flex-end" : "flex-start",
                      animation: "aira-fade-in 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "75%",
                        padding: "11px 15px",
                        borderRadius: msg.isUser
                          ? "16px 16px 4px 16px"
                          : "16px 16px 16px 4px",
                        background: msg.isUser ? "#dcfce7" : "#f8fafc",
                        border: msg.isUser
                          ? "1px solid #bbf7d0"
                          : "1px solid #e2e8f0",
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.6,
                        fontSize: 14,
                        color: "#1e293b",
                      }}
                    >
                      <MessageContent text={msg.text} />
                      <div
                        style={{
                          marginTop: 6,
                          fontSize: 10,
                          color: "#94a3b8",
                          textAlign: msg.isUser ? "right" : "left",
                        }}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div data-testid="chat-typing-indicator">
                    <TypingIndicator />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* ── Input bar ── */}
              <div
                style={{
                  padding: "14px 18px",
                  borderTop: "1px solid #e5e7eb",
                  display: "flex",
                  gap: 10,
                  flexShrink: 0,
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    border: "1.5px solid #d1d5db",
                    borderRadius: 12,
                    padding: "0 14px",
                    transition: "border-color 0.15s",
                  }}
                  onFocusCapture={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "#00c9b1";
                  }}
                  onBlurCapture={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "#d1d5db";
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask AIRA anything…"
                    disabled={isLoading}
                    aria-label="Ask AIRA"
                    style={{
                      flex: 1,
                      height: 50,
                      border: "none",
                      outline: "none",
                      fontSize: 14,
                      color: "#111827",
                      background: "transparent",
                    }}
                  />
                </div>

                <button
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 12,
                    border: "none",
                    background:
                      inputValue.trim() && !isLoading ? "#00c9b1" : "#e2e8f0",
                    color: "#fff",
                    cursor:
                      inputValue.trim() && !isLoading
                        ? "pointer"
                        : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.15s, transform 0.1s",
                  }}
                  onMouseEnter={(e) => {
                    if (inputValue.trim() && !isLoading)
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "scale(1)";
                  }}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </BodyPortal>
      )}

      {/* Global animation keyframes */}
      <style>{`
        @keyframes aira-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}