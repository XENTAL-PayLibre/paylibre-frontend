import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className="rounded-2xl p-10 sm:p-16 text-center flex flex-col items-center gap-6 border"
          style={{ background: 'var(--pl-bg)', borderColor: 'var(--pl-border)' }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold max-w-xl" style={{ color: 'var(--pl-text)' }}>
            Ready to modernize your treasury?
          </h2>
          <p className="text-base max-w-lg" style={{ color: 'var(--pl-text-secondary)' }}>
            Join hundreds of progressive schools saving hours every week on manual reconciliation.
          </p>
          <Link
            href="/register"
            className="px-8 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--pl-blue)' }}
          >
            Register School Now
          </Link>
        </div>
      </div>
    </section>
  );
}
