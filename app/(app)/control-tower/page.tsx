import type { Metadata } from 'next';
import ControlTowerView from '@/components/control-tower/ControlTowerView';

export const metadata: Metadata = {
  title: 'Control Tower — ResolveAI',
  description: 'Real-time overview of all marketplace disputes and AI investigation activity.',
};

export default function ControlTowerPage() {
  return <ControlTowerView />;
}
