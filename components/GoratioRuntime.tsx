"use client";

import { useEffect, useRef } from "react";
import { initGoratio } from "@/lib/goratioRuntime";

/**
 * Runs the imperative background / interactives / UI scripts exactly once
 * after the static markup has hydrated. The ref guard makes this idempotent
 * under React Strict Mode's double-invoked effects (dev), so listeners and
 * animation loops are never duplicated.
 */
export default function GoratioRuntime() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    initGoratio();
  }, []);

  return null;
}
