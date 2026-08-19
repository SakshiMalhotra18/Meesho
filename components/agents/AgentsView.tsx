'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Play,
  CheckCircle2,
  Zap,
  Shield,
  FileText,
  Scale,
  Sparkles,
  Wrench,
  Brain,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface AgentInfo {
  id: string;
  name: string;
  avatar: string;
  role: string;
  color: string;
  lightColor: string;
  tagline: string;
  desc: string;
  tools: string[];
  sampleReasoning: string;
  modelTier: string;
  avgLatency: string;
}

const AGENTS_LIST: AgentInfo[] = [
  {
    id: 'mira',
    name: 'Mira',
    avatar: '🔮',
    role: 'Supervisor & Orchestrator Agent',
    color: '#7657F6',
    lightColor: '#EEE9FF',
    tagline: 'Orchestrates multi-agent graph & human review triggers',
    desc: 'Coordinates the investigation flow, triggers sub-agents in parallel, computes aggregate confidence scores, and determines if a dispute requires human analyst sign-off.',
    tools: ['orchestrateGraph()', 'evaluateAutonomyTier()', 'triggerHumanEscalation()', 'synthesizeAuditLog()'],
    sampleReasoning: '"Case MR-39281 has 94% aggregate confidence, but financial exposure ₹1,299 under Policy P-014 requires human approval before refund release."',
    modelTier: 'Gemini 2.5 Pro (Supervisor)',
    avgLatency: '420 ms',
  },
  {
    id: 'tara',
    name: 'Tara',
    avatar: '🔍',
    role: 'Product & Evidence Specialist',
    color: '#20A176',
    lightColor: '#E6F7F2',
    tagline: 'Analyzes photo evidence, fabric weaves & SKU matching',
    desc: 'Examines dispatch photos vs return photographs using computer vision heuristics. Verifies serial numbers, fabric patterns, outer box tape condition, and seal authenticity.',
    tools: ['compareProductImages()', 'verifyDispatchSeal()', 'extractLabelData()', 'detectPackagingTampering()'],
    sampleReasoning: '"Seller dispatch photo shows blue embroidered kurta. Customer return photo shows plain white dupatta. Product mismatch confirmed at 96% confidence."',
    modelTier: 'Gemini 2.5 Flash Vision',
    avgLatency: '680 ms',
  },
  {
    id: 'raahi',
    name: 'Raahi',
    avatar: '🚚',
    role: 'Logistics Telemetry Analyst',
    color: '#4D78FF',
    lightColor: '#EBF0FF',
    tagline: 'Reconstructs hub-by-hub package weight history & route anomalies',
    desc: 'Analyzes package scale telemetry across origin, transit hubs, and destination delivery stations. Detects weight drops, scanner operator anomalies, and hub tamper rates.',
    tools: ['getHubScans()', 'calculateWeightDelta()', 'getHubAnomalyRate()', 'verifyOTPLog()'],
    sampleReasoning: '"Package weight dropped by 131g between Ahmedabad and Jaipur hubs. Jaipur Hub anomaly rate is 2.8% vs 0.7% network baseline."',
    modelTier: 'Gemini 2.5 Flash',
    avgLatency: '310 ms',
  },
  {
    id: 'kavach',
    name: 'Kavach',
    avatar: '🛡️',
    role: 'Fraud & Risk Evaluator',
    color: '#F2A63B',
    lightColor: '#FEF4E5',
    tagline: 'Evaluates customer, seller, and logistics segment risk scores',
    desc: 'Computes historical buyer return frequency, seller rating and tenure, and logistics segment dispute history to construct a multi-party risk matrix.',
    tools: ['getCustomerFraudFlags()', 'getSellerDisputeRate()', 'calculateRiskMatrix()', 'detectSyndicateFraud()'],
    sampleReasoning: '"Customer Ananya risk is low (12%, 2 returns in 14 orders). Seller Rakesh risk is low (8%, 4.6 rating). Logistics segment risk is high (84%)."',
    modelTier: 'Gemini 2.5 Flash',
    avgLatency: '240 ms',
  },
  {
    id: 'niti',
    name: 'Niti',
    avatar: '📜',
    role: 'Deterministic Policy Engine',
    color: '#D94B52',
    lightColor: '#FCE9EA',
    tagline: 'Applies explicit marketplace policy rules without LLM hallucination',
    desc: 'Retrieves and matches dispute conditions against structured policy rules (P-001 through P-020). Guarantees exact policy adherence for customer refund and seller protection.',
    tools: ['matchPolicyRules()', 'getPolicyActions()', 'verifyValueCaps()', 'getEscalationCriteria()'],
    sampleReasoning: '"Matched Policy P-014: Wrong Product — Logistics Responsible. Action: Issue Full Refund to Customer, Protect Seller Payout, Investigate Hub."',
    modelTier: 'Deterministic Policy Engine',
    avgLatency: '45 ms',
  },
  {
    id: 'samadhan',
    name: 'Samadhan',
    avatar: '⚖️',
    role: 'Final Resolution Synthesizer',
    color: '#7657F6',
    lightColor: '#EEE9FF',
    tagline: 'Assembles agent findings into confidence-scored resolution',
    desc: 'Synthesizes all agent outputs, verifies policy compliance, formulates customer refund/rejection decisions, seller payout protection, and outputs structured audit trails.',
    tools: ['proposeResolution()', 'calculateConfidenceScore()', 'generateAuditTrail()', 'formatExecutiveSummary()'],
    sampleReasoning: '"Final Proposed Outcome: Full Refund ₹1,299 to Ananya • Seller Rakesh Payout Protected • Jaipur Hub Flagged for Operations Review. Overall Confidence: 94%."',
    modelTier: 'Gemini 2.5 Pro',
    avgLatency: '510 ms',
  },
];

export default function AgentsView() {
  const [hoveredAgent, setHoveredAgent] = useState<AgentInfo | null>(null);
  const [replaying, setReplaying] = useState(false);

  const handleReplay = () => {
    setReplaying(true);
    setTimeout(() => setReplaying(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Agent Architecture & Inspection
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text-primary)', margin: '4px 0 0' }}>
            Agent Control Room
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            Hover over any agent card to greet them 👋 and inspect their active tools, reasoning logs, and model tier.
          </p>
        </div>

        <button
          onClick={handleReplay}
          className="btn btn-ai"
          disabled={replaying}
          style={{ padding: '10px 20px', borderRadius: '9999px', fontWeight: 600, boxShadow: '0 4px 14px rgba(118,87,246,0.3)' }}
        >
          <Play size={16} /> {replaying ? 'Replaying Multi-Agent Graph...' : 'Replay Graph Execution'}
        </button>
      </div>

      {/* Multi-Agent Orchestration Flow Graph Bar */}
      <div
        className="card"
        style={{
          padding: '24px',
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--color-ai)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Multi-Agent Orchestration Sequence</h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
            Hover an agent node below to trigger waving animation 👋
          </span>
        </div>

        {/* Horizontal Node Sequence */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
          {AGENTS_LIST.map((agent, i) => (
            <div key={agent.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
              <div
                onMouseEnter={() => setHoveredAgent(agent)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '16px',
                  border: `2px solid ${hoveredAgent?.id === agent.id ? agent.color : 'var(--color-border)'}`,
                  background: hoveredAgent?.id === agent.id ? agent.lightColor : 'var(--color-canvas)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  minWidth: '125px',
                  transition: 'all 0.2s ease',
                  transform: hoveredAgent?.id === agent.id ? 'translateY(-4px)' : 'none',
                  boxShadow: hoveredAgent?.id === agent.id ? `0 8px 24px ${agent.color}33` : 'none',
                }}
              >
                {/* Waving Emoji Avatar */}
                <div style={{ position: 'relative', display: 'inline-block', fontSize: '2rem', marginBottom: '4px' }}>
                  {agent.avatar}
                  {/* Waving Hand Badge */}
                  <motion.span
                    animate={
                      hoveredAgent?.id === agent.id
                        ? { rotate: [0, 25, -15, 25, 0], scale: [1, 1.2, 1.2, 1] }
                        : { rotate: 0 }
                    }
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-10px',
                      fontSize: '1.125rem',
                      display: hoveredAgent?.id === agent.id ? 'inline-block' : 'none',
                    }}
                  >
                    👋
                  </motion.span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>{agent.name}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', fontWeight: 600 }}>{agent.role.split(' ')[0]}</div>
              </div>

              {i < AGENTS_LIST.length - 1 && (
                <div style={{ color: 'var(--color-text-tertiary)', fontWeight: 800, fontSize: '1.125rem' }}>➔</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Agents Cards Grid with Waving Hover & Interactive Box Popover */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {AGENTS_LIST.map((agent) => {
          const isHovered = hoveredAgent?.id === agent.id;
          return (
            <motion.div
              key={agent.id}
              onMouseEnter={() => setHoveredAgent(agent)}
              onMouseLeave={() => setHoveredAgent(null)}
              whileHover={{ y: -4 }}
              className="card"
              style={{
                padding: '24px',
                background: 'white',
                borderRadius: '24px',
                border: `2px solid ${isHovered ? agent.color : 'var(--color-border)'}`,
                boxShadow: isHovered ? `0 16px 40px ${agent.color}25` : 'var(--shadow-sm)',
                transition: 'border 0.2s ease, box-shadow 0.2s ease',
                position: 'relative',
              }}
            >
              {/* Top Row: Avatar + Title */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ position: 'relative' }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: '16px',
                        background: agent.lightColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        border: `1px solid ${agent.color}40`,
                      }}
                    >
                      {agent.avatar}
                    </div>

                    {/* Waving Hand 👋 */}
                    <motion.div
                      animate={
                        isHovered
                          ? { rotate: [0, 30, -15, 30, 0], scale: [1, 1.25, 1.25, 1] }
                          : { rotate: 0 }
                      }
                      transition={{ repeat: Infinity, duration: 0.6 }}
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        fontSize: '1.25rem',
                        display: isHovered ? 'block' : 'none',
                      }}
                    >
                      👋
                    </motion.div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{agent.name}</h3>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: agent.color }}>{agent.role}</div>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    background: agent.lightColor,
                    color: agent.color,
                    textTransform: 'uppercase',
                  }}
                >
                  {agent.avgLatency}
                </span>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                {agent.desc}
              </p>

              {/* Interactive Tooltip Popover Box when Hovered */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      background: agent.lightColor,
                      border: `1px solid ${agent.color}60`,
                      borderRadius: '16px',
                      padding: '16px',
                      overflow: 'hidden',
                      marginTop: '12px',
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: agent.color, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      👋 &quot;Hi! I am {agent.name}. Here are my specialized tools:&quot;
                    </div>

                    {/* Tools Chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                      {agent.tools.map(tool => (
                        <span
                          key={tool}
                          style={{
                            fontSize: '0.6875rem',
                            fontFamily: 'monospace',
                            fontWeight: 600,
                            background: 'white',
                            color: 'var(--color-text-primary)',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            border: '1px solid rgba(24,24,23,0.1)',
                          }}
                        >
                          🛠️ {tool}
                        </span>
                      ))}
                    </div>

                    {/* Sample Reasoning Output */}
                    <div style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--color-text-primary)', background: 'white', padding: '10px 12px', borderRadius: '10px', borderLeft: `3px solid ${agent.color}` }}>
                      {agent.sampleReasoning}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
