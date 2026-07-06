'use client';

import { useState } from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import Sidebar from './Sidebar';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--pl-bg)' }}>
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full shadow-xl">
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white border-b px-4 py-3" style={{ borderColor: 'var(--pl-border)' }}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-1.5 rounded-lg"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" style={{ color: 'var(--pl-text-secondary)' }} />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border" style={{ borderColor: 'var(--pl-border)' }}>
              <Search className="w-4 h-4" style={{ color: 'var(--pl-text-secondary)' }} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm outline-none w-48"
                style={{ color: 'var(--pl-text)' }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-50">
              <Bell className="w-5 h-5" style={{ color: 'var(--pl-text-secondary)' }} />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--pl-blue-light)' }}>
              <User className="w-4 h-4" style={{ color: 'var(--pl-blue)' }} />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
