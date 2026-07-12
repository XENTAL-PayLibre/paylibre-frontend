import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import DashboardPreview from './DashboardPreview';

export default function Hero() {
  return (
    <section className="pt-16 pb-20 sm:pt-24 sm:pb-28" style={{ background: 'linear-gradient(180deg, var(--pl-blue-light) 0%, var(--pl-bg) 45%, #ffffff 100%)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-wide uppercase mb-4 block" style={{ color: 'var(--pl-blue)' }}>
            School fees, sorted.
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5" style={{ color: 'var(--pl-text)' }}>
            School fees that <span style={{ color: 'var(--pl-blue)' }}>pay themselves</span>
          </h1>

          <p className="text-base sm:text-lg mb-8 leading-relaxed" style={{ color: 'var(--pl-text-secondary)' }}>
            Every student gets their own bank account. Parents pay, the ledger updates itself, and your bursar finally gets their evenings back.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <Link
              href="/register"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 w-full sm:w-auto justify-center"
              style={{ background: 'var(--pl-blue)' }}
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border w-full sm:w-auto justify-center bg-white"
              style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
            >
              See how it works
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
