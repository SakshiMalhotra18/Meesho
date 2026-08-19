'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderOpen,
  Bot,
  Network,
  BarChart3,
  Zap,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/control-tower', icon: LayoutDashboard, label: 'Control Tower' },
  { href: '/cases', icon: FolderOpen, label: 'Cases' },
  { href: '/agents', icon: Bot, label: 'Agents' },
  { href: '/network', icon: Network, label: 'Network' },
  { href: '/insights', icon: BarChart3, label: 'Insights' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: '220px',
        minWidth: '220px',
        background: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10,
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '20px 20px 16px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            width: '28px',
            height: '28px',
            background: 'var(--color-ai)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Zap size={14} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '0.9375rem', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--color-text-primary)', lineHeight: 1 }}>
              ResolveAI
            </div>
            <div style={{ fontSize: '0.625rem', color: 'var(--color-text-tertiary)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 }}>
              Ops Platform
            </div>
          </Link>
        </div>
      </div>

      <div
        style={{
          margin: '12px 12px 4px',
          padding: '6px 10px',
          background: 'var(--color-ai-light)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-ai)', flexShrink: 0 }} />
        <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-ai-dark)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Demo Mode
        </span>
      </div>

      <nav style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname?.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 10px',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: isActive ? '600' : '450',
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                background: isActive ? 'var(--color-canvas)' : 'transparent',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Icon
                size={16}
                strokeWidth={isActive ? 2.5 : 2}
                color={isActive ? 'var(--color-ai)' : 'currentColor'}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--color-border)',
          fontSize: '0.6875rem',
          color: 'var(--color-text-tertiary)',
          lineHeight: 1.5,
        }}
      >
        Synthetic data only.
        <br />
        Not affiliated with Meesho.
      </div>
    </aside>
  );
}
