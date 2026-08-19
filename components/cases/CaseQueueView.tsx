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
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Operations
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-text-primary)', margin: '4px 0 0' }}>
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
                background: filter === t ? 'var(--color-text-primary)' : 'var(--color-surface)',
                color: filter === t ? 'white' : 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
                textTransform: 'capitalize',
              }}
            >
              {t === 'all' ? 'All Tiers' : `${t} tier`}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-surface)', padding: '6px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
          <Search size={14} color="var(--color-text-tertiary)" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search ID or customer..."
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.875rem' }}
          />
        </div>
      </div>

      {/* Case Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: 'var(--color-surface-2)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '12px 16px', fontWeight: 600 }}>Case ID</th>
              <th style={{ padding: '12px 16px', fontWeight: 600 }}>Claim</th>
              <th style={{ padding: '12px 16px', fontWeight: 600 }}>Customer</th>
              <th style={{ padding: '12px 16px', fontWeight: 600 }}>Seller</th>
              <th style={{ padding: '12px 16px', fontWeight: 600 }}>Amount</th>
              <th style={{ padding: '12px 16px', fontWeight: 600 }}>Confidence</th>
              <th style={{ padding: '12px 16px', fontWeight: 600 }}>Tier</th>
              <th style={{ padding: '12px 16px', fontWeight: 600 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600 }}>{c.id}</td>
                <td style={{ padding: '14px 16px', textTransform: 'capitalize' }}>{c.claimType.replace('_', ' ')}</td>
                <td style={{ padding: '14px 16px' }}>{c.customer.name}</td>
                <td style={{ padding: '14px 16px' }}>{c.seller.name}</td>
                <td style={{ padding: '14px 16px', fontWeight: 600 }}>₹{c.amount.toLocaleString('en-IN')}</td>
                <td style={{ padding: '14px 16px', color: 'var(--color-ai)', fontWeight: 600 }}>{Math.round((c.confidence || 0) * 100)}%</td>
                <td style={{ padding: '14px 16px' }}>
                  <span className={`badge ${c.autonomyTier === 'green' ? 'badge-green' : c.autonomyTier === 'amber' ? 'badge-amber' : 'badge-red'}`}>
                    {c.autonomyTier}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <Link href={`/cases/${c.id}`} className="btn btn-sm btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Inspect <ArrowUpRight size={12} />
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
