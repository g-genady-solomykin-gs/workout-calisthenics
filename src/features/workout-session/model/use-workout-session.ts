"use client";

import { useEffect, useState } from "react";

export function useWorkoutSession() {
  const [isRunning, setIsRunning] = useState(false);
  const [completedSets, setCompletedSets] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [isRunning]);

  return {
    isRunning,
    completedSets,
    formattedTime: `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`,
    toggleSession: () => setIsRunning((value) => !value),
    completeSet: () => setCompletedSets((value) => value + 1),
  };
}
