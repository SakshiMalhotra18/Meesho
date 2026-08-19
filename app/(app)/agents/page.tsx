import type { Metadata } from 'next';
import AgentsView from '@/components/agents/AgentsView';

export const metadata: Metadata = {
  title: 'Agent Control Room — ResolveAI',
  description: 'Monitor and replay AI agent execution and coordination.',
};

export default function AgentsPage() {
  return <AgentsView />;
}
