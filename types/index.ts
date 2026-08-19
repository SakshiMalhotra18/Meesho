// ============================================================
// ResolveAI — Core TypeScript Domain Interfaces
// ============================================================

// ----- Enums & Literals -----

export type ClaimType =
  | 'wrong_item'
  | 'damaged_item'
  | 'missing_item'
  | 'fake_return'
  | 'delivery_failure'
  | 'seller_error'
  | 'logistics_anomaly'
  | 'ambiguous';

export type CaseStatus =
  | 'open'
  | 'investigating'
  | 'pending_approval'
  | 'escalated'
  | 'resolved'
  | 'closed';

export type ResolutionAction = 'refund' | 'partial_refund' | 'reject' | 'replace' | 'investigate' | 'escalate' | 'protect' | 'none';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type AutonomyTier = 'green' | 'amber' | 'red';

export type AgentStatus = 'idle' | 'working' | 'complete' | 'error';

export type AgentName = 'mira' | 'tara' | 'raahi' | 'kavach' | 'niti' | 'samadhan';

export type HubName = 'Surat' | 'Ahmedabad' | 'Jaipur' | 'Delhi' | 'Lucknow' | 'Mumbai' | 'Pune' | 'Hyderabad' | 'Bangalore' | 'Chennai' | 'Varanasi';

// ----- Customer -----

export interface Customer {
  id: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  orderCount: number;
  returnCount: number;
  fraudFlags: number;
  accountAgeDays: number;
  riskScore: number;
}

// ----- Seller -----

export interface Seller {
  id: string;
  name: string;
  businessName: string;
  city: string;
  state: string;
  gstNumber: string;
  totalOrders: number;
  returnRate: number;
  fraudFlags: number;
  rating: number;
  accountAgeDays: number;
  riskScore: number;
}

// ----- Product -----

export interface Product {
  sku: string;
  name: string;
  category: string;
  brand: string;
  expectedWeightGrams: number;
  value: number;
  imageUrl?: string;
}

// ----- Logistics -----

export interface LogisticsEvent {
  id: string;
  caseId: string;
  hub: HubName;
  timestamp: string; // ISO date
  eventType: 'pickup' | 'in_transit' | 'hub_arrival' | 'hub_departure' | 'out_for_delivery' | 'delivered' | 'return_pickup' | 'return_received';
  weightGrams?: number;
  scannerOperatorId?: string;
  notes?: string;
  anomaly?: boolean;
  anomalyDescription?: string;
}

export interface PackageWeight {
  hub: HubName;
  timestamp: string;
  weightGrams: number;
  expectedGrams: number;
  delta: number;
  anomaly: boolean;
}

export interface LogisticsRoute {
  from: HubName;
  to: HubName;
  shipmentVolume: number;
  returnCount: number;
  abnormalReturns: number;
  weightMismatches: number;
  disputeRate: number;
}

// ----- Evidence -----

export type EvidenceType =
  | 'dispatch_image'
  | 'return_image'
  | 'packaging_image'
  | 'shipment_scan'
  | 'weight_reading'
  | 'delivery_confirmation'
  | 'customer_statement'
  | 'seller_statement'
  | 'otp_record';

export interface Evidence {
  id: string;
  caseId: string;
  type: EvidenceType;
  label: string;
  description: string;
  timestamp: string;
  source: 'customer' | 'seller' | 'logistics' | 'system';
  imageUrl?: string;
  data?: Record<string, unknown>;
  relevanceScore?: number;
  linkedEventIds?: string[];
}

// ----- Risk -----

export interface RiskScore {
  customerRisk: number;   // 0–1
  sellerRisk: number;     // 0–1
  logisticsRisk: number;  // 0–1
  overallRisk: number;    // 0–1
  riskLevel: RiskLevel;
  signals: RiskSignal[];
}

export interface RiskSignal {
  party: 'customer' | 'seller' | 'logistics';
  signal: string;
  weight: number;
  value: string | number;
}

// ----- Policy -----

export interface Policy {
  id: string;
  name: string;
  description: string;
  conditions: PolicyCondition[];
  actions: PolicyAction[];
  priority: number;
  category: ClaimType | 'general';
}

export interface PolicyCondition {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'contains';
  value: unknown;
}

export interface PolicyAction {
  target: 'customer' | 'seller' | 'logistics' | 'system';
  action: ResolutionAction;
  description: string;
}

// ----- Agent System -----

export interface AgentRun {
  id: string;
  caseId: string;
  agentName: AgentName;
  agentDisplayName: string;
  status: AgentStatus;
  startedAt: string;
  completedAt?: string;
  latencyMs?: number;
  input?: Record<string, unknown>;
  output?: AgentFinding;
  error?: string;
  toolsUsed: string[];
  usedGemini: boolean;
}

export interface AgentFinding {
  agentName: AgentName;
  agentDisplayName: string;
  summary: string;
  details: AgentFindingDetail[];
  confidence: number;
  anomalies: string[];
  timestamp: string;
}

export interface AgentFindingDetail {
  label: string;
  value: string | number | boolean;
  highlight?: boolean;
  riskLevel?: RiskLevel;
}

// ----- Resolution -----

export interface Resolution {
  id: string;
  caseId: string;
  customerAction: ResolutionAction;
  sellerAction: ResolutionAction;
  logisticsAction: ResolutionAction;
  confidence: number;
  autonomyTier: AutonomyTier;
  requiresHuman: boolean;
  reasoning: string;
  policyIds: string[];
  proposedAt: string;
  resolvedAt?: string;
  resolvedBy?: string; // 'system' | analyst name
  status: 'proposed' | 'approved' | 'rejected' | 'escalated';
  notes?: string;
}

// ----- Audit -----

export interface AuditEvent {
  id: string;
  caseId: string;
  timestamp: string;
  actor: string; // 'system' | 'mira' | 'tara' | analyst name
  actorType: 'agent' | 'system' | 'human';
  action: string;
  description: string;
  metadata?: Record<string, unknown>;
}

// ----- Case -----

export interface Case {
  id: string;            // MR-XXXXX
  orderId: string;
  claimType: ClaimType;
  claimDescription: string;
  status: CaseStatus;
  customer: Customer;
  seller: Seller;
  product: Product;
  amount: number;
  origin: HubName;
  destination: HubName;
  orderDate: string;
  dispatchDate: string;
  deliveryDate: string;
  returnRequestDate?: string;
  logisticsEvents: LogisticsEvent[];
  packageWeights: PackageWeight[];
  evidence: Evidence[];
  riskScore?: RiskScore;
  agentRuns: AgentRun[];
  agentFindings: AgentFinding[];
  resolution?: Resolution;
  auditLog: AuditEvent[];
  policyIds: string[];
  slaDeadline: string;
  slaRemainingHours: number;
  confidence?: number;
  autonomyTier?: AutonomyTier;
  // Ground truth for evaluation
  groundTruth?: {
    responsibleParty: 'customer' | 'seller' | 'logistics' | 'ambiguous';
    correctCustomerOutcome: ResolutionAction;
    correctSellerOutcome: ResolutionAction;
    escalationRequired: boolean;
    expectedConfidence: 'high' | 'medium' | 'low';
    notes: string;
  };
}

// ----- Analytics -----

export interface AnalyticsCase {
  id: string;
  claimType: ClaimType;
  status: CaseStatus;
  amount: number;
  origin: HubName;
  destination: HubName;
  riskLevel: RiskLevel;
  confidence: number;
  autonomyTier: AutonomyTier;
  resolutionTimeMinutes: number;
  requiresHuman: boolean;
  correctResolution: boolean;
  fraudDetected: boolean;
  policyApplied: string;
  date: string;
}

// ----- Network -----

export interface HubMetrics {
  name: HubName;
  totalShipments: number;
  returnAnomalyRate: number;
  networkBaselineRate: number;
  topAnomalyType: string;
  disputeCount: number;
  resolvedCount: number;
  avgResolutionTimeHours: number;
  coordinates: { x: number; y: number }; // SVG coordinates
}

// ----- Insights / Analytics -----

export interface InsightsMetrics {
  automationRate: number;
  humanReviewRate: number;
  avgResolutionTimeMinutes: number;
  baselineResolutionTimeHours: number;
  fraudDetectionPrecision: number;
  fraudDetectionRecall: number;
  falseAccusationRate: number;
  resolutionAccuracy: number;
  policyViolationRate: number;
  sellerProtectionRate: number;
  estimatedRefundLossesPrevented: number;
  estimatedSellerLossesPrevented: number;
  totalCasesEvaluated: number;
  correctAutomatedResolutions: number;
  escalationAccuracy: number;
}

// ----- UI State -----

export interface UIFilters {
  status?: CaseStatus | 'all';
  claimType?: ClaimType | 'all';
  riskLevel?: RiskLevel | 'all';
  autonomyTier?: AutonomyTier | 'all';
  minAmount?: number;
  maxAmount?: number;
  minConfidence?: number;
  search?: string;
  origin?: HubName | 'all';
  destination?: HubName | 'all';
  slaRisk?: boolean;
  sortBy?: 'sla' | 'amount' | 'risk' | 'confidence' | 'date';
  sortDir?: 'asc' | 'desc';
}

export interface AgentGraphNode {
  id: AgentName;
  displayName: string;
  role: string;
  status: AgentStatus;
  x: number;
  y: number;
  tools: string[];
  lastOutput?: string;
  latencyMs?: number;
}

export interface AgentGraphEdge {
  from: AgentName;
  to: AgentName;
  active: boolean;
  animated: boolean;
}
