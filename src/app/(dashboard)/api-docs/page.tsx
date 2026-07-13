'use client';

import Link from 'next/link';
import { KeyRound } from 'lucide-react';

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'https://paylibre.xental.online').replace(/\/$/, '');
const API = `${BASE}/api/v1`;

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="text-xs font-mono rounded-lg p-3 overflow-x-auto" style={{ background: 'var(--pl-bg, #0b1020)', color: '#e6edf3' }}>
      <code>{children}</code>
    </pre>
  );
}

function Endpoint({ method, path, scope, children }: { method: string; path: string; scope: string; children: React.ReactNode }) {
  const color = method === 'GET' ? 'var(--pl-green)' : 'var(--pl-blue)';
  return (
    <div className="rounded-xl border p-4 flex flex-col gap-2" style={{ borderColor: 'var(--pl-border)' }}>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: color, color: 'white' }}>{method}</span>
        <code className="text-sm font-mono" style={{ color: 'var(--pl-text)' }}>{path}</code>
        <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: 'var(--pl-blue-light)', color: 'var(--pl-blue)' }}>{scope}</span>
      </div>
      {children}
    </div>
  );
}

export default function ApiDocsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>PayLibre API</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>
            Sync students and read fee balances from your own school system.
          </p>
        </div>
        <Link href="/developers" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border"
          style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-blue)' }}>
          <KeyRound className="w-3.5 h-3.5" /> Manage Keys
        </Link>
      </div>

      {/* Auth */}
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold text-base" style={{ color: 'var(--pl-text)' }}>Authentication</h2>
        <p className="text-sm" style={{ color: 'var(--pl-text-secondary)' }}>
          Create an API key on the Developers page, then send it with every request in the <code className="font-mono">X-Api-Key</code> header
          (or <code className="font-mono">Authorization: Bearer plb_…</code>). Keep it secret; it grants access to your school’s data.
        </p>
        <Code>{`curl ${API}/public/students \\
  -H "X-Api-Key: plb_your_key_here"`}</Code>
        <p className="text-sm" style={{ color: 'var(--pl-text-secondary)' }}>Base URL: <code className="font-mono">{API}</code></p>
      </section>

      {/* Scopes */}
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold text-base" style={{ color: 'var(--pl-text)' }}>Scopes</h2>
        <ul className="text-sm flex flex-col gap-1" style={{ color: 'var(--pl-text-secondary)' }}>
          <li><code className="font-mono">students:read</code> — list students, read a student’s balance.</li>
          <li><code className="font-mono">students:write</code> — create / update (sync) students.</li>
          <li><code className="font-mono">payments:read</code> — read payment data.</li>
        </ul>
      </section>

      {/* Endpoints */}
      <section className="flex flex-col gap-3">
        <h2 className="font-semibold text-base" style={{ color: 'var(--pl-text)' }}>Endpoints</h2>

        <Endpoint method="GET" path="/public/students" scope="students:read">
          <p className="text-sm" style={{ color: 'var(--pl-text-secondary)' }}>List all students in your school.</p>
          <Code>{`curl ${API}/public/students -H "X-Api-Key: plb_…"`}</Code>
        </Endpoint>

        <Endpoint method="POST" path="/public/students" scope="students:write">
          <p className="text-sm" style={{ color: 'var(--pl-text-secondary)' }}>
            Create or update a student by <code className="font-mono">admissionNo</code> (idempotent sync).
            New students are auto-provisioned a dedicated bank account. <code className="font-mono">classId</code> comes from your dashboard.
          </p>
          <Code>{`curl -X POST ${API}/public/students \\
  -H "X-Api-Key: plb_…" -H "Content-Type: application/json" \\
  -d '{
    "admissionNo": "ADM-001",
    "fullName": "Ada Obi",
    "classId": "<class-uuid>",
    "guardianName": "Mrs Obi",
    "guardianEmail": "mum@example.com",
    "guardianPhone": "08030000000"
  }'`}</Code>
        </Endpoint>

        <Endpoint method="GET" path="/public/students/{admissionNo}" scope="students:read">
          <p className="text-sm" style={{ color: 'var(--pl-text-secondary)' }}>A student’s account details + total outstanding balance (kobo).</p>
          <Code>{`curl ${API}/public/students/ADM-001 -H "X-Api-Key: plb_…"

{
  "admissionNo": "ADM-001",
  "fullName": "Ada Obi",
  "status": "Active",
  "outstandingKobo": 4500000,
  "nuban": "9944429399",
  "bankName": "PayLibre Test Bank",
  "accountName": "PayLibre - Ada Obi"
}`}</Code>
        </Endpoint>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-semibold text-base" style={{ color: 'var(--pl-text)' }}>Errors</h2>
        <ul className="text-sm flex flex-col gap-1" style={{ color: 'var(--pl-text-secondary)' }}>
          <li><code className="font-mono">401</code> — missing or invalid API key.</li>
          <li><code className="font-mono">403</code> — the key lacks the required scope.</li>
          <li><code className="font-mono">404</code> — student not found.</li>
          <li><code className="font-mono">400</code> — validation error (details in the response body).</li>
        </ul>
      </section>
    </div>
  );
}
