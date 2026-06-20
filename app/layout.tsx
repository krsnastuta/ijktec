import type { Metadata } from 'next';
import './globals.css';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  metadataBase: new URL('https://ijktec.com'),
  title: {
    default: 'IJKTEC — Engineering Intelligence. Building the Future.',
    template: '%s | IJKTEC',
  },
  description: 'IJKTEC is an AI and technology company building innovative products in Artificial Intelligence, Healthcare Technology, Mobile Applications, SaaS Platforms, and Automation Systems. Impact Just KickedIn — estd. 2026.',
  keywords: [
    'AI company', 'artificial intelligence', 'healthcare technology',
    'software solutions', 'mobile applications', 'SaaS platforms',
    'automation systems', 'tech startup', 'IJKTEC',
  ],
  authors: [{ name: 'IJKTEC', url: 'https://ijktec.com' }],
  creator: 'IJKTEC',
  publisher: 'IJKTEC',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    url: 'https://ijktec.com',
    title: 'IJKTEC — Engineering Intelligence. Building the Future.',
    description: 'AI-powered products and digital experiences. Healthcare Technology, Mobile Apps, SaaS, Automation. Impact Just KickedIn — estd. 2026.',
    siteName: 'IJKTEC',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'IJKTEC — Engineering Intelligence' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ijktec',
    creator: '@ijktec',
    title: 'IJKTEC — Engineering Intelligence. Building the Future.',
    description: 'AI-powered products and digital experiences. Impact Just KickedIn — estd. 2026.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://ijktec.com',
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased selection:bg-accent selection:text-bg">
        {children}
        <StructuredData />
      </body>
    </html>
  );
}
