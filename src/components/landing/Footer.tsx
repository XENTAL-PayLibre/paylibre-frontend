import Link from 'next/link';
import { Globe, Landmark } from 'lucide-react';

const LINKS = {
  Product: ['Virtual Accounts', 'Reconciliation', 'Reporting API', 'Pricing'],
  Company: ['About Us', 'Careers', 'Blog', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Security'],
};

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--pl-border)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Landmark className="w-5 h-5" style={{ color: 'var(--pl-blue)' }} />
              <span className="text-base font-bold" style={{ color: 'var(--pl-blue)' }}>PayLibre</span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--pl-text-secondary)' }}>
              Education finance infrastructure built for modern institutions.
            </p>
          </div>

          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--pl-text)' }}>{category}</p>
              <div className="flex flex-col gap-2.5">
                {links.map(link => (
                  <a key={link} href="#" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--pl-text-secondary)' }}>
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'var(--pl-border)' }}>
          <p className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>
            © 2024 PayLibre Inc. All rights reserved.
          </p>
          <Globe className="w-4 h-4" style={{ color: 'var(--pl-text-secondary)' }} />
        </div>
      </div>
    </footer>
  );
}
