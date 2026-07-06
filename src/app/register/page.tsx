'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Upload, Landmark } from 'lucide-react';

const STEPS = [
  { label: 'Register your school', sub: 'Enter your institution\'s details to streamline your education finance.' },
  { label: 'Add class', sub: 'Create a class to organize students and assign fees.' },
  { label: 'Add students', sub: 'Upload a CSV file to add multiple students at once.' },
  { label: 'Configure fees', sub: 'Enter your institution\'s details to streamline your education finance.' },
];

const TOTAL = STEPS.length;

function ProgressBar({ current }: { current: number }) {
  return (
    <div className="mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-2">
          <Landmark className="w-6 h-6" style={{ color: 'var(--pl-blue)' }} />
          <span className="font-bold text-base" style={{ color: 'var(--pl-blue)' }}>PayLibre</span>
        </div>
      </div>

      {/* Step label row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium" style={{ color: 'var(--pl-blue)' }}>
          STEP {current + 1} OF {TOTAL}
        </span>
        <span className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>Account Setup</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full w-full" style={{ background: 'var(--pl-border)' }}>
        <div
          className="h-1 rounded-full transition-all duration-300"
          style={{ width: `${((current + 1) / TOTAL) * 100}%`, background: 'var(--pl-blue)' }}
        />
      </div>
    </div>
  );
}

function Field({ label, placeholder, type = 'text', hint }: { label: string; placeholder: string; type?: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <input
        type={type}
        placeholder={placeholder}
        className="border rounded-lg px-3 py-2.5 text-sm outline-none w-full"
        style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
      />
      {hint && <p className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>{hint}</p>}
    </div>
  );
}

function LabeledField({ label, placeholder, type = 'text', hint }: { label: string; placeholder: string; type?: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm" style={{ color: 'var(--pl-text)' }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border rounded-lg px-3 py-2.5 text-sm outline-none"
        style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
      />
      {hint && <p className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>{hint}</p>}
    </div>
  );
}

function LabeledSelect({ label, placeholder, options }: { label: string; placeholder: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm" style={{ color: 'var(--pl-text)' }}>{label}</label>
      <select
        className="border rounded-lg px-3 py-2.5 text-sm outline-none"
        style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Step1() {
  return (
    <div className="flex flex-col gap-4">
      <Field placeholder="School Name" label="School Name" />
      <div className="grid grid-cols-2 gap-3">
        <Field placeholder="Official Email" label="Official Email" type="email" />
        <Field placeholder="+234 000 000 0000" label="Phone Number" type="tel" />
      </div>
      <LabeledSelect label="" placeholder="Select your primary bank" options={['Access Bank', 'GTBank', 'Zenith Bank', 'First Bank', 'UBA', 'Fidelity Bank']} />
      <Field placeholder="Account Number" label="Account Number" />
      <Field
        placeholder="Create Password"
        label="Create Password"
        type="password"
        hint="Must be at least 8 characters with a number and symbol"
      />
    </div>
  );
}

function Step2() {
  return (
    <div className="flex flex-col gap-4">
      <LabeledField label="Class Name" placeholder="e.g SS1" />
      <LabeledField label="Session" placeholder="e.g 2026/2027" />
    </div>
  );
}

function Step3() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium" style={{ color: 'var(--pl-text)' }}>Upload CSV</p>
      <label
        className="flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-10 cursor-pointer transition-colors hover:bg-gray-50"
        style={{ borderColor: 'var(--pl-border)' }}
      >
        <Upload className="w-6 h-6" style={{ color: 'var(--pl-text-secondary)' }} />
        <p className="text-sm text-center" style={{ color: 'var(--pl-text-secondary)' }}>
          Drag and drop your CSV file here, or browse your computer.
        </p>
        <span
          className="px-4 py-2 rounded-lg text-sm font-medium border"
          style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
        >
          Upload Files
        </span>
        <input type="file" accept=".csv" className="hidden" />
      </label>
      <div className="flex items-start gap-2 rounded-lg p-3 text-xs" style={{ background: 'var(--pl-blue-light)', color: 'var(--pl-blue)' }}>
        <span>ℹ</span>
        A dedicated virtual account will be created automatically for each student
      </div>
    </div>
  );
}

function Step4() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm" style={{ color: 'var(--pl-text)' }}>Name<span style={{ color: 'var(--pl-red)' }}>*</span></label>
        <input placeholder="Enter fee title" className="border rounded-lg px-3 py-2.5 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm" style={{ color: 'var(--pl-text)' }}>Category<span style={{ color: 'var(--pl-red)' }}>*</span></label>
        <select className="border rounded-lg px-3 py-2.5 text-sm outline-none" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
          <option value="">Select category</option>
          <option>Compulsory</option>
          <option>Optional</option>
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm" style={{ color: 'var(--pl-text)' }}>Academic Session<span style={{ color: 'var(--pl-red)' }}>*</span></label>
        <select className="border rounded-lg px-3 py-2.5 text-sm outline-none" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
          <option value="">Enter session</option>
          <option>2025/2026</option>
          <option>2026/2027</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm" style={{ color: 'var(--pl-text)' }}>Class<span style={{ color: 'var(--pl-red)' }}>*</span></label>
          <select className="border rounded-lg px-3 py-2.5 text-sm outline-none" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
            <option value="">Select class</option>
            {['JS1','JS2','JS3','SS1','SS2','SS3'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm" style={{ color: 'var(--pl-text)' }}>Term<span style={{ color: 'var(--pl-red)' }}>*</span></label>
          <select className="border rounded-lg px-3 py-2.5 text-sm outline-none" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
            <option value="">Select term</option>
            <option>First</option>
            <option>Second</option>
            <option>Third</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm" style={{ color: 'var(--pl-text)' }}>Amount<span style={{ color: 'var(--pl-red)' }}>*</span></label>
        <input placeholder="Enter amount" className="border rounded-lg px-3 py-2.5 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm" style={{ color: 'var(--pl-text)' }}>Due Date<span style={{ color: 'var(--pl-red)' }}>*</span></label>
        <input type="date" defaultValue="2026-04-28" className="border rounded-lg px-3 py-2.5 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const isLast = step === TOTAL - 1;

  return (
    <div className="min-h-screen flex items-start justify-center py-10 px-4" style={{ background: 'var(--pl-bg)' }}>
      <div className="bg-white rounded-2xl w-full max-w-md p-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)' }}>
        <ProgressBar current={step} />

        {/* Step title */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--pl-text)' }}>{STEPS[step].label}</h1>
          <p className="text-sm" style={{ color: 'var(--pl-text-secondary)' }}>{STEPS[step].sub}</p>
        </div>

        {/* Step content */}
        {step === 0 && <Step1 />}
        {step === 1 && <Step2 />}
        {step === 2 && <Step3 />}
        {step === 3 && <Step4 />}

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          {step > 0 && !isLast && (
            <div className="flex gap-3">
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3 rounded-lg text-sm font-medium border"
                style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
              >
                Back
              </button>
              <button
                onClick={() => setStep(s => s + 1)}
                className="flex-1 py-3 rounded-lg text-sm font-medium text-white"
                style={{ background: 'var(--pl-blue)' }}
              >
                Next
              </button>
            </div>
          )}

          {step === 0 && (
            <button
              onClick={() => setStep(1)}
              className="w-full py-3 rounded-lg text-sm font-medium text-white"
              style={{ background: 'var(--pl-blue)' }}
            >
              Next
            </button>
          )}

          {isLast && (
            <div className="flex gap-3">
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3 rounded-lg text-sm font-medium border"
                style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
              >
                Back
              </button>
              <Link
                href="/dashboard"
                className="flex-1 py-3 rounded-lg text-sm font-medium text-white text-center"
                style={{ background: 'var(--pl-blue)' }}
              >
                Create My Account →
              </Link>
            </div>
          )}
        </div>

        {/* Footer text — step 1 only */}
        {step === 0 && (
          <div className="mt-5 text-center">
            <p className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>
              By creating an account, you agree to our{' '}
              <a href="#" style={{ color: 'var(--pl-blue)' }}>Terms of Service</a> and{' '}
              <a href="#" style={{ color: 'var(--pl-blue)' }}>Privacy Policy</a>.
            </p>
            <p className="text-xs mt-2" style={{ color: 'var(--pl-text-secondary)' }}>
              Already have a PayLibre account?{' '}
              <Link href="/login" style={{ color: 'var(--pl-blue)' }}>Log in</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
