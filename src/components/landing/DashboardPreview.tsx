import { BarChart3, Search } from 'lucide-react';

const STUDENTS = [
  { initials: 'AO', name: 'Adaeze Okonkwo', sub: 'SS2', amount: '₦45,000', status: 'Paid' },
  { initials: 'EN', name: 'Emeka Nwosu', sub: 'JSS3', amount: '₦22,500', status: 'Partial' },
  { initials: 'FA', name: 'Fatima Abdullahi', sub: 'SS1', amount: '₦45,000', status: 'Paid' },
  { initials: 'CO', name: 'Chidi Obi', sub: 'JSS1', amount: '₦0', status: 'Overdue' },
  { initials: 'NE', name: 'Ngozi Eze', sub: 'SS3', amount: '₦45,000', status: 'Paid' },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Paid: { bg: 'var(--pl-green-bg)', color: 'var(--pl-green)' },
  Partial: { bg: 'var(--pl-amber-bg)', color: 'var(--pl-amber)' },
  Overdue: { bg: 'var(--pl-red-bg)', color: 'var(--pl-red)' },
};

const BARS = [45, 60, 40, 75, 55, 90, 65];

export default function DashboardPreview() {
  return (
    <div className="rounded-2xl border bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08),0_20px_50px_rgba(0,77,187,0.10)]" style={{ borderColor: 'var(--pl-border)' }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-4 px-4 py-3 border-b" style={{ borderColor: 'var(--pl-border)', background: 'var(--pl-bg)' }}>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-xs px-3 py-1 rounded-md bg-white border" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
            app.paylibre.com/collections
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4">
        {/* Fee Manager */}
        <div className="border rounded-xl overflow-hidden" style={{ borderColor: 'var(--pl-border)' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--pl-border)' }}>
            <span className="text-sm font-semibold" style={{ color: 'var(--pl-text)' }}>Fee Manager</span>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-md border" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>All classes</span>
              <span className="text-xs px-2 py-1 rounded-md border" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>Term 3</span>
            </div>
          </div>

          <div className="grid grid-cols-2 divide-x" style={{ borderColor: 'var(--pl-border)' }}>
            <div className="px-4 py-3">
              <p className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>Term Revenue</p>
              <p className="text-lg font-bold" style={{ color: 'var(--pl-text)' }}>₦2.34M</p>
              <p className="text-xs" style={{ color: 'var(--pl-green)' }}>↑ 87% collected</p>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>Students Settled</p>
              <p className="text-lg font-bold" style={{ color: 'var(--pl-text)' }}>48 / 55</p>
              <p className="text-xs" style={{ color: 'var(--pl-red)' }}>2 overdue flagged</p>
            </div>
          </div>

          <div className="px-4 py-2.5 border-t border-b flex items-center gap-2" style={{ borderColor: 'var(--pl-border)', background: 'var(--pl-bg)' }}>
            <Search className="w-3.5 h-3.5" style={{ color: 'var(--pl-text-secondary)' }} />
            <span className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>Search students...</span>
          </div>

          <div>
            {STUDENTS.map((s) => (
              <div key={s.name} className="flex items-center justify-between px-4 py-2.5 border-t" style={{ borderColor: 'var(--pl-border)' }}>
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0" style={{ background: 'var(--pl-blue-light)', color: 'var(--pl-blue)' }}>
                    {s.initials}
                  </span>
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>{s.name}</p>
                    <p className="text-[10px]" style={{ color: 'var(--pl-text-secondary)' }}>{s.sub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>{s.amount}</span>
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{ background: STATUS_STYLE[s.status].bg, color: STATUS_STYLE[s.status].color }}
                  >
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side panels */}
        <div className="flex flex-col gap-4">
          <div className="border rounded-xl p-4" style={{ borderColor: 'var(--pl-border)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold" style={{ color: 'var(--pl-text)' }}>Collections</span>
              <span className="text-xs flex items-center gap-1" style={{ color: 'var(--pl-text-secondary)' }}>
                Weekly <BarChart3 className="w-3 h-3" />
              </span>
            </div>
            <div className="flex items-end gap-1.5 h-16 mb-2">
              {BARS.map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === 5 ? 'var(--pl-blue)' : 'var(--pl-blue-light)' }} />
              ))}
            </div>
            <p className="text-base font-bold" style={{ color: 'var(--pl-text)' }}>₦2,340,500</p>
          </div>

          <div className="border rounded-xl p-4" style={{ borderColor: 'var(--pl-border)' }}>
            <p className="text-xs mb-1" style={{ color: 'var(--pl-text-secondary)' }}>Cash flow forecast</p>
            <p className="text-base font-bold mb-1" style={{ color: 'var(--pl-text)' }}>₦4,820,000</p>
            <p className="text-[11px]" style={{ color: 'var(--pl-blue)' }}>Expected by mid-term</p>
          </div>
        </div>
      </div>
    </div>
  );
}
