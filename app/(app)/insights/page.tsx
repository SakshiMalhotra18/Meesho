import type { Metadata } from 'next';
import InsightsView from '@/components/insights/InsightsView';

export const metadata: Metadata = {
  title: 'Insights — ResolveAI',
  description: 'Analytics and performance metrics for AI-powered dispute resolution.',
};

export default function InsightsPage() {
  return <InsightsView />;
}
