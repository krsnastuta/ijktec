'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus('error');
      setResponseMsg('All fields are required.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setResponseMsg(data.message);
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setResponseMsg(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setResponseMsg('Network error. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column: Details */}
        <div className="flex flex-col justify-between py-2">
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-display font-semibold tracking-widest text-accent uppercase">
                Contact
              </span>
              <h2 className="font-display font-bold text-text text-2xl md:text-4xl tracking-tight mt-2 mb-6">
                Talk to the team.
              </h2>
              <p className="font-body text-sm md:text-base text-text-muted leading-relaxed max-w-md">
                Have a question, proposal, or want to discuss a partnership? Get in touch. Our team responds within 24 hours.
              </p>
            </div>

            {/* Info Cards */}
            <div className="flex flex-col gap-5 mt-6 font-body text-sm md:text-base">
              <a
                href="mailto:team@ijktec.com"
                className="flex items-center gap-4 text-text-muted hover:text-text transition-colors w-fit group"
              >
                <div className="w-10 h-10 rounded-full border border-border/50 bg-surface-2 flex items-center justify-center text-text-muted group-hover:text-accent transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <span>team@ijktec.com</span>
              </a>

              <div className="flex items-center gap-4 text-text-muted w-fit">
                <div className="w-10 h-10 rounded-full border border-border/50 bg-surface-2 flex items-center justify-center text-text-muted">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          <div className="text-xs font-body text-text-faint mt-12 lg:mt-0">
            <span>By submitting, you agree to our privacy policy.</span>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="bg-surface-2 border border-border/50 rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center gap-4 py-16"
              >
                <CheckCircle2 className="w-16 h-16 text-accent" />
                <h3 className="font-display font-semibold text-text text-xl md:text-2xl tracking-tight">
                  Message Sent
                </h3>
                <p className="font-body text-sm md:text-base text-text-muted max-w-sm">
                  {responseMsg}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2.5 rounded-full border border-border hover:border-text font-body text-sm transition-all"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
              >
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-display font-medium text-text-muted uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text placeholder:text-text-faint/50 focus:outline-none focus:border-accent text-sm transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-display font-medium text-text-muted uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text placeholder:text-text-faint/50 focus:outline-none focus:border-accent text-sm transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-xs font-display font-medium text-text-muted uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text placeholder:text-text-faint/50 focus:outline-none focus:border-accent text-sm transition-all"
                    placeholder="Subject line"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-display font-medium text-text-muted uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text placeholder:text-text-faint/50 focus:outline-none focus:border-accent text-sm transition-all resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 rounded-full bg-text text-bg hover:bg-text-muted font-body font-semibold text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
                  <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                {status === 'error' && (
                  <p className="text-xs font-body text-red-500 mt-2 text-center">
                    {responseMsg}
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
