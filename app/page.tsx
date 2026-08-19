import type { Metadata } from 'next';
import InteractiveLanding from '@/components/landing/InteractiveLanding';

export const metadata: Metadata = {
  title: 'ResolveAI — Marketplace Dispute Intelligence',
  description: 'Agentic AI system for investigating and resolving e-commerce return, refund, fraud, and logistics disputes.',
};

export default function LandingPage() {
  return <InteractiveLanding />;
}
