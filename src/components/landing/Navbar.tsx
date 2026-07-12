'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Landmark } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: 'var(--pl-border)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Landmark className="w-5 h-5" style={{ color: 'var(--pl-blue)' }} />
          <span className="text-base font-bold" style={{ color: 'var(--pl-text)' }}>Paylibre</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="text-sm transition-colors hover:opacity-70" style={{ color: 'var(--pl-text-secondary)' }}>
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/register"
            className="hover-bounce px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: 'var(--pl-blue)' }}
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-3" style={{ borderColor: 'var(--pl-border)' }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm py-1" style={{ color: 'var(--pl-text-secondary)' }}>
              {l.label}
            </a>
          ))}
          <Link href="/register" className="hover-bounce text-sm font-medium text-center py-2 rounded-lg text-white mt-2" style={{ background: 'var(--pl-blue)' }}>
            Get Started Free
          </Link>
        </div>
      )}
    </nav>
  );
}
