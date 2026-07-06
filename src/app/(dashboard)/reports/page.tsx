import { Download } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { DollarSign, Users, TrendingUp, AlertCircle } from 'lucide-react';

const CHART_DATA = [
  { month: 'Jan', collected: 65, expected: 100 },
  { month: 'Feb', collected: 45, expected: 100 },
  { month: 'Mar', collected: 80, expected: 100 },
  { month: 'Apr', collected: 55, expected: 100 },
  { month: 'May', collected: 90, expected: 100 },
  { month: 'Jun', collected: 40, expected: 100 },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>Reports</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Financial overview and analytics</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white" style={{ background: 'var(--pl-blue)' }}>
          <Download className="w-3.5 h-3.5" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Expected"   value="₦3.0M"  icon={DollarSign}  />
        <StatCard label="Total Collected"  value="₦1.5M"  icon={TrendingUp}  iconBg="var(--pl-green-bg)"  iconColor="var(--pl-green)" />
        <StatCard label="Total Students"   value="2,450"  icon={Users}       iconBg="var(--pl-blue-light)" iconColor="var(--pl-blue)" />
        <StatCard label="Outstanding"      value="₦1.5M"  icon={AlertCircle} iconBg="var(--pl-red-bg)"    iconColor="var(--pl-red)" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Collection Rate */}
        <div className="bg-white rounded-xl border p-5" style={{ borderColor: 'var(--pl-border)' }}>
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-sm" style={{ color: 'var(--pl-text)' }}>Collection Rate</p>
            <select className="text-xs border rounded-lg px-2.5 py-1.5 outline-none" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
              <option>Last 6 months</option>
            </select>
          </div>
          <div className="flex items-end gap-3 h-40">
            {CHART_DATA.map(d => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col gap-0.5">
                  <div className="w-full rounded-t opacity-30" style={{ height: `${(d.expected - d.collected) * 0.5}px`, background: 'var(--pl-red)' }} />
                  <div className="w-full rounded-b" style={{ height: `${d.collected * 0.5}px`, background: 'var(--pl-blue)' }} />
                </div>
                <span className="text-[10px]" style={{ color: 'var(--pl-text-secondary)' }}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Status breakdown */}
        <div className="bg-white rounded-xl border p-5" style={{ borderColor: 'var(--pl-border)' }}>
          <p className="font-semibold text-sm mb-4" style={{ color: 'var(--pl-text)' }}>Payment Status Breakdown</p>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Paid',    count: 1820, pct: 74, color: 'var(--pl-green)' },
              { label: 'Partial', count: 315,  pct: 13, color: 'var(--pl-amber)' },
              { label: 'Due',     count: 315,  pct: 13, color: 'var(--pl-red)' },
            ].map(s => (
              <div key={s.label} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: 'var(--pl-text)' }}>{s.label}</span>
                  <span style={{ color: 'var(--pl-text-secondary)' }}>{s.count.toLocaleString()} ({s.pct}%)</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: 'var(--pl-bg)' }}>
                  <div className="h-2 rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--pl-border)' }}>
            <p className="text-xs font-medium mb-3" style={{ color: 'var(--pl-text)' }}>Top Paying Classes</p>
            {[
              { class: 'SS3', amount: '₦450,000' },
              { class: 'SS2', amount: '₦380,000' },
              { class: 'SS1', amount: '₦350,000' },
            ].map(c => (
              <div key={c.class} className="flex items-center justify-between py-1.5">
                <span className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>{c.class}</span>
                <span className="text-xs font-semibold" style={{ color: 'var(--pl-text)' }}>{c.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
