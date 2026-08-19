'use client';

import { useState } from 'react';
import { Bot, Play, CheckCircle2, Zap, Shield, FileText, Scale } from 'lucide-react';

export default function AgentsView() {
  const [replaying, setReplaying] = useState(false);

  const handleReplay = () => {
    setReplaying(true);
    setTimeout(() => setReplaying(false), 3000);
  };

  const AGENTS = [
    { name: 'Mira', title: 'Supervisor Agent', icon: Zap, color: 'var(--color-ai)', desc: 'Coordinates overall investigation and human escalation triggers.' },
    { name: 'Tara', title: 'Evidence Agent', icon: FileText, color: '#20A176', desc: 'Examines product imagery, dispatch evidence, and return item consistency.' },
    { name: 'Raahi', title: 'Logistics Agent', icon: Bot, color: '#4D78FF', desc: 'Reconstructs parcel journey across hubs and flags weight variances.' },
    { name: 'Kavach', title: 'Risk Agent', icon: Shield, color: '#F2A63B', desc: 'Evaluates customer, seller, and logistics risk history and fraud patterns.' },
    { name: 'Niti', title: 'Policy Agent', icon: Scale, color: '#D94B52', desc: 'Matches explicit marketplace policies without LLM hallucination.' },
    { name: 'Samadhan', title: 'Resolution Agent', icon: CheckCircle2, color: 'var(--color-ai)', desc: 'Assembles evidence and policy to produce confidence-scored resolution.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Agent Architecture
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-text-primary)', margin: '4px 0 0' }}>
            Agent Control Room
          </h1>
        </div>

        <button onClick={handleReplay} className="btn btn-ai" disabled={replaying}>
          <Play size={16} /> {replaying ? 'Replaying Multi-Agent Graph...' : 'Replay Investigation'}
        </button>
      </div>

      {/* Graph Visualizer Card */}
      <div className="card" style={{ padding: '24px', background: 'var(--color-surface)', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px' }}>Multi-Agent Orchestration Graph</h3>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap', opacity: replaying ? 0.7 : 1, transition: 'opacity 0.3s' }}>
          {AGENTS.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <div key={agent.name} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '16px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'var(--color-canvas)', width: '130px', textAlign: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: agent.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                    <Icon size={18} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{agent.name}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)' }}>{agent.title}</div>
                </div>
                {i < AGENTS.length - 1 && <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 'bold' }}>→</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Agents Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {AGENTS.map(agent => {
          const Icon = agent.icon;
          return (
            <div key={agent.name} className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: agent.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{agent.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>{agent.title}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                {agent.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
