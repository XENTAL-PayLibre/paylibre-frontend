import { DollarSign, Users, CheckCircle, AlertCircle, Download } from 'lucide-react';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';

const RECENT_PAYMENTS = [
  { name: 'Chinonso Okeke', class: 'SS1', fee: 'Tuition Fee', amount: '₦30,200', account: '8061762007', date: '30-04-2026', status: 'Paid' as const },
  { name: 'Amara Eze',       class: 'SS2', fee: 'ICT Fee',     amount: '₦8,750',  account: '4928375610', date: '03-05-2026', status: 'Partial' as const },
  { name: 'Tunde Adeyemi',   class: 'SS3', fee: 'WAEC Fee',    amount: '₦30,200', account: '7712309842', date: '30-04-2026', status: 'Paid' as const },
  { name: 'Ngozi Okafor',    class: 'JS3', fee: 'Tuition Fee', amount: '₦0',      account: '4928375610', date: '03-05-2026', status: 'Due' as const },
  { name: 'Emeka Obi',       class: 'SS1', fee: 'Transport',   amount: '₦60,750', account: '8061762007', date: '30-04-2026', status: 'Paid' as const },
];

const CHART_BARS = [65, 45, 80, 55, 90, 40, 70, 85, 50, 75, 60, 95];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Welcome back, St. Benedict Academy</p>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: 'var(--pl-blue)' }}
        >
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue"    value="₦550,000" sub="This term"        icon={DollarSign}   />
        <StatCard label="Total Students"   value="2,450"    sub="Enrolled"         icon={Users}        iconBg="var(--pl-green-bg)"  iconColor="var(--pl-green)" />
        <StatCard label="Paid"             value="1,820"    sub="74% collection"   icon={CheckCircle}  iconBg="var(--pl-green-bg)"  iconColor="var(--pl-green)" />
        <StatCard label="Due"              value="5"        sub="Needs attention"  icon={AlertCircle}  iconBg="var(--pl-red-bg)"    iconColor="var(--pl-red)"   />
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-xl border p-5" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--pl-text)' }}>Revenue Growth</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Last 12 months</p>
          </div>
          <select className="text-xs border rounded-lg px-2.5 py-1.5 outline-none" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
            <option>Last 12 months</option>
            <option>Last 6 months</option>
            <option>This term</option>
          </select>
        </div>
        <div className="flex items-end gap-2 h-36">
          {CHART_BARS.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t"
                style={{ height: `${h}%`, background: i === 4 ? 'var(--pl-blue)' : 'var(--pl-blue-light)' }}
              />
              <span className="text-[10px] hidden sm:block" style={{ color: 'var(--pl-text-secondary)' }}>{MONTHS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent payments */}
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--pl-border)' }}>
          <p className="font-semibold text-sm" style={{ color: 'var(--pl-text)' }}>Recent Payments</p>
          <a href="/payments" className="text-xs font-medium" style={{ color: 'var(--pl-blue)' }}>View all</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--pl-bg)' }}>
                {['Name', 'Class', 'Fee', 'Amount', 'Dedicated Account', 'Date', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-medium" style={{ color: 'var(--pl-text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_PAYMENTS.map((row, i) => (
                <tr key={i} className="border-t" style={{ borderColor: 'var(--pl-border)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{row.name}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{row.class}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{row.fee}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{row.amount}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--pl-text-secondary)' }}>{row.account}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{row.date}</td>
                  <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
