export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://ijktec.com/#organization",
              "name": "IJKTEC",
              "url": "https://ijktec.com",
              "logo": "https://ijktec.com/logo.svg",
              "description": "AI and technology company — AI, Healthcare Tech, Mobile Apps, SaaS, Automation",
              "foundingDate": "2026",
              "slogan": "Engineering Intelligence. Building the Future.",
              "address": { "@type": "PostalAddress", "addressLocality": "Mumbai", "addressCountry": "IN" },
            },
            {
              "@type": "WebSite",
              "@id": "https://ijktec.com/#website",
              "url": "https://ijktec.com",
              "name": "IJKTEC",
              "publisher": { "@id": "https://ijktec.com/#organization" },
            }
          ]
        })
      }}
    />
  );
}
