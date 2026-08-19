import type { Policy } from '@/types';

export const POLICIES: Policy[] = [
  {
    id: 'P-001',
    name: 'Wrong Product — Full Refund',
    description: 'When a customer receives a product different from what was ordered, and dispatch evidence confirms correct product was sent, a full refund is issued and the seller is protected.',
    category: 'wrong_item',
    priority: 1,
    conditions: [
      { field: 'productMismatch', operator: 'eq', value: true },
      { field: 'customerRisk', operator: 'lt', value: 0.4 },
      { field: 'dispatchEvidenceConfirmed', operator: 'eq', value: true },
    ],
    actions: [
      { target: 'customer', action: 'refund', description: 'Issue full refund to customer' },
      { target: 'seller', action: 'protect', description: 'Seller payout protected — not seller fault' },
      { target: 'logistics', action: 'investigate', description: 'Flag logistics segment for investigation' },
    ],
  },
  {
    id: 'P-002',
    name: 'Wrong Product — Seller at Fault',
    description: 'When dispatch evidence shows seller packed the wrong item.',
    category: 'wrong_item',
    priority: 2,
    conditions: [
      { field: 'productMismatch', operator: 'eq', value: true },
      { field: 'sellerPackedWrongItem', operator: 'eq', value: true },
      { field: 'customerRisk', operator: 'lt', value: 0.4 },
    ],
    actions: [
      { target: 'customer', action: 'refund', description: 'Issue full refund to customer' },
      { target: 'seller', action: 'none', description: 'Seller payout not protected — seller at fault' },
      { target: 'system', action: 'escalate', description: 'Flag seller account for review' },
    ],
  },
  {
    id: 'P-003',
    name: 'Damaged Item — Full Refund',
    description: 'When a customer receives a visibly damaged item and photographic evidence confirms damage.',
    category: 'damaged_item',
    priority: 1,
    conditions: [
      { field: 'itemDamaged', operator: 'eq', value: true },
      { field: 'damageEvidenceConfirmed', operator: 'eq', value: true },
      { field: 'customerRisk', operator: 'lt', value: 0.5 },
    ],
    actions: [
      { target: 'customer', action: 'refund', description: 'Issue full refund to customer' },
      { target: 'seller', action: 'protect', description: 'Seller protected if pre-dispatch image confirms undamaged dispatch' },
      { target: 'logistics', action: 'investigate', description: 'Flag logistics for damage investigation' },
    ],
  },
  {
    id: 'P-004',
    name: 'Missing Item — Full Refund',
    description: 'When an ordered item is completely missing from the delivered package.',
    category: 'missing_item',
    priority: 1,
    conditions: [
      { field: 'itemMissing', operator: 'eq', value: true },
      { field: 'customerRisk', operator: 'lt', value: 0.35 },
      { field: 'weightAnomalyDetected', operator: 'eq', value: true },
    ],
    actions: [
      { target: 'customer', action: 'refund', description: 'Issue full refund for missing item' },
      { target: 'seller', action: 'protect', description: 'Seller protected if dispatch weight confirms correct dispatch' },
      { target: 'logistics', action: 'investigate', description: 'Investigate logistics chain for missing item' },
    ],
  },
  {
    id: 'P-005',
    name: 'Fake Return — Reject Refund',
    description: 'When evidence suggests the customer returned a different or damaged item not matching dispatch.',
    category: 'fake_return',
    priority: 1,
    conditions: [
      { field: 'returnProductMismatch', operator: 'eq', value: true },
      { field: 'customerRisk', operator: 'gt', value: 0.6 },
      { field: 'sellerRisk', operator: 'lt', value: 0.3 },
    ],
    actions: [
      { target: 'customer', action: 'reject', description: 'Reject refund request — suspected fake return' },
      { target: 'seller', action: 'protect', description: 'Seller payout protected' },
      { target: 'system', action: 'escalate', description: 'Flag customer account for fraud review' },
    ],
  },
  {
    id: 'P-006',
    name: 'Fake Return — Human Review Required',
    description: 'When return evidence is ambiguous — requires human analyst decision.',
    category: 'fake_return',
    priority: 2,
    conditions: [
      { field: 'returnProductMismatch', operator: 'eq', value: true },
      { field: 'customerRisk', operator: 'gt', value: 0.4 },
      { field: 'customerRisk', operator: 'lt', value: 0.7 },
    ],
    actions: [
      { target: 'system', action: 'escalate', description: 'Escalate to human analyst — ambiguous evidence' },
    ],
  },
  {
    id: 'P-007',
    name: 'Delivery Failure — Re-delivery or Refund',
    description: 'When delivery was not completed and OTP was not verified.',
    category: 'delivery_failure',
    priority: 1,
    conditions: [
      { field: 'deliveryCompleted', operator: 'eq', value: false },
      { field: 'otpVerified', operator: 'eq', value: false },
    ],
    actions: [
      { target: 'customer', action: 'refund', description: 'Issue refund or arrange re-delivery' },
      { target: 'seller', action: 'protect', description: 'Seller protected — delivery partner at fault' },
      { target: 'logistics', action: 'investigate', description: 'Investigate failed delivery attempt' },
    ],
  },
  {
    id: 'P-008',
    name: 'Logistics Anomaly — Weight Mismatch',
    description: 'When package weight drops significantly at a logistics hub indicating potential tampering.',
    category: 'logistics_anomaly',
    priority: 1,
    conditions: [
      { field: 'weightAnomalyDetected', operator: 'eq', value: true },
      { field: 'weightDeltaGrams', operator: 'lt', value: -50 },
    ],
    actions: [
      { target: 'customer', action: 'refund', description: 'Refund customer for logistics tampering' },
      { target: 'seller', action: 'protect', description: 'Protect seller — logistics at fault' },
      { target: 'logistics', action: 'investigate', description: 'Flag specific hub segment for investigation' },
    ],
  },
  {
    id: 'P-009',
    name: 'High Value — Mandatory Human Review',
    description: 'All cases above ₹5,000 require human analyst approval regardless of confidence.',
    category: 'general',
    priority: 0,
    conditions: [
      { field: 'orderValue', operator: 'gt', value: 5000 },
    ],
    actions: [
      { target: 'system', action: 'escalate', description: 'Mandatory human review for high-value orders' },
    ],
  },
  {
    id: 'P-010',
    name: 'High Customer Risk — Human Review',
    description: 'Customers with risk score above 0.75 or 3+ fraud flags require human review.',
    category: 'general',
    priority: 0,
    conditions: [
      { field: 'customerRisk', operator: 'gt', value: 0.75 },
    ],
    actions: [
      { target: 'system', action: 'escalate', description: 'High-risk customer — human review required' },
    ],
  },
  {
    id: 'P-011',
    name: 'Seller Error — Refund with Seller Deduction',
    description: 'When seller packed wrong item with clear dispatch evidence showing seller error.',
    category: 'seller_error',
    priority: 1,
    conditions: [
      { field: 'sellerRisk', operator: 'gt', value: 0.6 },
      { field: 'productMismatch', operator: 'eq', value: true },
    ],
    actions: [
      { target: 'customer', action: 'refund', description: 'Issue full refund to customer' },
      { target: 'seller', action: 'none', description: 'Deduct from seller payout — seller at fault' },
    ],
  },
  {
    id: 'P-012',
    name: 'Ambiguous — Escalate for Investigation',
    description: 'When evidence is insufficient or contradictory, escalate to analyst.',
    category: 'ambiguous',
    priority: 1,
    conditions: [
      { field: 'evidenceConfidence', operator: 'lt', value: 0.7 },
    ],
    actions: [
      { target: 'system', action: 'escalate', description: 'Insufficient evidence — analyst investigation required' },
    ],
  },
  {
    id: 'P-013',
    name: 'Missing Item — Weight Confirms Dispatch',
    description: 'When item is reported missing but dispatch weight matches expected — potential customer fraud.',
    category: 'missing_item',
    priority: 2,
    conditions: [
      { field: 'itemMissing', operator: 'eq', value: true },
      { field: 'weightAnomalyDetected', operator: 'eq', value: false },
      { field: 'customerRisk', operator: 'gt', value: 0.5 },
    ],
    actions: [
      { target: 'system', action: 'escalate', description: 'Suspicious missing item claim — dispatch weight normal' },
    ],
  },
  {
    id: 'P-014',
    name: 'Wrong Product — Logistics Responsible',
    description: 'When weight drops significantly mid-route and customer receives wrong product, logistics is responsible.',
    category: 'wrong_item',
    priority: 1,
    conditions: [
      { field: 'productMismatch', operator: 'eq', value: true },
      { field: 'weightAnomalyDetected', operator: 'eq', value: true },
      { field: 'logisticsRisk', operator: 'gt', value: 0.7 },
    ],
    actions: [
      { target: 'customer', action: 'refund', description: 'Full refund to customer' },
      { target: 'seller', action: 'protect', description: 'Seller payout protected — logistics at fault' },
      { target: 'logistics', action: 'investigate', description: 'Investigate hub segment where anomaly occurred' },
    ],
  },
];

export function getPoliciesForCase(conditions: Record<string, unknown>): Policy[] {
  return POLICIES.filter(policy => {
    return policy.conditions.every(condition => {
      const val = conditions[condition.field];
      if (val === undefined) return false;
      switch (condition.operator) {
        case 'eq': return val === condition.value;
        case 'neq': return val !== condition.value;
        case 'gt': return (val as number) > (condition.value as number);
        case 'lt': return (val as number) < (condition.value as number);
        case 'gte': return (val as number) >= (condition.value as number);
        case 'lte': return (val as number) <= (condition.value as number);
        case 'in': return (condition.value as unknown[]).includes(val);
        case 'contains': return String(val).includes(String(condition.value));
        default: return false;
      }
    });
  }).sort((a, b) => a.priority - b.priority);
}
