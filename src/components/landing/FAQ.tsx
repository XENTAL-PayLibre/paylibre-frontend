import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Is this a new bank account for the school?',
    a: 'No — your school keeps its existing settlement account. Each student simply gets their own dedicated virtual account (NUBAN) that routes into your ledger automatically.',
  },
  {
    q: 'What happens if a parent pays late?',
    a: "Paylibre flags the balance as overdue and can apply a late fee automatically based on the rule you set. The bursar gets notified before it becomes a problem.",
  },
  {
    q: 'Can we run more than one school on this?',
    a: 'Yes. Proprietors running multiple schools get one dashboard with a ledger per branch — each principal sees their own school, and you see everything.',
  },
  {
    q: 'How fast do vendors get paid?',
    a: 'Instantly. The moment a payment lands, it\'s split and routed to the PTA, vendors, or your school account — no manual payouts to sort out later.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10" style={{ color: 'var(--pl-text)' }}>
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group hover-card-flat border rounded-xl px-5 py-4 bg-white" style={{ borderColor: 'var(--pl-border)' }}>
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-sm font-medium" style={{ color: 'var(--pl-text)' }}>
                {q}
                <ChevronDown className="w-4 h-4 shrink-0 transition-transform group-open:rotate-180" style={{ color: 'var(--pl-text-secondary)' }} />
              </summary>
              <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--pl-text-secondary)' }}>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
