import { Landmark, BarChart3 } from 'lucide-react';

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="hover-card w-full max-w-sm rounded-2xl border bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_16px_40px_rgba(0,77,187,0.08)]"
      style={{ borderColor: 'var(--pl-border)' }}
    >
      {children}
    </div>
  );
}

export function AccountMockup() {
  return (
    <Card>
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--pl-blue-light)' }}>
          <Landmark className="w-4 h-4" style={{ color: 'var(--pl-blue)' }} />
        </span>
        <div>
          <p className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>Student Account</p>
          <p className="text-sm font-semibold" style={{ color: 'var(--pl-text)' }}>Adaeze Okonkwo</p>
        </div>
      </div>
      <div className="rounded-xl p-4 mb-4 text-white" style={{ background: 'var(--pl-blue)' }}>
        <p className="text-[11px] opacity-80 mb-1">Account Number (NUBAN)</p>
        <p className="text-xl font-bold tracking-wide mb-1">0123 456 789</p>
        <p className="text-[11px] opacity-80">GTBank · Dedicated · Persistent</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-[11px]" style={{ color: 'var(--pl-text-secondary)' }}>Term Fee</p>
          <p className="text-sm font-semibold" style={{ color: 'var(--pl-text)' }}>₦45,000</p>
        </div>
        <div>
          <p className="text-[11px]" style={{ color: 'var(--pl-text-secondary)' }}>Paid</p>
          <p className="text-sm font-semibold" style={{ color: 'var(--pl-green)' }}>₦45,000</p>
        </div>
      </div>
      <div className="h-1.5 rounded-full w-full" style={{ background: 'var(--pl-border)' }}>
        <div className="h-1.5 rounded-full w-full" style={{ background: 'var(--pl-green)' }} />
      </div>
    </Card>
  );
}

export function InvoiceMockup() {
  const rows = [
    { label: 'Tuition Fee', amount: '₦40,000' },
    { label: 'PTA Levy', amount: '₦3,000' },
    { label: 'ICT Fee', amount: '₦2,000' },
  ];
  return (
    <Card>
      <div className="flex items-center justify-between mb-1">
        <p className="text-[11px]" style={{ color: 'var(--pl-text-secondary)' }}>Invoice #2025-T3-001</p>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--pl-amber-bg)', color: 'var(--pl-amber)' }}>Due in 5 days</span>
      </div>
      <p className="text-sm font-semibold mb-4" style={{ color: 'var(--pl-text)' }}>3rd Term Billing</p>
      <div className="flex flex-col gap-2.5 mb-3">
        {rows.map(r => (
          <div key={r.label} className="flex items-center justify-between text-sm">
            <span style={{ color: 'var(--pl-text-secondary)' }}>{r.label}</span>
            <span style={{ color: 'var(--pl-text)' }}>{r.amount}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-3 border-t mb-3" style={{ borderColor: 'var(--pl-border)' }}>
        <span className="text-sm font-semibold" style={{ color: 'var(--pl-text)' }}>Total</span>
        <span className="text-sm font-semibold" style={{ color: 'var(--pl-blue)' }}>₦45,000</span>
      </div>
      <div className="rounded-lg p-2.5 text-[11px]" style={{ background: 'var(--pl-bg)', color: 'var(--pl-text-secondary)' }}>
        Late fee of ₦2,000 applied automatically after the due date
      </div>
    </Card>
  );
}

export function PaymentSplitMockup() {
  const rows = [
    { label: 'PTA Fund', amount: '₦10,000', pct: 7, color: '#7C3AED' },
    { label: 'Bus Vendor', amount: '₦20,000', pct: 13, color: 'var(--pl-amber)' },
    { label: 'School Account', amount: '₦120,000', pct: 80, color: 'var(--pl-green)' },
  ];
  return (
    <Card>
      <div className="text-center mb-4">
        <span className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2" style={{ background: 'var(--pl-blue-light)', color: 'var(--pl-blue)' }}>
          ₦150,000 received
        </span>
        <p className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>Chidi Eze · 3rd Term</p>
      </div>
      <div className="flex flex-col gap-3 mb-4">
        {rows.map(r => (
          <div key={r.label}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span style={{ color: 'var(--pl-text-secondary)' }}>{r.label}</span>
              <span className="font-medium" style={{ color: 'var(--pl-text)' }}>{r.amount}</span>
            </div>
            <div className="h-1.5 rounded-full w-full" style={{ background: 'var(--pl-border)' }}>
              <div className="h-1.5 rounded-full" style={{ width: `${r.pct}%`, background: r.color }} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] font-medium text-center" style={{ color: 'var(--pl-green)' }}>✓ All recipients settled instantly</p>
    </Card>
  );
}

export function CollectionRateMockup() {
  const bars = [30, 35, 45, 55, 40, 90, 45];
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs mb-1" style={{ color: 'var(--pl-text-secondary)' }}>Collection Rate</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--pl-text)' }}>87%</p>
          <p className="text-[11px]" style={{ color: 'var(--pl-green)' }}>↑ 12% vs last term</p>
        </div>
        <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--pl-blue-light)' }}>
          <BarChart3 className="w-4 h-4" style={{ color: 'var(--pl-blue)' }} />
        </span>
      </div>
      <div className="flex items-end gap-1.5 h-16 mb-4">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === 5 ? 'var(--pl-blue)' : 'var(--pl-blue-light)' }} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg py-2" style={{ background: 'var(--pl-bg)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--pl-text)' }}>48</p>
          <p className="text-[10px]" style={{ color: 'var(--pl-text-secondary)' }}>Paid</p>
        </div>
        <div className="rounded-lg py-2" style={{ background: 'var(--pl-bg)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--pl-text)' }}>5</p>
          <p className="text-[10px]" style={{ color: 'var(--pl-text-secondary)' }}>Partial</p>
        </div>
        <div className="rounded-lg py-2" style={{ background: 'var(--pl-bg)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--pl-text)' }}>2</p>
          <p className="text-[10px]" style={{ color: 'var(--pl-text-secondary)' }}>Overdue</p>
        </div>
      </div>
    </Card>
  );
}
