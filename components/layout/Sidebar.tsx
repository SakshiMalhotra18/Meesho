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
        background: 'linear-gradient(180deg, #4A0D36 0%, #7A184D 60%, #9F2B68 100%)',
        borderRight: 'none',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10,
        height: '100vh',
        overflow: 'hidden',
        boxShadow: '4px 0 24px rgba(159, 43, 104, 0.25)',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '20px 20px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            background: '#FF9900',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(255, 153, 0, 0.4)',
          }}
        >
          <Zap size={16} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'white', lineHeight: 1 }}>
              ResolveAI
            </div>
            <div style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.65)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>
              OPS Platform
            </div>
          </Link>
        </div>
      </div>

      {/* Demo Mode Badge */}
      <div
        style={{
          margin: '12px 12px 4px',
          padding: '6px 10px',
          background: 'rgba(255, 153, 0, 0.25)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          border: '1px solid rgba(255, 153, 0, 0.4)',
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF9900', animation: 'pulse 2s infinite' }} />
        <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#FF9900', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Demo Mode
        </span>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '12px',
                background: active ? 'rgba(255, 153, 0, 0.3)' : 'transparent',
                border: active ? '1px solid rgba(255, 153, 0, 0.5)' : '1px solid transparent',
                color: active ? '#FF9900' : 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.875rem',
                fontWeight: active ? 700 : 500,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                boxShadow: active ? '0 4px 12px rgba(255, 153, 0, 0.2)' : 'none',
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)';
                  (e.currentTarget as HTMLElement).style.color = 'white';
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)';
                }
              }}
            >
              <Icon size={16} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
          Synthetic data only.<br />Not affiliated with Meesho.
        </div>
      </div>
    </aside>
  );
}
