import { useState, useEffect, useCallback, useRef } from "react";
import type { Signal } from "@/data/types";
import { generateInitialSignals, generateSignal } from "@/data/mockData";

export function useSignalFeed() {
  const [signals, setSignals] = useState<Signal[]>(() => generateInitialSignals(25));
  const [autoScroll, setAutoScroll] = useState(true);
  const latestIdRef = useRef<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSignal = generateSignal();
      latestIdRef.current = newSignal.id;
      setSignals((prev) => [newSignal, ...prev].slice(0, 100));
    }, Math.random() * 2000 + 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleAutoScroll = useCallback(() => {
    setAutoScroll((prev) => !prev);
  }, []);

  return {
    signals,
    autoScroll,
    toggleAutoScroll,
    latestId: latestIdRef.current,
  };
}
