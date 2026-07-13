import { Bell, Building2, RefreshCw } from 'lucide-react';
import Reveal from './Reveal';

const CARDS = [
  {
    icon: Bell,
    title: 'The follow-ups happen without you.',
    desc: 'Payment in, receipt out — instantly. Reminders go to parents before fees are due. Overdue alerts go to the bursar before it gets awkward.',
  },
  {
    icon: Building2,
    title: 'One proprietor. Many schools. One dashboard.',
    desc: 'Each branch has its own ledger. Principals see their school. Proprietors see everything.',
  },
  {
    icon: RefreshCw,
    title: 'Money moves both ways, just as easily.',
    desc: 'One click refunds overpayments straight to the parent. Pay vendors or staff directly from your Paylibre balance.',
  },
];

export default function EverythingElse() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14" style={{ color: 'var(--pl-text)' }}>
          Everything else, handled.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {CARDS.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="hover-card rounded-2xl border p-6 h-full" style={{ borderColor: 'var(--pl-border)', background: 'var(--pl-bg)' }}>
                <span className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--pl-blue-light)' }}>
                  <Icon className="w-4 h-4" style={{ color: 'var(--pl-blue)' }} />
                </span>
                <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--pl-text)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--pl-text-secondary)' }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
