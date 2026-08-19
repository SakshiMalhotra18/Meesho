import type { Metadata } from 'next';
import NetworkView from '@/components/network/NetworkView';

export const metadata: Metadata = {
  title: 'Logistics Network — ResolveAI',
  description: 'Explore the synthetic logistics network and identify systemic anomalies.',
};

export default function NetworkPage() {
  return <NetworkView />;
}
