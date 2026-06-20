'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Target date: Jan 1, 2027
  const targetDate = new Date('2027-01-01T00:00:00Z').getTime();

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d.toString().padStart(2, '0'),
        hours: h.toString().padStart(2, '0'),
        minutes: m.toString().padStart(2, '0'),
        seconds: s.toString().padStart(2, '0'),
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);

        // Confetti burst in logo colors (gold, cream, black)
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#c8a84b', '#f2f0eb', '#0d0c0b'],
        });
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (!mounted) {
    return (
      <div className="w-full bg-text text-bg py-24 text-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-6 w-32 bg-bg/20 rounded" />
          <div className="h-12 w-64 bg-bg/20 rounded" />
        </div>
      </div>
    );
  }

  return (
    <section id="waitlist" className="w-full bg-text text-bg py-24 px-4 sm:px-6 lg:px-8 border-y border-border/20 relative overflow-hidden flex flex-col items-center">
      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Launch Status Header */}
        <span className="text-xs font-display font-semibold tracking-widest text-accent uppercase flex items-center gap-2 mb-3">
          <span>📡</span> Launch Status
        </span>
        <h2 className="font-display font-semibold text-2xl md:text-4xl tracking-tight text-bg mb-2">
          Impact is Coming. Be First.
        </h2>
        <p className="font-body text-sm md:text-base text-bg/70 mb-12">
          Join the waitlist. Get early access.
        </p>

        {/* Countdown Ticker */}
        <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-lg w-full mb-16">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center bg-bg/5 border border-bg/10 rounded-2xl p-4 min-w-[70px]">
              <span className="font-display font-semibold text-2xl md:text-4xl text-bg leading-none mb-1">
                {item.value}
              </span>
              <span className="text-[10px] md:text-xs font-body uppercase tracking-wider text-bg/50">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Waitlist Form */}
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 bg-bg/5 border border-accent/40 rounded-3xl p-8"
              >
                <CheckCircle2 className="w-12 h-12 text-accent" />
                <h3 className="font-display font-medium text-lg text-bg">Joined waitlist</h3>
                <p className="font-body text-sm text-bg/75">{message}</p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    className="flex-grow px-5 py-3 rounded-full border border-bg/20 bg-bg/5 text-bg placeholder:text-bg/40 focus:outline-none focus:border-accent text-sm transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3 rounded-full bg-accent text-[#0d0c0b] hover:bg-accent/90 disabled:opacity-50 font-body font-semibold text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>{status === 'loading' ? 'Joining...' : 'Notify Me'}</span>
                    <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>

                {/* Sub-text */}
                <p className="text-xs font-body text-bg/50">
                  No spam. Unsubscribe anytime.
                </p>

                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-body text-red-400 mt-2"
                  >
                    {message}
                  </motion.p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
