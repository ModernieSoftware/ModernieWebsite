// app/layout.tsx
import './globals.css';

import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'MODERNIE - Shaping Tomorrow\'s Technology',
  description: 'Enterprise-grade SaaS platform powered by AI and cloud computing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
