import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20" style={{ background: 'var(--pl-blue-light)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-5">
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: 'var(--pl-text)' }}>
          Stop chasing payments<br />Start tracking them
        </h2>
        <p className="text-base" style={{ color: 'var(--pl-text-secondary)' }}>
          Set up your school on Paylibre in under a day.
        </p>
        <Link
          href="/register"
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: 'var(--pl-blue)' }}
        >
          Get Started Free <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
