'use client';

import Link from 'next/link';
import { SEED_CASES } from '@/data/seed/cases';
import { AlertTriangle, CheckCircle2, Clock, ShieldAlert, ArrowUpRight, Activity } from 'lucide-react';

export default function ControlTowerView() {
  const openCases = SEED_CASES.length;
  const pendingApproval = SEED_CASES.filter(c => c.status === 'pending_approval' || c.status === 'open').length;
  const highRisk = SEED_CASES.filter(c => c.autonomyTier === 'red' || c.riskScore?.riskLevel === 'high').length;
  const autoResolved = SEED_CASES.filter(c => c.autonomyTier === 'green').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Marketplace Operations
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-text-primary)', margin: '4px 0 0' }}>
          Control Tower
        </h1>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-text-secondary)', fontSize: '0.8125rem', fontWeight: 500 }}>
            Open Disputes
            <Clock size={16} color="var(--color-text-tertiary)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '8px' }}>
            {openCases}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
            Active cases needing action
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-warning-dark)', fontSize: '0.8125rem', fontWeight: 500 }}>
            Human Approval Needed
            <AlertTriangle size={16} color="var(--color-warning)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-warning-dark)', marginTop: '8px' }}>
            {pendingApproval}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
            Amber & Red tier cases
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-danger)', fontSize: '0.8125rem', fontWeight: 500 }}>
            High Risk Anomalies
            <ShieldAlert size={16} color="var(--color-danger)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-danger)', marginTop: '8px' }}>
            {highRisk}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
            Fraud & severe logistics flags
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-success)', fontSize: '0.8125rem', fontWeight: 500 }}>
            Auto-Resolved
            <CheckCircle2 size={16} color="var(--color-success)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-success)', marginTop: '8px' }}>
            {autoResolved}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
            Green tier high confidence
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        {/* Cases Table */}
        <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Active Priority Cases</h2>
            <Link href="/cases" style={{ fontSize: '0.8125rem', color: 'var(--color-ai)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              View all cases <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {SEED_CASES.map(c => (
              <Link
                key={c.id}
                href={`/cases/${c.id}`}
                className="card-hover"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{c.id}</span>
                    <span className={`badge ${c.autonomyTier === 'green' ? 'badge-green' : c.autonomyTier === 'amber' ? 'badge-amber' : 'badge-red'}`}>
                      {c.autonomyTier}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>₹{c.amount.toLocaleString('en-IN')}</span>
                  </div>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{c.claimDescription}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-ai)' }}>
                      {Math.round((c.confidence || 0) * 100)}% confidence
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
                      {c.origin} → {c.destination}
                    </div>
                  </div>
                  <ArrowUpRight size={16} color="var(--color-text-tertiary)" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Live Stream / Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Activity size={16} color="var(--color-ai)" />
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }}>Live Agent Activity</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.8125rem' }}>
              <div style={{ borderLeft: '2px solid var(--color-ai)', paddingLeft: '10px' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Tara — Evidence Agent</div>
                <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>Analyzed MR-39281: Product mismatch confirmed (96%)</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>Just now</div>
              </div>

              <div style={{ borderLeft: '2px solid var(--color-logistics)', paddingLeft: '10px' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Raahi — Logistics Agent</div>
                <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>Flagged 131g weight drop at Jaipur hub</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>2 mins ago</div>
              </div>

              <div style={{ borderLeft: '2px solid var(--color-warning)', paddingLeft: '10px' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Kavach — Risk Agent</div>
                <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>Assessed customer Ananya (12% risk) & seller (8% risk)</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>4 mins ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
