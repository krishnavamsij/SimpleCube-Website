type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export function getClientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim();
  }

  return request.headers.get("x-real-ip") ?? undefined;
}

export async function verifyTurnstileToken(
  token: string | null | undefined,
  remoteIp?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "TURNSTILE_SECRET_KEY is not set; skipping Turnstile verification in development.",
      );
      return true;
    }

    console.error("TURNSTILE_SECRET_KEY is not configured");
    return false;
  }

  if (!token || typeof token !== "string") {
    return false;
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      },
    );

    if (!response.ok) {
      console.error("Turnstile verification request failed:", response.status);
      return false;
    }

    const result = (await response.json()) as TurnstileVerifyResponse;

    if (!result.success) {
      console.error("Turnstile verification failed:", result["error-codes"]);
    }

    return result.success;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}
