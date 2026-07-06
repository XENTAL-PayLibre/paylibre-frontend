const STEPS = [
  {
    step: '01',
    title: 'School registers',
    desc: 'Your school creates a PayLibre account and completes a quick setup. Takes less than 5 minutes.',
  },
  {
    step: '02',
    title: 'Students are onboarded',
    desc: 'Upload your student roster via CSV or add students manually. Each student is assigned a dedicated NUBAN instantly.',
  },
  {
    step: '03',
    title: 'Parents pay from any bank',
    desc: 'Parents transfer fees to their child\'s unique account number from any Nigerian bank — GTB, Access, Zenith, OPay, Kuda, anywhere.',
  },
  {
    step: '04',
    title: 'Bursar sees it live',
    desc: 'The moment a payment lands, it\'s matched to the student and the dashboard updates. Paid, Partial, or Due — always accurate.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20" style={{ background: 'var(--pl-bg)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: 'var(--pl-blue-light)', color: 'var(--pl-blue)' }}>
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--pl-text)' }}>
            Up and running in minutes
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--pl-text-secondary)' }}>
            No complex integrations. No IT department needed. Just sign up and go.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ step, title, desc }, i) => (
            <div key={step} className="relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-px z-0" style={{ background: 'var(--pl-border)' }} />
              )}
              <div className="bg-white rounded-xl border p-6 relative z-10" style={{ borderColor: 'var(--pl-border)' }}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-sm font-bold text-white"
                  style={{ background: 'var(--pl-blue)' }}
                >
                  {step}
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--pl-text)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--pl-text-secondary)' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
