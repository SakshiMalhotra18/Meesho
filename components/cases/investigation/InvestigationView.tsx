'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getCaseById } from '@/data/seed/cases';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, ShieldAlert, Sparkles, Scale } from 'lucide-react';

export default function InvestigationView({ caseId }: { caseId: string }) {
  const caseData = getCaseById(caseId) || getCaseById('MR-39281')!;
  const [selectedEvent, setSelectedEvent] = useState(caseData.logisticsEvents[3]?.id || caseData.logisticsEvents[0]?.id);
  const [statusAction, setStatusAction] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Back button & Header */}
      <div>
        <Link href="/cases" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', textDecoration: 'none', marginBottom: '8px' }}>
          <ArrowLeft size={14} /> Back to cases
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Case {caseData.id}
              </h1>
              <span className={`badge ${caseData.autonomyTier === 'green' ? 'badge-green' : caseData.autonomyTier === 'amber' ? 'badge-amber' : 'badge-red'}`}>
                {caseData.autonomyTier} tier
              </span>
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', marginTop: '4px' }}>
              {caseData.claimDescription}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--color-surface)', padding: '12px 18px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>Order Value</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>₹{caseData.amount.toLocaleString('en-IN')}</div>
            </div>
            <div style={{ height: '24px', width: '1px', background: 'var(--color-border)' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>AI Confidence</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-ai)' }}>
                {Math.round((caseData.confidence || 0) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 340px', gap: '20px' }}>
        {/* Left: Timeline */}
        <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Parcel Journey
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            {caseData.logisticsEvents.map((evt, idx) => (
              <div
                key={evt.id}
                onClick={() => setSelectedEvent(evt.id)}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-md)',
                  border: evt.id === selectedEvent ? '2px solid var(--color-ai)' : '1px solid var(--color-border)',
                  background: evt.anomaly ? 'var(--color-warning-light)' : evt.id === selectedEvent ? 'var(--color-ai-light)' : 'var(--color-surface)',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>{evt.hub}</span>
                  {evt.weightGrams && <span style={{ color: evt.anomaly ? 'var(--color-danger)' : 'var(--color-text-secondary)' }}>{evt.weightGrams} g</span>}
                </div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', marginTop: '2px' }}>
                  {evt.eventType.replace('_', ' ')}
                </div>
                {evt.anomalyDescription && (
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-danger)', marginTop: '4px', fontWeight: 500 }}>
                    ⚠️ {evt.anomalyDescription}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center: Parcel visual & Evidence */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Parcel State */}
          <div className="card" style={{ padding: '20px', background: 'white' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '12px' }}>Interactive Parcel Inspector</h3>
            <div style={{ background: 'var(--color-canvas)', padding: '24px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📦</div>
              <div style={{ fontWeight: 600 }}>{caseData.product.name}</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                SKU: {caseData.product.sku} | Expected: {caseData.product.expectedWeightGrams}g
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px' }}>
                <div style={{ padding: '8px 16px', background: 'white', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>Dispatch Weight</div>
                  <div style={{ fontWeight: 700 }}>642 g</div>
                </div>
                <div style={{ padding: '8px 16px', background: 'var(--color-danger-light)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-danger)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-danger-dark)' }}>Jaipur Hub Weight</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-danger-dark)' }}>511 g (-131g)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence Board */}
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '12px' }}>Evidence Board</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {caseData.evidence.map(ev => (
                <div key={ev.id} style={{ padding: '12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface-2)' }}>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-ai)', textTransform: 'uppercase' }}>
                    {ev.source}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.8125rem', marginTop: '2px' }}>{ev.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                    {ev.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Agent Findings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Sparkles size={16} color="var(--color-ai)" />
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }}>Agent Findings</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {caseData.agentFindings.map(f => (
                <div key={f.agentName} style={{ padding: '12px', background: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-ai)' }}>
                    {f.agentDisplayName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                    {f.summary}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Resolution Panel */}
      <div
        className="card"
        style={{
          padding: '16px 24px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-ai)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-ai)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            AI Resolution Recommendation ({Math.round((caseData.confidence || 0) * 100)}% Confidence)
          </div>
          <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginTop: '2px' }}>
            Refund Customer (₹1,299) • Protect Seller Payout • Investigate Jaipur Hub
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {statusAction ? (
            <div style={{ fontWeight: 600, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={16} /> Decision applied: {statusAction}
            </div>
          ) : (
            <>
              <button onClick={() => setStatusAction('Escalated')} className="btn btn-ghost">
                Escalate
              </button>
              <button onClick={() => setStatusAction('Approved')} className="btn btn-ai">
                Approve Recommendation
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
