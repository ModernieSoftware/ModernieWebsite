// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';




export const metadata: Metadata = {
  title: 'MODERNIE - Shaping Tomorrow\'s Technology',
  description: 'FinTech-specialized software company delivering secure, scalable, and AI-powered SaaS platforms for banking, payments, wealth management, and digital finance innovation',
  keywords: ['AI solutions', 'SaaS platform', 'FinTech', 'enterprise software', 'machine learning', 'data analytics'],
  metadataBase: new URL('https://www.modernie.lk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MODERNIE - Shaping Tomorrow\'s Technology',
    description: 'FinTech-specialized software company delivering secure, scalable, and AI-powered SaaS platforms for banking, payments, wealth management, and digital finance innovation',
    url: 'https://www.modernie.lk',
    siteName: 'MODERNIE',
    images: [
      {
        url: 'https://www.modernie.lk/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MODERNIE Platform Overview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MODERNIE - Shaping Tomorrow\'s Technology',
    description: 'Enterprise-grade SaaS platform powered by AI and cloud computing',
    creator: '@modernietech',
    images: ['https://www.modernie.lk/twitter-card.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data */}
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "MODERNIE",
      "url": "https://modernie.lk/",
      "logo": "https://modernie.lk/logo.png",
      "sameAs": [
        "https://www.linkedin.com/company/modernie",
        "https://web.facebook.com/modernie/?_rdc=1&_rdr#"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "info@modernie.lk",
        "contactType": "Customer Support",
        "areaServed": "US"
      }
    })
  }}
></script>


        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon.png" />
         <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body >
        {children}
      </body>
    </html>
  );
}