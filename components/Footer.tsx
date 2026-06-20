import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: 'AlogiX', href: '#products' },
      { name: 'AI Healthcare', href: '#products' },
      { name: 'Future Tech', href: '#products' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Services', href: '#services' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Security Policy', href: '#' },
    ],
  };

  return (
    <footer className="bg-surface border-t border-border/40 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-12 border-b border-border/20">
          {/* Logo Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl border border-border/80 bg-surface-2 p-[2.5px] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full text-text">
                  <rect x="5" y="5" width="90" height="90" rx="20" fill="var(--color-surface-offset)" stroke="var(--color-border)" strokeWidth="1.5"/>
                  <text x="68" y="24" fontFamily="sans-serif" fontSize="5.5" fontWeight="900" fill="var(--color-accent)" letterSpacing="0.1">ESTD 2026</text>
                  <g transform="translate(18, 25)">
                    <path d="M12 25 C12 20, 14 18, 16 18 C18 18, 19 20, 19 25 L19 40 C19 42, 17 44, 15 44" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle cx="16" cy="10" r="3.5" fill="var(--color-accent)" />
                    <path d="M28 18 L28 48 C28 56, 22 60, 16 60 C12 60, 10 58, 10 55" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle cx="28" cy="10" r="3.5" fill="var(--color-accent)" />
                    <path d="M42 12 L42 44" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                    <path d="M54 18 L43 30 L54 44" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path d="M43 30 L49 30" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                  </g>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-semibold tracking-tight text-base text-text leading-none">IJKTEC</span>
                <span className="text-[9px] font-medium tracking-[0.18em] text-text-muted mt-1 uppercase leading-none">IMPACT JUST KICKEDIN</span>
              </div>
            </div>
            <p className="text-sm font-body text-text-muted mt-2 max-w-xs">
              Engineering intelligence, building the future. AI, Healthcare, SaaS, and Automation.
            </p>
            <span className="text-xs font-body text-text-faint">
              Estd. 2026 | Mumbai, India
            </span>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="font-display font-medium text-text text-sm uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-3 font-body text-sm">
              {links.product.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-text-muted hover:text-text hover:underline transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="font-display font-medium text-text text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3 font-body text-sm">
              {links.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-text-muted hover:text-text hover:underline transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h3 className="font-display font-medium text-text text-sm uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3 font-body text-sm">
              {links.legal.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-text-muted hover:text-text hover:underline transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 text-xs font-body text-text-faint gap-4">
          <span>&copy; {currentYear} IJKTEC. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
