import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="py-20 sm:py-28" style={{ background: 'var(--pl-bg)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-14">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-6"
            style={{ background: 'var(--pl-blue-light)', color: 'var(--pl-blue)' }}
          >
            🔌 New: Virtual Accounts API available
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5" style={{ color: 'var(--pl-text)' }}>
            Automate Your School&apos;s Tuition Collection
          </h1>

          <p className="text-base mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed" style={{ color: 'var(--pl-text-secondary)' }}>
            Assign dedicated virtual bank accounts to every student. Experience zero manual reconciliation, real-time reporting, and a frictionless payment experience for parents.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start mb-10">
            <Link
              href="/register"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 w-full sm:w-auto justify-center"
              style={{ background: 'var(--pl-blue)' }}
            >
              Register School <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#features"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border w-full sm:w-auto justify-center"
              style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
            >
              <Play className="w-3.5 h-3.5" style={{ color: 'var(--pl-blue)' }} />
              View Demo
            </Link>
          </div>

          {/* Trust row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <div className="flex items-center gap-2">
              <Image src="/images/trust-logo-1.png" alt="Trust logo" width={28} height={28} className="object-contain" />
              <Image src="/images/trust-logo-2.png" alt="Trust logo" width={28} height={28} className="object-contain" />
              <Image src="/images/trust-logo-3.png" alt="Trust logo" width={28} height={28} className="object-contain" />
            </div>
            <p className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>
              Trusted by 500+ institutions globally
            </p>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center">
          <Image
            src="/images/illustration.png"
            alt="PayLibre automated school payments"
            width={560}
            height={480}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
