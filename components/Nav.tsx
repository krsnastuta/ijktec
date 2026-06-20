'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { Menu, X, Command } from 'lucide-react';

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [platformKey, setPlatformKey] = useState('⌘K');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Determine OS for command key label
    if (typeof window !== 'undefined') {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      setPlatformKey(isMac ? '⌘K' : 'Ctrl+K');
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('toggle-command-palette'));
  };

  const navLinks = [
    { name: 'Products', href: '#products' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg/75 backdrop-blur-md border-b border-border/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Brand Logo */}
          <Link href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-border/80 bg-surface-2 p-[2px] transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full text-text">
                <rect x="5" y="5" width="90" height="90" rx="20" fill="var(--color-surface-offset)" stroke="var(--color-border)" stroke-width="1.5"/>
                <text x="68" y="24" font-family="sans-serif" font-size="5.5" font-weight="900" fill="var(--color-accent)" letter-spacing="0.1">ESTD 2026</text>
                <g transform="translate(18, 25)">
                  <path d="M12 25 C12 20, 14 18, 16 18 C18 18, 19 20, 19 25 L19 40 C19 42, 17 44, 15 44" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                  <circle cx="16" cy="10" r="3.5" fill="var(--color-accent)" />
                  <path d="M28 18 L28 48 C28 56, 22 60, 16 60 C12 60, 10 58, 10 55" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                  <circle cx="28" cy="10" r="3.5" fill="var(--color-accent)" />
                  <path d="M42 12 L42 44" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" fill="none" />
                  <path d="M54 18 L43 30 L54 44" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                  <path d="M43 30 L49 30" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" fill="none" />
                </g>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold tracking-tight text-sm text-text leading-none">IJKTEC</span>
              <span className="text-[8px] font-medium tracking-[0.18em] text-text-muted mt-[3px] uppercase leading-none">IMPACT JUST KICKEDIN</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-body text-text-muted hover:text-text hover:underline underline-offset-4 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Command Palette Button */}
            <button
              onClick={triggerCommandPalette}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-surface-2 hover:border-accent/40 text-text-muted hover:text-text transition-all text-xs font-body group"
              aria-label="Open command palette"
            >
              <Command className="w-3.5 h-3.5 group-hover:text-accent transition-colors" />
              <span>Search</span>
              <kbd className="bg-surface-offset px-1.5 py-0.5 rounded text-[10px] border border-border/80 text-text-faint">{platformKey}</kbd>
            </button>

            <ThemeToggle />
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={triggerCommandPalette}
              className="p-2 rounded-full border border-border bg-surface-2 text-text-muted hover:text-text"
              aria-label="Search"
            >
              <Command className="w-4 h-4" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full border border-border bg-surface-2 text-text-muted hover:text-text"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-bg border-b border-border/60 py-4 px-6 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-body text-text-muted hover:text-text py-1 border-b border-border/20"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
