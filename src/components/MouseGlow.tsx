"use client";

import { useEffect } from "react";

export default function MouseGlow() {
  useEffect(() => {
    function handleMove(event: MouseEvent) {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return <div className="mouseGlow" aria-hidden="true" />;
}
