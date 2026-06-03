"use client";

import { useEffect, useRef } from "react";
import { initRatio } from "@/lib/ratioRuntime";

/**
 * Runs the imperative background / interactives / UI scripts exactly once
 * after the static markup has hydrated. The ref guard makes this idempotent
 * under React Strict Mode's double-invoked effects (dev), so listeners and
 * animation loops are never duplicated.
 */
export default function RatioRuntime() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    initRatio();
  }, []);

  return null;
}
