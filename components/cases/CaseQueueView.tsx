'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SEED_CASES } from '@/data/seed/cases';
import { Search, Filter, ArrowUpRight } from 'lucide-react';

export default function CaseQueueView() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredCases = SEED_CASES.filter(c => {
    if (filter !== 'all' && c.autonomyTier !== filter && c.status !== filter) return false;
    if (search && !c.id.toLowerCase().includes(search.toLowerCase()) && !c.customer.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Operations Dashboard
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text-primary)', margin: '4px 0 0' }}>
          Dispute Case Queue
        </h1>
      </div>

      {/* Filters & Search bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'amber', 'green', 'red'].map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="btn btn-sm"
              style={{
                background: filter === t ? '#181817' : '#FFFFFF',
                color: filter === t ? '#FFFFFF' : '#6D6964',
                border: '1px solid rgba(24,24,23,0.12)',
                borderRadius: '9999px',
                padding: '6px 16px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {t === 'all' ? 'All Tiers' : `${t} tier`}
            </button>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFFFFF',
            padding: '6px 14px',
            border: '1px solid rgba(24,24,23,0.12)',
            borderRadius: '9999px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <Search size={14} color="#9E9990" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search ID or customer..."
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.875rem', color: '#181817' }}
          />
        </div>
      </div>

      {/* Case Table */}
      <div className="card" style={{ overflow: 'hidden', background: '#FFFFFF', borderRadius: '20px', border: '1px solid rgba(24,24,23,0.12)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#F7F6F2', borderBottom: '1px solid rgba(24,24,23,0.1)' }}>
              <th style={{ padding: '14px 18px', fontWeight: 700, color: '#181817', background: 'transparent' }}>Case ID</th>
              <th style={{ padding: '14px 18px', fontWeight: 700, color: '#181817', background: 'transparent' }}>Claim</th>
              <th style={{ padding: '14px 18px', fontWeight: 700, color: '#181817', background: 'transparent' }}>Customer</th>
              <th style={{ padding: '14px 18px', fontWeight: 700, color: '#181817', background: 'transparent' }}>Seller</th>
              <th style={{ padding: '14px 18px', fontWeight: 700, color: '#181817', background: 'transparent' }}>Amount</th>
              <th style={{ padding: '14px 18px', fontWeight: 700, color: '#181817', background: 'transparent' }}>Confidence</th>
              <th style={{ padding: '14px 18px', fontWeight: 700, color: '#181817', background: 'transparent' }}>Tier</th>
              <th style={{ padding: '14px 18px', fontWeight: 700, color: '#181817', background: 'transparent' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid rgba(24,24,23,0.06)', background: '#FFFFFF' }}>
                <td style={{ padding: '16px 18px', fontWeight: 700, color: '#181817' }}>{c.id}</td>
                <td style={{ padding: '16px 18px', textTransform: 'capitalize', color: '#6D6964' }}>{c.claimType.replace('_', ' ')}</td>
                <td style={{ padding: '16px 18px', color: '#181817', fontWeight: 500 }}>{c.customer.name}</td>
                <td style={{ padding: '16px 18px', color: '#6D6964' }}>{c.seller.name}</td>
                <td style={{ padding: '16px 18px', fontWeight: 700, color: '#181817' }}>₹{c.amount.toLocaleString('en-IN')}</td>
                <td style={{ padding: '16px 18px', color: '#7657F6', fontWeight: 700 }}>{Math.round((c.confidence || 0) * 100)}%</td>
                <td style={{ padding: '16px 18px' }}>
                  <span className={`badge ${c.autonomyTier === 'green' ? 'badge-green' : c.autonomyTier === 'amber' ? 'badge-amber' : 'badge-red'}`}>
                    {c.autonomyTier}
                  </span>
                </td>
                <td style={{ padding: '16px 18px' }}>
                  <Link href={`/cases/${c.id}`} className="btn btn-sm btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                    Inspect <ArrowUpRight size={13} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
