'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FolderOpen, Bot, Network, BarChart3, LayoutDashboard, X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const COMMANDS = [
  { id: 'ct', label: 'Open Control Tower', icon: LayoutDashboard, action: '/control-tower' },
  { id: 'cases', label: 'Browse Cases', icon: FolderOpen, action: '/cases' },
  { id: 'case-featured', label: 'Open Case MR-39281 (Featured)', icon: FolderOpen, action: '/cases/MR-39281' },
  { id: 'case-mr40102', label: 'Open Case MR-40102 (Damaged Item)', icon: FolderOpen, action: '/cases/MR-40102' },
  { id: 'case-mr41055', label: 'Open Case MR-41055 (Fake Return)', icon: FolderOpen, action: '/cases/MR-41055' },
  { id: 'agents', label: 'Agent Control Room', icon: Bot, action: '/agents' },
  { id: 'network', label: 'Logistics Network', icon: Network, action: '/network' },
  { id: 'insights', label: 'Insights & Analytics', icon: BarChart3, action: '/insights' },
];

export default function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (open) onClose();
      }
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = COMMANDS.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  if (!open) return null;

  const handleSelect = (action: string) => {
    router.push(action);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(24,24,23,0.4)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '15vh',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '540px',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
        }}
        role="dialog"
        aria-label="Command palette"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', borderBottom: '1px solid var(--color-border)' }}>
          <Search size={16} color="var(--color-text-tertiary)" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search cases, agents, pages..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '0.9375rem',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-inter)',
            }}
            aria-label="Command search"
          />
          <button
            onClick={onClose}
            aria-label="Close command palette"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', display: 'flex' }}
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '8px', maxHeight: '320px', overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--color-text-tertiary)', fontSize: '0.875rem' }}>
              No results found.
            </div>
          ) : (
            filtered.map(cmd => (
              <button
                key={cmd.id}
                onClick={() => handleSelect(cmd.action)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 12px',
                  border: 'none',
                  background: 'transparent',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-primary)',
                }}
              >
                <cmd.icon size={15} color="var(--color-text-tertiary)" />
                {cmd.label}
              </button>
            ))
          )}
        </div>

        <div style={{ padding: '8px 16px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '12px' }}>
          <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)' }}>↵ Navigate</span>
          <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)' }}>Esc Close</span>
        </div>
      </div>
    </div>
  );
}
