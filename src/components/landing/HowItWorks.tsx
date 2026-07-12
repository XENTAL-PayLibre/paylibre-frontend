const STEPS = [
  {
    step: '01',
    title: 'Every student gets a dedicated account',
    desc: "Not shared, not shuffled — a real, unique account number tied to that student for as long as they're enrolled.",
  },
  {
    step: '02',
    title: 'Parents pay however works for them',
    desc: 'Bank app, transfer, one lump sum or spread across weeks. It all lands in the same place.',
  },
  {
    step: '03',
    title: 'The ledger updates itself',
    desc: 'No matching, no spreadsheets. The moment money lands, Paylibre knows who paid, what for, and how much is left.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20" style={{ background: 'var(--pl-bg)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-wide uppercase mb-4 block" style={{ color: 'var(--pl-blue)' }}>
            How it works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--pl-text)' }}>
            One account per student. Zero guesswork.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {STEPS.map(({ step, title, desc }) => (
            <div key={step}>
              <span className="text-4xl font-bold block mb-4" style={{ color: 'var(--pl-border)' }}>{step}</span>
              <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--pl-text)' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--pl-text-secondary)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
