'use client';

import { useState } from 'react';

const HUBS = [
  { name: 'Surat', role: 'Origin Hub', anomaly: '0.4%', volume: '48,200', x: 100, y: 220 },
  { name: 'Ahmedabad', role: 'Transit Hub', anomaly: '0.6%', volume: '62,100', x: 220, y: 150 },
  { name: 'Jaipur', role: 'Problem Hub (Anomalous)', anomaly: '2.8%', volume: '34,900', x: 380, y: 120, flagged: true },
  { name: 'Delhi', role: 'Destination Hub', anomaly: '0.5%', volume: '91,400', x: 540, y: 90 },
  { name: 'Lucknow', role: 'Regional Hub', anomaly: '0.7%', volume: '29,800', x: 540, y: 220 },
  { name: 'Mumbai', role: 'Major Gateway', anomaly: '0.5%', volume: '112,000', x: 220, y: 320 },
];

export default function NetworkView() {
  const [selectedHub, setSelectedHub] = useState(HUBS[2]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Network Intelligence
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-text-primary)', margin: '4px 0 0' }}>
          Synthetic Logistics Topology
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
        {/* SVG Network Map */}
        <div className="card" style={{ padding: '24px', background: 'var(--color-surface)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, alignSelf: 'flex-start', marginBottom: '16px' }}>Network Node Graph</h3>

          <svg width="640" height="400" style={{ background: 'var(--color-canvas)', borderRadius: 'var(--radius-lg)' }}>
            {/* Lines connecting nodes */}
            <line x1="100" y1="220" x2="220" y2="150" stroke="var(--color-border-strong)" strokeWidth="2" />
            <line x1="220" y1="150" x2="380" y2="120" stroke="var(--color-danger)" strokeWidth="3" strokeDasharray="6 4" />
            <line x1="380" y1="120" x2="540" y2="90" stroke="var(--color-border-strong)" strokeWidth="2" />
            <line x1="220" y1="150" x2="220" y2="320" stroke="var(--color-border-strong)" strokeWidth="2" />
            <line x1="380" y1="120" x2="540" y2="220" stroke="var(--color-border-strong)" strokeWidth="2" />

            {/* Nodes */}
            {HUBS.map(hub => (
              <g key={hub.name} onClick={() => setSelectedHub(hub)} style={{ cursor: 'pointer' }}>
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={hub.flagged ? '16' : '12'}
                  fill={hub.flagged ? 'var(--color-danger-light)' : 'var(--color-surface)'}
                  stroke={hub.flagged ? 'var(--color-danger)' : 'var(--color-ai)'}
                  strokeWidth={hub.name === selectedHub.name ? '4' : '2'}
                />
                <text x={hub.x} y={hub.y + 30} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--color-text-primary)">
                  {hub.name}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Hub detail card */}
        <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', fontWeight: 600 }}>Hub Inspection</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '4px 0 0' }}>{selectedHub.name} Hub</h2>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{selectedHub.role}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', background: 'var(--color-canvas)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>Anomaly Rate</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: selectedHub.flagged ? 'var(--color-danger)' : 'var(--color-success)' }}>
                {selectedHub.anomaly}
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>Network baseline: 0.7%</div>
            </div>

            <div style={{ padding: '12px', background: 'var(--color-canvas)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>Monthly Shipment Volume</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{selectedHub.volume} units</div>
            </div>
          </div>

          {selectedHub.flagged && (
            <div style={{ padding: '12px', background: 'var(--color-danger-light)', border: '1px solid var(--color-danger)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', color: 'var(--color-danger-dark)' }}>
              ⚠️ High weight-drop anomaly rate detected on Ahmedabad–Jaipur segment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

