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
              <div className="w-12 h-12 rounded-xl border border-border/80 bg-white p-1 flex items-center justify-center">
                <img src="/logo.svg" alt="IJKTEC Logo" className="w-full h-full object-contain" />
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
