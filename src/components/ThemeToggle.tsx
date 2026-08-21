"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    const next = saved === "light";
    document.documentElement.classList.toggle("light", next);
    setLight(next);
  }, []);

  function toggleTheme() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("portfolio-theme", next ? "light" : "dark");
  }

  return (
    <button
      className="themeToggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <span className="themeToggleRing" />
      <span className="themeIcon">{light ? "☀" : "◐"}</span>
    </button>
  );
}
