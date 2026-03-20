"use client";

import { useState, useCallback, useRef } from "react";
import { checkEmailExists } from "@/lib/api/auth";

const DEBOUNCE_DELAY = 500;

export function useEmailCheck() {
  const [isChecking, setIsChecking] = useState(false);
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkEmail = useCallback((email: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailExists(null);
      setIsChecking(false);
      return;
    }

    setIsChecking(true);

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const result = await checkEmailExists(email);
        setEmailExists(result.exists);
      } catch {
        setEmailExists(null);
      } finally {
        setIsChecking(false);
      }
    }, DEBOUNCE_DELAY);
  }, []);

  const reset = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    setEmailExists(null);
    setIsChecking(false);
  }, []);

  return { isChecking, emailExists, checkEmail, reset };
}
