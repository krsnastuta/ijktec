'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const activeTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'dark';
    setTheme(activeTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full border border-border/50 bg-surface-offset flex items-center justify-center opacity-0" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full border border-border bg-surface-2 hover:border-accent hover:text-accent flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-accent"
      aria-label={`Toggle theme (currently ${theme})`}
    >
      {theme === 'light' ? (
        <Sun className="w-4 h-4 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300" />
      )}
    </button>
  );
}
