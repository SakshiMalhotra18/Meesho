import type { Metadata } from 'next';
import InvestigationView from '@/components/cases/investigation/InvestigationView';

interface Props {
  params: Promise<{ caseId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { caseId } = await params;
  return {
    title: `Case ${caseId} — ResolveAI`,
    description: `AI investigation workspace for case ${caseId}.`,
  };
}

export default async function CasePage({ params }: Props) {
  const { caseId } = await params;
  return <InvestigationView caseId={caseId} />;
}
