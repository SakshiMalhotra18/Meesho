'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getCaseById } from '@/data/seed/cases';
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  ShieldAlert,
  Building2,
  Truck,
  UserCheck,
  Camera,
  FileText,
  ShieldCheck,
  Scale,
  Maximize2,
  X,
} from 'lucide-react';

export default function InvestigationView({ caseId }: { caseId: string }) {
  const caseData = getCaseById(caseId) || getCaseById('MR-39281')!;
  const [selectedEventId, setSelectedEventId] = useState(caseData.logisticsEvents?.[0]?.id || 'EVT-001');
  const [activeTab, setActiveTab] = useState<'evidence' | 'timeline' | 'risk'>('evidence');
  const [statusAction, setStatusAction] = useState<string | null>(null);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const selectedEvent = caseData.logisticsEvents?.find(e => e.id === selectedEventId) || caseData.logisticsEvents?.[0] || {
    id: 'EVT-FALLBACK',
    hub: caseData.origin || 'Origin',
    eventType: 'pickup',
    weightGrams: caseData.product?.expectedWeightGrams || 620,
    anomaly: false,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Breadcrumb & Action Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <Link
          href="/cases"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8125rem',
            color: 'var(--color-text-secondary)',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={14} /> Back to case queue
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>SLA Deadline:</span>
          <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>
            {caseData.slaRemainingHours} hours remaining
          </span>
        </div>
      </div>

      {/* Case Overview Header Card */}
      <div
        className="card"
        style={{
          padding: '24px',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F9F8F6 100%)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}>
                Case {caseData.id}
              </h1>
              <span className={`badge ${caseData.autonomyTier === 'green' ? 'badge-green' : caseData.autonomyTier === 'amber' ? 'badge-amber' : 'badge-red'}`}>
                {caseData.autonomyTier} tier • Human Approval Required
              </span>
              <span className="badge badge-ai">
                Claim: {caseData.claimType.replace('_', ' ')}
              </span>
            </div>

            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', marginTop: '8px', maxWidth: '750px', lineHeight: 1.5 }}>
              &quot;{caseData.claimDescription}&quot;
            </p>
          </div>

          {/* Key Metric Indicators */}
          <div style={{ display: 'flex', gap: '16px', background: 'var(--color-surface)', padding: '14px 20px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)' }}>
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>Order Amount</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                ₹{caseData.amount.toLocaleString('en-IN')}
              </div>
            </div>
            <div style={{ width: '1px', background: 'var(--color-border)' }} />
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>AI Confidence</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-ai)', marginTop: '2px' }}>
                {Math.round((caseData.confidence || 0) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3 Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 340px', gap: '20px' }}>
        {/* LEFT COLUMN: Interactive Parcel Journey Stages */}
        <div className="card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Parcel Telemetry Stages
            </h3>
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-ai)', fontWeight: 600 }}>Click Stage</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {caseData.logisticsEvents.map((evt) => {
              const isSelected = evt.id === selectedEventId;
              return (
                <button
                  key={evt.id}
                  onClick={() => setSelectedEventId(evt.id)}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${isSelected ? 'var(--color-ai)' : evt.anomaly ? 'var(--color-danger)' : 'var(--color-border)'}`,
                    background: evt.anomaly ? 'var(--color-danger-light)' : isSelected ? 'var(--color-ai-light)' : 'var(--color-surface)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 12px rgba(118,87,246,0.15)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem', color: evt.anomaly ? 'var(--color-danger-dark)' : 'var(--color-text-primary)' }}>
                      {evt.hub}
                    </span>
                    {evt.weightGrams && (
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: evt.anomaly ? 'var(--color-danger)' : 'var(--color-text-secondary)',
                          background: evt.anomaly ? '#FCE9EA' : 'var(--color-canvas)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        {evt.weightGrams} g
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px', textTransform: 'capitalize' }}>
                    {evt.eventType.replace('_', ' ')}
                  </div>

                  {evt.anomaly && (
                    <div style={{ fontSize: '0.6875rem', color: 'var(--color-danger)', fontWeight: 700, marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      ⚠️ {evt.anomalyDescription || 'Weight anomaly recorded'}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CENTER COLUMN: Interactive 3D Package Inspector & Evidence Board */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Central Interactive Package Visualizer Card */}
          <div
            className="card"
            style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #181817 0%, #1e1b2e 100%)',
              color: 'white',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-ai" style={{ background: '#7657F6', color: 'white' }}>
                  Stage Inspector
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                  {selectedEvent.hub} • {selectedEvent.eventType.replace('_', ' ')}
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>SKU: {caseData.product.sku}</span>
            </div>

            {/* Visual Box Rendering */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <motion.div
                  key={selectedEvent.id}
                  initial={{ scale: 0.8, rotate: -5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  style={{ fontSize: '4rem', marginBottom: '8px' }}
                >
                  📦
                </motion.div>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{caseData.product.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                  Expected Standard: {caseData.product.expectedWeightGrams} g
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.6)' }}>Scan Weight at {selectedEvent.hub}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: selectedEvent.anomaly ? '#D94B52' : '#20A176' }}>
                    {selectedEvent.weightGrams ? `${selectedEvent.weightGrams} g` : 'N/A'}
                  </div>
                </div>

                <div style={{ padding: '12px', background: selectedEvent.anomaly ? 'rgba(217,75,82,0.2)' : 'rgba(255,255,255,0.08)', borderRadius: '12px', border: selectedEvent.anomaly ? '1px solid #D94B52' : 'none' }}>
                  <div style={{ fontSize: '0.6875rem', color: selectedEvent.anomaly ? '#FCE9EA' : 'rgba(255,255,255,0.6)' }}>Weight Variance Delta</div>
                  <div style={{ fontSize: '1.125rem', fontWeight: 800, color: selectedEvent.anomaly ? '#D94B52' : 'white' }}>
                    {selectedEvent.anomaly ? '-131 g (CRITICAL DROP)' : '0 g (NORMAL)'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence Board with Zoom Preview */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Dispute Evidence Board</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>{caseData.evidence.length} Artifacts Verified</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {caseData.evidence.map(ev => (
                <div
                  key={ev.id}
                  onClick={() => setZoomImage(ev.label)}
                  style={{
                    padding: '14px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--color-surface-2)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span className={`badge ${ev.source === 'seller' ? 'badge-green' : ev.source === 'customer' ? 'badge-accent' : 'badge-logistics'}`}>
                      {ev.source}
                    </span>
                    <Maximize2 size={12} color="var(--color-text-tertiary)" />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>{ev.label}</div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                    {ev.description}
                  </p>
                  <div style={{ marginTop: '8px', fontSize: '0.6875rem', color: 'var(--color-ai)', fontWeight: 600 }}>
                    Relevance Score: {Math.round((ev.relevanceScore || 0.9) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Structured Agent Findings & Risk Meters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Party Risk Gauge Card */}
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', marginBottom: '14px' }}>
              Party Risk Evaluation
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '4px' }}>
                  <span>Customer Risk (Ananya)</span>
                  <span style={{ color: 'var(--color-success)' }}>12% (Low)</span>
                </div>
                <div style={{ height: '6px', background: 'var(--color-surface-3)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: '12%', height: '100%', background: 'var(--color-success)' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '4px' }}>
                  <span>Seller Risk (Rakesh)</span>
                  <span style={{ color: 'var(--color-success)' }}>8% (Low)</span>
                </div>
                <div style={{ height: '6px', background: 'var(--color-surface-3)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: '8%', height: '100%', background: 'var(--color-success)' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '4px' }}>
                  <span>Logistics Risk (Jaipur Segment)</span>
                  <span style={{ color: 'var(--color-danger)' }}>84% (Critical)</span>
                </div>
                <div style={{ height: '6px', background: 'var(--color-surface-3)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: '84%', height: '100%', background: 'var(--color-danger)' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Agent Findings Stream */}
          <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Sparkles size={16} color="var(--color-ai)" />
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Agent Findings</h3>
            </div>

            {caseData.agentFindings.map(f => (
              <div key={f.agentName} style={{ padding: '12px', background: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--color-ai)' }}>
                  {f.agentDisplayName}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                  {f.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Action Resolution Panel at Bottom */}
      <div
        className="card"
        style={{
          position: 'sticky',
          bottom: '20px',
          padding: '16px 24px',
          background: 'white',
          border: '2px solid var(--color-ai)',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 'var(--radius-xl)',
          zIndex: 100,
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-ai)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            AI Proposed Resolution • Policy P-014 Matched ({Math.round((caseData.confidence || 0.94) * 100)}% Confidence)
          </div>
          <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '2px', color: 'var(--color-text-primary)' }}>
            Refund Customer (₹1,299) • Protect Seller Payout • Flag Jaipur Hub Segment
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {statusAction ? (
            <div style={{ fontWeight: 700, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={18} /> Decision Applied: {statusAction}
            </div>
          ) : (
            <>
              <button onClick={() => setStatusAction('Escalated to Fraud Team')} className="btn btn-ghost">
                Escalate
              </button>
              <button onClick={() => setStatusAction('Approved')} className="btn btn-ai" style={{ padding: '10px 24px', fontWeight: 700 }}>
                Approve AI Resolution
              </button>
            </>
          )}
        </div>
      </div>

      {/* Evidence Zoom Modal */}
      {zoomImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setZoomImage(null)}
        >
          <div style={{ background: 'white', padding: '24px', borderRadius: '20px', maxWidth: '450px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '12px' }}>{zoomImage}</h3>
            <div style={{ height: '180px', background: '#F7F6F2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
              📄🔍
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#6D6964', marginTop: '12px' }}>
              Digital signature and telemetry timestamp verified by ResolveAI Evidence Agent.
            </p>
            <button onClick={() => setZoomImage(null)} className="btn btn-sm btn-ghost" style={{ marginTop: '16px' }}>
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
