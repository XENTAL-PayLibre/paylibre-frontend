import Link from 'next/link';
import { Landmark } from 'lucide-react';

const LINKS = {
  Product: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'FAQs', href: '#faq' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--pl-border)', background: 'var(--pl-bg)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'var(--pl-blue)' }}>
                <Landmark className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="text-base font-bold" style={{ color: 'var(--pl-text)' }}>Paylibre</span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--pl-text-secondary)' }}>
              School fees, sorted. Built for proprietors, bursars, and the parents who just want to pay.
            </p>
          </div>

          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--pl-text)' }}>{category}</p>
              <div className="flex flex-col gap-2.5">
                {links.map(link => (
                  <a key={link.label} href={link.href} className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--pl-text-secondary)' }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-6" style={{ borderColor: 'var(--pl-border)' }}>
          <p className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>
            © 2026 Paylibre. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
