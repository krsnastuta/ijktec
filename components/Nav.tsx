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
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-border/80 bg-white p-[3px] transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
              <img src="/logo.svg" alt="IJKTEC Logo" className="w-full h-full object-contain" />
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
