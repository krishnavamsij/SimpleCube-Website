import { NextResponse } from "next/server";

type UpstreamResponse = {
  message?: string;
  status?: string;
  route?: string;
  target_route?: string;
  detected_intent?: string;
};

const HYNIVA_ONLY_MESSAGE =
  "I can't help with that. I can help only with information related to Hyniva.";

function getChatbotApiUrl(): string | null {
  return (
    process.env.CHATBOT_API_URL ||
    process.env.NEXT_PUBLIC_CHATBOT_API_URL ||
    null
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      message?: unknown;
      session_id?: unknown;
    };
    const { message, session_id } = body;

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { message: "Please enter a message." },
        { status: 400 },
      );
    }

    const sessionId =
      typeof session_id === "string" && session_id.trim()
        ? session_id.trim()
        : null;

    const apiUrl = getChatbotApiUrl();
    if (!apiUrl) {
      return NextResponse.json(
        { message: "Chatbot API URL is not configured." },
        { status: 500 },
      );
    }

    const upstreamResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message.trim(),
        session_id: sessionId,
      }),
      cache: "no-store",
    });

    let payload: UpstreamResponse | null = null;
    try {
      payload = (await upstreamResponse.json()) as UpstreamResponse;
    } catch {
      payload = null;
    }

    if (!upstreamResponse.ok) {
      if (upstreamResponse.status === 403) {
        return NextResponse.json(
          {
            message: HYNIVA_ONLY_MESSAGE,
          },
          // Return a successful response so UI renders this as assistant content.
          { status: 200 },
        );
      }

      return NextResponse.json(
        {
          message:
            payload?.message || "Sorry, I couldn't reach the chatbot service.",
          status: payload?.status || "upstream_error",
        },
        { status: upstreamResponse.status },
      );
    }

    return NextResponse.json({
      message: payload?.message || "I received your request.",
      status: payload?.status,
      route: payload?.route,
      target_route: payload?.target_route,
      detected_intent: payload?.detected_intent,
    });
  } catch (error) {
    console.error("Chatbot proxy error:", error);
    return NextResponse.json(
      { message: "Sorry, I couldn't reach the chatbot service." },
      { status: 500 },
    );
  }
}
