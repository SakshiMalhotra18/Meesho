'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const METRICS_DATA = [
  { name: 'Wrong Item', auto: 84, manual: 16 },
  { name: 'Damaged Item', auto: 92, manual: 8 },
  { name: 'Missing Item', auto: 88, manual: 12 },
  { name: 'Fake Return', auto: 45, manual: 55 },
  { name: 'Delivery Failure', auto: 78, manual: 22 },
];

export default function InsightsView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Product Evaluation
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-text-primary)', margin: '4px 0 0' }}>
          Insights & AI Performance Metrics
        </h1>
      </div>

      {/* Overview stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Automation Rate</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-ai)', marginTop: '4px' }}>76.4%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>Resolved without human intervention</div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Resolution Time</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-success)', marginTop: '4px' }}>4.2 min</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>Vs 18 hrs human baseline</div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>False Accusation Rate</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-success)', marginTop: '4px' }}>0.2%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>Safety metric target &lt; 0.5%</div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Prevented Fraud Loss</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '4px' }}>₹14.8L</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>Simulated quarterly savings</div>
        </div>
      </div>

      {/* Chart */}
      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '20px' }}>Automation Rate by Claim Category (%)</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={METRICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-text-tertiary)" fontSize={12} />
              <YAxis stroke="var(--color-text-tertiary)" fontSize={12} />
              <Tooltip />
              <Bar dataKey="auto" fill="var(--color-ai)" name="Auto Resolved (%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="manual" fill="var(--color-warning)" name="Human Review (%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ padding: '12px 16px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
        Simulated results based on synthetic marketplace data. Independent concept prototype not affiliated with Meesho.
      </div>
    </div>
  );
}
