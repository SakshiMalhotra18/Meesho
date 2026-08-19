'use client';

import Link from 'next/link';
import { SEED_CASES } from '@/data/seed/cases';
import { AlertTriangle, CheckCircle2, Clock, ShieldAlert, ArrowUpRight, Activity, Zap } from 'lucide-react';

export default function ControlTowerView() {
  const openCases = SEED_CASES.length;
  const pendingApproval = SEED_CASES.filter(c => c.status === 'pending_approval' || c.status === 'open').length;
  const highRisk = SEED_CASES.filter(c => c.autonomyTier === 'red' || c.riskScore?.riskLevel === 'high').length;
  const autoResolved = SEED_CASES.filter(c => c.autonomyTier === 'green').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header with gradient accent bar */}
      <div
        style={{
          padding: '28px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #4A0D36 0%, #7A184D 50%, #FF9900 130%)',
          boxShadow: '0 12px 32px rgba(159, 43, 104, 0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-40px',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,153,0,0.35) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Marketplace Operations
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'white', margin: '4px 0 4px' }}>
              Control Tower
            </h1>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.85)' }}>
              Real-time overview of dispute investigations, scale telemetry, and multi-agent execution.
            </p>
          </div>
          <div
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5BFFA3', boxShadow: '0 0 10px #5BFFA3' }} />
            5 AGENTS ONLINE • LIVE STREAM ACTIVE
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {/* Open Disputes */}
        <div className="card" style={{ padding: '20px', background: 'white', borderRadius: '20px', border: '1px solid rgba(159,43,104,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-text-secondary)', fontSize: '0.8125rem', fontWeight: 600 }}>
            Open Disputes
            <Clock size={16} color="var(--color-jamuni)" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-jamuni)', marginTop: '8px' }}>
            {openCases}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
            Active cases needing action
          </div>
          <div style={{ marginTop: '12px', height: '4px', background: '#F8EBF3', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: '70%', height: '100%', background: 'var(--color-jamuni)', borderRadius: '2px' }} />
          </div>
        </div>

        {/* Human Approval */}
        <div className="card" style={{ padding: '20px', background: 'white', borderRadius: '20px', border: '1px solid rgba(255,153,0,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#D47E00', fontSize: '0.8125rem', fontWeight: 600 }}>
            Pending Approval
            <AlertTriangle size={16} color="#FF9900" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FF9900', marginTop: '8px' }}>
            {pendingApproval}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
            Amber & Red tier cases
          </div>
          <div style={{ marginTop: '12px', height: '4px', background: '#FFF4E5', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: '40%', height: '100%', background: '#FF9900', borderRadius: '2px' }} />
          </div>
        </div>

        {/* High Risk */}
        <div className="card" style={{ padding: '20px', background: 'white', borderRadius: '20px', border: '1px solid rgba(217,75,82,0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#D94B52', fontSize: '0.8125rem', fontWeight: 600 }}>
            High Risk Anomalies
            <ShieldAlert size={16} color="#D94B52" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#D94B52', marginTop: '8px' }}>
            {highRisk}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
            Fraud & severe logistics flags
          </div>
          <div style={{ marginTop: '12px', height: '4px', background: '#FCE9EA', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: '25%', height: '100%', background: '#D94B52', borderRadius: '2px' }} />
          </div>
        </div>

        {/* Auto-Resolved */}
        <div className="card" style={{ padding: '20px', background: 'white', borderRadius: '20px', border: '1px solid rgba(32,161,118,0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#20A176', fontSize: '0.8125rem', fontWeight: 600 }}>
            Auto-Resolved
            <CheckCircle2 size={16} color="#20A176" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#20A176', marginTop: '8px' }}>
            {autoResolved}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
            Green tier high confidence
          </div>
          <div style={{ marginTop: '12px', height: '4px', background: '#E6F7F2', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: '85%', height: '100%', background: '#20A176', borderRadius: '2px' }} />
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        {/* Cases Table */}
        <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Active Priority Cases</h2>
            <Link href="/cases" style={{ fontSize: '0.8125rem', color: 'var(--color-jamuni)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              View all <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SEED_CASES.map(c => (
              <Link
                key={c.id}
                href={`/cases/${c.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: '14px',
                  border: '1px solid rgba(159,43,104,0.1)',
                  background: 'var(--color-canvas)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--color-jamuni-light)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(159,43,104,0.25)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--color-canvas)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(159,43,104,0.1)';
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-jamuni)' }}>{c.id}</span>
                    <span className={`badge ${c.autonomyTier === 'green' ? 'badge-green' : c.autonomyTier === 'amber' ? 'badge-amber' : 'badge-red'}`}>
                      {c.autonomyTier}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>₹{c.amount.toLocaleString('en-IN')}</span>
                  </div>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{c.claimDescription}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#FF9900' }}>
                      {Math.round((c.confidence || 0) * 100)}% confidence
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
                      {c.origin} → {c.destination}
                    </div>
                  </div>
                  <ArrowUpRight size={16} color="var(--color-jamuni)" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Live Agent Activity Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            className="card"
            style={{
              padding: '20px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #FAF0F6 0%, #FFF6E8 100%)',
              border: '1px solid rgba(159,43,104,0.12)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={16} color="#FF9900" />
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Live Agent Activity</h3>
              </div>
              <span style={{ fontSize: '0.6875rem', color: '#20A176', fontWeight: 700 }}>● REALTIME</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.8125rem' }}>
              <div style={{ borderLeft: '3px solid var(--color-jamuni)', paddingLeft: '12px', paddingTop: '2px', paddingBottom: '2px' }}>
                <div style={{ fontWeight: 700, color: 'var(--color-jamuni)' }}>Tara — Evidence Agent</div>
                <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>Analyzed MR-39281: Product mismatch confirmed (96%)</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>Just now</div>
              </div>

              <div style={{ borderLeft: '3px solid #4D78FF', paddingLeft: '12px' }}>
                <div style={{ fontWeight: 700, color: '#4D78FF' }}>Raahi — Logistics Agent</div>
                <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>Flagged 131g weight drop at Jaipur hub</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>2 mins ago</div>
              </div>

              <div style={{ borderLeft: '3px solid #FF9900', paddingLeft: '12px' }}>
                <div style={{ fontWeight: 700, color: '#D47E00' }}>Kavach — Risk Agent</div>
                <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>Assessed customer Ananya (12% risk) & seller (8% risk)</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>4 mins ago</div>
              </div>

              <div style={{ borderLeft: '3px solid #20A176', paddingLeft: '12px' }}>
                <div style={{ fontWeight: 700, color: '#20A176' }}>Samadhan — Resolution Synthesizer</div>
                <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>Formulated Policy P-014 outcome: Refund ₹1,299 + Protect Seller</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>5 mins ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
