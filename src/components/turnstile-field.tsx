"use client";

import {
  Turnstile,
  type TurnstileInstance,
} from "@marsidev/react-turnstile";
import { forwardRef, useImperativeHandle, useRef } from "react";

type TurnstileFieldProps = {
  siteKey?: string;
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
};

export type TurnstileFieldHandle = {
  reset: () => void;
};

export const TurnstileField = forwardRef<
  TurnstileFieldHandle,
  TurnstileFieldProps
>(function TurnstileField(
  { siteKey, onSuccess, onError, onExpire },
  ref,
) {
  const turnstileRef = useRef<TurnstileInstance>(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      turnstileRef.current?.reset();
    },
  }));

  if (!siteKey) {
    if (process.env.NODE_ENV === "development") {
      return (
        <p className="text-xs text-amber-600">
          Turnstile site key is not configured. Set TURNSTILE_SITE_KEY to enable
          spam protection.
        </p>
      );
    }

    return null;
  }

  return (
    <div className="flex justify-center">
      <Turnstile
        ref={turnstileRef}
        siteKey={siteKey}
        onSuccess={onSuccess}
        onError={() => {
          onError?.();
          turnstileRef.current?.reset();
        }}
        onExpire={() => {
          onExpire?.();
          turnstileRef.current?.reset();
        }}
        options={{
          theme: "light",
          size: "normal",
        }}
      />
    </div>
  );
});
