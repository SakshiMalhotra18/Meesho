'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import AppHeader from '@/components/layout/AppHeader';
import CommandPalette from '@/components/layout/CommandPalette';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <AppHeader onCommandOpen={() => setCommandOpen(true)} />
        <main className="page-content">
          {children}
        </main>
      </div>
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  );
}
