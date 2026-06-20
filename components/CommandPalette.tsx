'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Command, CornerDownLeft, Globe, Zap } from 'lucide-react';

interface PaletteItem {
  id: string;
  name: string;
  category: 'Navigation' | 'Actions';
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Toggle Theme logic helper
  const handleToggleTheme = () => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = activeTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    // Dispatch a storage event or custom event to force theme toggle components to update
    window.dispatchEvent(new Event('storage'));
  };

  // Smooth scroll and focus
  const scrollTo = (id: string, focusSelector?: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (focusSelector) {
        setTimeout(() => {
          const input = document.querySelector(focusSelector) as HTMLElement;
          input?.focus();
        }, 800);
      }
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const items: PaletteItem[] = [
    {
      id: 'home',
      name: 'Go to Home',
      category: 'Navigation',
      icon: <Globe className="w-4 h-4" />,
      action: () => scrollTo('home'),
    },
    {
      id: 'products',
      name: 'Go to Products',
      category: 'Navigation',
      icon: <Globe className="w-4 h-4" />,
      action: () => scrollTo('products'),
    },
    {
      id: 'services',
      name: 'Go to Services',
      category: 'Navigation',
      icon: <Globe className="w-4 h-4" />,
      action: () => scrollTo('services'),
    },
    {
      id: 'about',
      name: 'Go to About',
      category: 'Navigation',
      icon: <Globe className="w-4 h-4" />,
      action: () => scrollTo('about'),
    },
    {
      id: 'contact',
      name: 'Go to Contact',
      category: 'Navigation',
      icon: <Globe className="w-4 h-4" />,
      action: () => scrollTo('contact'),
    },
    {
      id: 'toggle-theme',
      name: 'Toggle Theme (Light / Dark)',
      category: 'Actions',
      icon: <Zap className="w-4 h-4 text-accent" />,
      action: handleToggleTheme,
    },
    {
      id: 'join-waitlist',
      name: 'Join Waitlist',
      category: 'Actions',
      icon: <Zap className="w-4 h-4 text-accent" />,
      action: () => scrollTo('waitlist', '#waitlist input[type="email"]'),
    },
    {
      id: 'send-email',
      name: 'Send Email / Message Team',
      category: 'Actions',
      icon: <Zap className="w-4 h-4 text-accent" />,
      action: () => scrollTo('contact', '#name'),
    },
  ];

  // Filter items
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Listeners for shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      // Close on Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
      }

      if (!isOpen) return;

      // Navigate items
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      }

      // Execute selected item
      if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
          setIsOpen(false);
        }
      }
    };

    const handleCustomToggle = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-command-palette', handleCustomToggle);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-command-palette', handleCustomToggle);
    };
  }, [isOpen, filteredItems, selectedIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Adjust scroll when selectedIndex changes
  useEffect(() => {
    const selectedElement = listRef.current?.children[selectedIndex] as HTMLElement;
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-bg/85 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Palette Modal */}
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-surface shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/50">
          <Search className="w-5 h-5 text-text-muted flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-text text-sm placeholder:text-text-faint/60"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-surface-offset border border-border/80 text-[10px] text-text-faint uppercase">
            ESC
          </kbd>
        </div>

        {/* List of items */}
        <div
          ref={listRef}
          className="max-h-[300px] overflow-y-auto py-2 divide-y divide-border/20 no-scrollbar"
        >
          {filteredItems.length === 0 ? (
            <div className="px-4 py-8 text-center text-xs font-body text-text-faint">
              No results found for &quot;{search}&quot;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors text-sm font-body ${
                    isSelected
                      ? 'bg-accent text-[#0d0c0b]'
                      : 'text-text hover:bg-surface-2'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isSelected ? 'text-[#0d0c0b]' : 'text-text-muted'}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-[10px] uppercase font-semibold ${isSelected ? 'text-[#0d0c0b]/70' : 'text-text-faint'}`}>
                      {item.category}
                    </span>
                    {isSelected && <CornerDownLeft className="w-3.5 h-3.5 ml-1 text-[#0d0c0b]" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex justify-between items-center px-4 py-2.5 bg-surface-offset border-t border-border/40 text-[10px] font-body text-text-faint">
          <div className="flex items-center gap-2">
            <span>↑↓ to navigate</span>
            <span className="w-1 h-1 rounded-full bg-border/80" />
            <span>Enter to select</span>
          </div>
          <div className="flex items-center gap-1">
            <Command className="w-3 h-3" />
            <span>K to toggle</span>
          </div>
        </div>
      </div>
    </div>
  );
}
