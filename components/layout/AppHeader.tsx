'use client';

import { Search, Bell, User } from 'lucide-react';

interface Props {
  onCommandOpen: () => void;
}

export default function AppHeader({ onCommandOpen }: Props) {
  return (
    <header
      style={{
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        flexShrink: 0,
        gap: '16px',
      }}
    >
      <button
        onClick={onCommandOpen}
        aria-label="Open command palette"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-canvas)',
          color: 'var(--color-text-tertiary)',
          cursor: 'pointer',
          fontSize: '0.875rem',
          width: '220px',
        }}
      >
        <Search size={14} />
        <span style={{ flex: 1, textAlign: 'left' }}>Search cases...</span>
        <kbd
          style={{
            fontSize: '0.6875rem',
            padding: '1px 5px',
            border: '1px solid var(--color-border-strong)',
            borderRadius: '4px',
            background: 'var(--color-surface)',
            color: 'var(--color-text-tertiary)',
          }}
        >
          ⌘K
        </kbd>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          aria-label="Notifications"
          style={{
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            background: 'transparent',
            cursor: 'pointer',
            color: 'var(--color-text-secondary)',
          }}
        >
          <Bell size={15} />
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 10px 4px 6px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: 'var(--color-ai-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <User size={13} color="var(--color-ai)" />
          </div>
          <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>Analyst</span>
        </div>
      </div>
    </header>
  );
}
