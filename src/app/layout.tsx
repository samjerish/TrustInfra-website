import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trust Infra — Enterprise Construction Management & AI Platform',
  description:
    'Connect every stakeholder in your construction project into one intelligent ecosystem. AI-powered project management, BOQ generation, material tracking, and real-time collaboration.',
  keywords: [
    'construction management',
    'AI construction',
    'project management',
    'BOQ',
    'Trust Infra',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
