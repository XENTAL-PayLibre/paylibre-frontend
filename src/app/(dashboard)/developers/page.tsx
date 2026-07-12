'use client';

import { useState } from 'react';
import Link from 'next/link';
import { KeyRound, Plus, Copy, CheckCheck, Trash2, BookOpen, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useApiKeys, useCreateApiKey, useRevokeApiKey } from '@/api/developers';
import type { ApiScope } from '@/api/types/developers';

const SCOPES: { value: ApiScope; label: string; hint: string }[] = [
  { value: 'students:read', label: 'students:read', hint: 'List students + read balances' },
  { value: 'students:write', label: 'students:write', hint: 'Create / update (sync) students' },
  { value: 'payments:read', label: 'payments:read', hint: 'Read payment data' },
];

export default function DevelopersPage() {
  const { data: keys, isLoading } = useApiKeys();
  const createKey = useCreateApiKey();
  const revokeKey = useRevokeApiKey();

  const [name, setName] = useState('');
  const [selected, setSelected] = useState<ApiScope[]>(['students:read']);
  const [plaintext, setPlaintext] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const toggle = (s: ApiScope) =>
    setSelected((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || selected.length === 0) return;
    createKey.mutate(
      { name: name.trim(), scopes: selected },
      {
        onSuccess(res) {
          setPlaintext(res.plaintextKey);
          setName('');
          setSelected(['students:read']);
          toast.success('API key created — copy it now, it won’t be shown again.');
        },
      },
    );
  };

  const copy = async () => {
    if (!plaintext) return;
    await navigator.clipboard.writeText(plaintext);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>Developers</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>
            API keys for connecting your school system to PayLibre.
          </p>
        </div>
        <Link href="/api-docs" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border"
          style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-blue)' }}>
          <BookOpen className="w-3.5 h-3.5" /> API Docs
        </Link>
      </div>

      {/* Freshly created key — shown once */}
      {plaintext && (
        <div className="rounded-xl border p-4 flex flex-col gap-2" style={{ borderColor: 'var(--pl-green)', background: 'var(--pl-green-bg)' }}>
          <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--pl-text)' }}>
            <AlertTriangle className="w-4 h-4" style={{ color: 'var(--pl-green)' }} />
            Copy your key now — it won’t be shown again.
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-sm font-mono px-3 py-2 rounded-lg bg-white border break-all" style={{ borderColor: 'var(--pl-border)' }}>{plaintext}</code>
            <button onClick={copy} className="p-2 rounded-lg text-white" style={{ background: 'var(--pl-blue)' }}>
              {copied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Create form */}
      <form onSubmit={submit} className="bg-white rounded-xl border p-5 flex flex-col gap-4" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="flex items-center gap-2.5 border-b pb-3" style={{ borderColor: 'var(--pl-border)' }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--pl-blue-light)' }}>
            <KeyRound className="w-4 h-4" style={{ color: 'var(--pl-blue)' }} />
          </div>
          <p className="font-semibold text-sm" style={{ color: 'var(--pl-text)' }}>Create an API key</p>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium" style={{ color: 'var(--pl-text-secondary)' }}>Key name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. School Portal"
            className="border rounded-lg px-3 py-2.5 text-base outline-none w-full border-pl-border focus:border-pl-blue" />
        </label>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium" style={{ color: 'var(--pl-text-secondary)' }}>Scopes</span>
          {SCOPES.map((s) => (
            <label key={s.value} className="flex items-center gap-2.5 text-sm cursor-pointer">
              <input type="checkbox" checked={selected.includes(s.value)} onChange={() => toggle(s.value)} />
              <code className="font-mono" style={{ color: 'var(--pl-text)' }}>{s.label}</code>
              <span style={{ color: 'var(--pl-text-secondary)' }}>— {s.hint}</span>
            </label>
          ))}
        </div>
        <button type="submit" disabled={createKey.isPending || !name.trim() || selected.length === 0}
          className="self-start flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-white disabled:opacity-50 cursor-pointer"
          style={{ background: 'var(--pl-blue)' }}>
          <Plus className="w-3.5 h-3.5" /> {createKey.isPending ? 'Creating…' : 'Create Key'}
        </button>
      </form>

      {/* Existing keys */}
      <div className="bg-white rounded-xl border p-5 flex flex-col gap-3" style={{ borderColor: 'var(--pl-border)' }}>
        <p className="font-semibold text-sm" style={{ color: 'var(--pl-text)' }}>Your API keys</p>
        {isLoading ? (
          <p className="text-sm" style={{ color: 'var(--pl-text-secondary)' }}>Loading…</p>
        ) : !keys || keys.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--pl-text-secondary)' }}>No API keys yet.</p>
        ) : (
          <div className="flex flex-col divide-y" style={{ borderColor: 'var(--pl-border)' }}>
            {keys.map((k) => (
              <div key={k.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--pl-text)' }}>
                    {k.name} {!k.active && <span className="text-xs" style={{ color: 'var(--pl-red)' }}>(revoked)</span>}
                  </p>
                  <p className="text-xs font-mono truncate" style={{ color: 'var(--pl-text-secondary)' }}>{k.keyPrefix}…  ·  {k.scopes}</p>
                </div>
                {k.active && (
                  <button onClick={() => revokeKey.mutate(k.id)} disabled={revokeKey.isPending}
                    className="p-2 rounded-lg hover:bg-red-50 disabled:opacity-50" title="Revoke">
                    <Trash2 className="w-4 h-4" style={{ color: 'var(--pl-red)' }} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
