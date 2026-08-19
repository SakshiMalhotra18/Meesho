import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ResolveAI — Marketplace Dispute Intelligence',
  description: 'Agentic AI system for investigating and resolving e-commerce return, refund, fraud, and logistics disputes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
