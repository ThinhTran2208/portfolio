"use client";

import { useEffect, useSyncExternalStore } from "react";

function readTheme() {
  try {
    return localStorage.getItem("portfolio-theme") === "dark"
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("portfolio-theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("portfolio-theme-change", callback);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem("portfolio-theme", next);
      window.dispatchEvent(new Event("portfolio-theme-change"));
    } catch {
      // Browsers may disable storage. The current page can still change theme.
      document.documentElement.dataset.theme =
        document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    }
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
    >
      <span className="dark-mode-label">Dark mode</span>
      <span className="light-mode-label">Light mode</span>
    </button>
  );
}
