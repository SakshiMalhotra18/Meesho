import type { Metadata } from 'next';
import CaseQueueView from '@/components/cases/CaseQueueView';

export const metadata: Metadata = {
  title: 'Cases — ResolveAI',
  description: 'Browse and manage all marketplace dispute cases.',
};

export default function CasesPage() {
  return <CaseQueueView />;
}
