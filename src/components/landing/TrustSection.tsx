import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

const CARDS = [
  {
    icon: ShieldCheck,
    title: 'Licensed banking infrastructure',
    desc: 'Every virtual account is real — issued through licensed financial institutions, not workarounds.',
  },
  {
    icon: Lock,
    title: 'No commingled funds',
    desc: "Each student's money stays in their account. Nothing pools, nothing gets lost in transit.",
  },
  {
    icon: CheckCircle2,
    title: 'Every kobo traceable',
    desc: 'From parent to student to vendor — every transaction is logged, timestamped, and auditable.',
  },
];

export default function TrustSection() {
  return (
    <section className="py-20" style={{ background: 'var(--pl-bg)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-wide uppercase mb-4 block" style={{ color: 'var(--pl-blue)' }}>
            Built for schools that can&apos;t afford mistakes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--pl-text)' }}>
            Every account, every transfer, fully traceable.
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--pl-text-secondary)' }}>
            Paylibre runs on licensed banking infrastructure, so every account is real, every transaction is logged, and every kobo is traceable — from parent to student to vendor. No black boxes, no &quot;trust us.&quot;
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {CARDS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border bg-white p-6 text-center flex flex-col items-center" style={{ borderColor: 'var(--pl-border)' }}>
              <span className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--pl-blue-light)' }}>
                <Icon className="w-5 h-5" style={{ color: 'var(--pl-blue)' }} />
              </span>
              <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--pl-text)' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--pl-text-secondary)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
