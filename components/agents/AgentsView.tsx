'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Play,
  Zap,
  ArrowRight,
  Shield,
  FileText,
  Truck,
  Scale,
  CheckCircle2,
  Brain,
  Wrench,
} from 'lucide-react';

interface AgentInfo {
  id: string;
  name: string;
  avatar: string;
  role: string;
  color: string;
  lightColor: string;
  glowColor: string;
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
    color: '#FF9900', // Aam Gold
    lightColor: 'rgba(255, 153, 0, 0.15)',
    glowColor: 'rgba(255, 153, 0, 0.4)',
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
    lightColor: 'rgba(32, 161, 118, 0.15)',
    glowColor: 'rgba(32, 161, 118, 0.4)',
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
    lightColor: 'rgba(77, 120, 255, 0.15)',
    glowColor: 'rgba(77, 120, 255, 0.4)',
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
    color: '#FF9900', // Aam Gold
    lightColor: 'rgba(255, 153, 0, 0.15)',
    glowColor: 'rgba(255, 153, 0, 0.4)',
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
    lightColor: 'rgba(217, 75, 82, 0.15)',
    glowColor: 'rgba(217, 75, 82, 0.4)',
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
    color: '#9E7AFF',
    lightColor: 'rgba(158, 122, 255, 0.15)',
    glowColor: 'rgba(158, 122, 255, 0.4)',
    tagline: 'Assembles agent findings into confidence-scored resolution',
    desc: 'Synthesizes all agent outputs, verifies policy compliance, formulates customer refund/rejection decisions, seller payout protection, and outputs structured audit trails.',
    tools: ['proposeResolution()', 'calculateConfidenceScore()', 'generateAuditTrail()', 'formatExecutiveSummary()'],
    sampleReasoning: '"Final Proposed Outcome: Full Refund ₹1,299 to Ananya • Seller Rakesh Payout Protected • Jaipur Hub Flagged for Operations Review. Overall Confidence: 94%."',
    modelTier: 'Gemini 2.5 Pro',
    avgLatency: '510 ms',
  },
];

export default function AgentsView() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [replaying, setReplaying] = useState(false);

  const handleReplay = () => {
    setReplaying(true);
    setTimeout(() => setReplaying(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-jamuni)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Meesho Dispute Intelligence • Jamuni & Aam Brand Theme
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--color-text-primary)', margin: '4px 0 0' }}>
            Agent Control Room
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            Hover directly over any agent card below to greet them 👋 and expand their active system tools & live reasoning logs.
          </p>
        </div>

        <button
          onClick={handleReplay}
          className="btn btn-primary"
          disabled={replaying}
          style={{
            padding: '10px 24px',
            borderRadius: '9999px',
            fontWeight: 700,
          }}
        >
          <Play size={16} /> {replaying ? 'Executing Multi-Agent Graph...' : 'Replay Graph Execution'}
        </button>
      </div>

      {/* Vibrant Jamuni + Aam Gradient Mesh Canvas Container */}
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #4A0D36 0%, #7A184D 45%, #9F2B68 75%, #D47E00 100%)',
          borderRadius: '32px',
          padding: '32px',
          boxShadow: '0 20px 50px rgba(159, 43, 104, 0.3)',
          border: '1px solid rgba(255, 153, 0, 0.3)',
          overflow: 'hidden',
        }}
      >
        {/* Glowing Aam Mango Radial Orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,153,0,0.35) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            left: '-80px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(118,87,246,0.3) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* SECTION 1: Pure Visual Orchestration Sequence Bar (Static Workflow Diagram) */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={18} color="#FF9900" />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>
                Multi-Agent Orchestration Sequence
              </h3>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FF9900', background: 'rgba(255,153,0,0.2)', padding: '4px 12px', borderRadius: '9999px', border: '1px solid rgba(255,153,0,0.3)' }}>
              Sequential DAG Execution
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', overflowX: 'auto', padding: '12px 4px' }}>
            {AGENTS_LIST.map((agent, i) => (
              <div key={agent.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    textAlign: 'center',
                    minWidth: '130px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '4px' }}>{agent.avatar}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'white' }}>{agent.name}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.7)', marginTop: '2px', fontWeight: 600 }}>{agent.role.split(' ')[0]}</div>
                </div>

                {i < AGENTS_LIST.length - 1 && (
                  <div style={{ color: '#FF9900', fontWeight: 800, fontSize: '1.25rem' }}>➔</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Interactive Agent Cards (HOVER HERE to trigger Waving 👋 & Tools Drawer) */}
        <div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px' }}>
            Hover directly over any agent card below to greet 👋
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '20px' }}>
            {AGENTS_LIST.map((agent) => {
              const isHovered = hoveredCardId === agent.id;
              return (
                <motion.div
                  key={agent.id}
                  onMouseEnter={() => setHoveredCardId(agent.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  whileHover={{ y: -6 }}
                  style={{
                    padding: '24px',
                    background: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    border: `1.5px solid ${isHovered ? '#FF9900' : 'rgba(255, 255, 255, 0.2)'}`,
                    boxShadow: isHovered ? '0 16px 40px rgba(255, 153, 0, 0.35)' : '0 6px 24px rgba(0,0,0,0.15)',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  {/* Top Avatar + Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ position: 'relative' }}>
                        <div
                          style={{
                            width: 54,
                            height: 54,
                            borderRadius: '16px',
                            background: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2.25rem',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                          }}
                        >
                          {agent.avatar}
                        </div>

                        {/* Waving Hand 👋 Animation ONLY on Card Hover */}
                        <motion.div
                          animate={
                            isHovered
                              ? { rotate: [0, 30, -15, 30, 0], scale: [1, 1.3, 1.3, 1] }
                              : { rotate: 0 }
                          }
                          transition={{ repeat: Infinity, duration: 0.6 }}
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            fontSize: '1.35rem',
                            display: isHovered ? 'block' : 'none',
                          }}
                        >
                          👋
                        </motion.div>
                      </div>

                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>{agent.name}</h3>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FF9900' }}>{agent.role}</div>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        background: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.3)',
                      }}
                    >
                      {agent.avgLatency}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, marginBottom: '16px' }}>
                    {agent.desc}
                  </p>

                  {/* Tools & Reasoning Drawer (Expands ONLY when Card is Hovered) */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          background: 'rgba(31, 8, 23, 0.75)',
                          border: '1px solid rgba(255, 153, 0, 0.5)',
                          borderRadius: '16px',
                          padding: '16px',
                          overflow: 'hidden',
                          marginTop: '12px',
                        }}
                      >
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FF9900', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                          👋 &quot;Hi! I am {agent.name}. My active tools & telemetry:&quot;
                        </div>

                        {/* Tools list */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                          {agent.tools.map(tool => (
                            <span
                              key={tool}
                              style={{
                                fontSize: '0.6875rem',
                                fontFamily: 'monospace',
                                fontWeight: 600,
                                background: 'white',
                                color: '#1F0817',
                                padding: '3px 8px',
                                borderRadius: '6px',
                              }}
                            >
                              🛠️ {tool}
                            </span>
                          ))}
                        </div>

                        {/* Sample reasoning log */}
                        <div
                          style={{
                            fontSize: '0.75rem',
                            fontStyle: 'italic',
                            color: 'white',
                            background: 'rgba(255,255,255,0.1)',
                            padding: '10px 12px',
                            borderRadius: '10px',
                            borderLeft: '3px solid #FF9900',
                          }}
                        >
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
      </div>
    </div>
  );
}
