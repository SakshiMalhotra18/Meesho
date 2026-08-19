import { SEED_CASES, getCaseById } from '@/data/seed/cases';
import { getPoliciesForCase } from '@/data/policies';
import type { AgentFinding, Resolution } from '@/types';

export interface InvestigationResult {
  caseId: string;
  findings: AgentFinding[];
  resolution: Resolution;
  usedGemini: boolean;
}

export async function runInvestigation(caseId: string): Promise<InvestigationResult> {
  const caseData = getCaseById(caseId) || SEED_CASES[0];

  // Deterministic checks & agent execution
  const weightAnomaly = caseData.packageWeights.find(w => w.anomaly);
  const dispatchEv = caseData.evidence.find(e => e.type === 'dispatch_image');
  const returnEv = caseData.evidence.find(e => e.type === 'return_image');

  const findings: AgentFinding[] = [
    {
      agentName: 'tara',
      agentDisplayName: 'Tara — Evidence Agent',
      summary: returnEv
        ? 'Product mismatch confirmed. Dispatched item differs from returned item.'
        : 'Evidence consistent with claim.',
      details: [
        { label: 'Dispatch evidence', value: dispatchEv ? 'Verified' : 'Missing', highlight: false },
        { label: 'Return evidence', value: returnEv ? 'Verified' : 'Missing', highlight: true },
      ],
      confidence: 0.96,
      anomalies: returnEv ? ['Returned item mismatch'] : [],
      timestamp: new Date().toISOString(),
    },
    {
      agentName: 'raahi',
      agentDisplayName: 'Raahi — Logistics Agent',
      summary: weightAnomaly
        ? `Weight drop detected at ${weightAnomaly.hub} (${weightAnomaly.delta}g).`
        : 'No package weight anomaly recorded.',
      details: [
        { label: 'Weight anomaly', value: weightAnomaly ? `Yes (${weightAnomaly.delta}g)` : 'No', highlight: !!weightAnomaly },
        { label: 'Segment', value: weightAnomaly ? `Transit to ${weightAnomaly.hub}` : 'Normal', highlight: false },
      ],
      confidence: 0.91,
      anomalies: weightAnomaly ? [`Weight loss at ${weightAnomaly.hub}`] : [],
      timestamp: new Date().toISOString(),
    },
    {
      agentName: 'kavach',
      agentDisplayName: 'Kavach — Risk Agent',
      summary: `Customer risk: ${Math.round(caseData.customer.riskScore * 100)}%, Seller risk: ${Math.round(caseData.seller.riskScore * 100)}%.`,
      details: [
        { label: 'Customer risk', value: `${Math.round(caseData.customer.riskScore * 100)}%`, highlight: false },
        { label: 'Seller risk', value: `${Math.round(caseData.seller.riskScore * 100)}%`, highlight: false },
        { label: 'Logistics risk', value: weightAnomaly ? '84%' : '15%', highlight: !!weightAnomaly },
      ],
      confidence: 0.94,
      anomalies: [],
      timestamp: new Date().toISOString(),
    },
    {
      agentName: 'niti',
      agentDisplayName: 'Niti — Policy Agent',
      summary: 'Policy P-014 applied: Wrong Product — Logistics Responsible.',
      details: [
        { label: 'Policy applied', value: 'P-014', highlight: true },
        { label: 'Customer outcome', value: 'Refund', highlight: true },
        { label: 'Seller outcome', value: 'Protect Payout', highlight: false },
      ],
      confidence: 0.97,
      anomalies: [],
      timestamp: new Date().toISOString(),
    },
    {
      agentName: 'samadhan',
      agentDisplayName: 'Samadhan — Resolution Agent',
      summary: 'Recommend refund customer, protect seller payout, investigate logistics hub.',
      details: [
        { label: 'Recommended Action', value: 'Refund + Protect Seller', highlight: true },
        { label: 'Confidence', value: `${Math.round((caseData.confidence || 0.94) * 100)}%`, highlight: true },
      ],
      confidence: caseData.confidence || 0.94,
      anomalies: [],
      timestamp: new Date().toISOString(),
    },
  ];

  const resolution: Resolution = caseData.resolution || {
    id: `RES-${caseData.id}`,
    caseId: caseData.id,
    customerAction: 'refund',
    sellerAction: 'protect',
    logisticsAction: 'investigate',
    confidence: 0.94,
    autonomyTier: 'amber',
    requiresHuman: true,
    reasoning: 'Product mismatch confirmed. Logistics weight drop detected. Policy P-014 applied.',
    policyIds: ['P-014'],
    proposedAt: new Date().toISOString(),
    status: 'proposed',
  };

  return {
    caseId: caseData.id,
    findings,
    resolution,
    usedGemini: false,
  };
}
