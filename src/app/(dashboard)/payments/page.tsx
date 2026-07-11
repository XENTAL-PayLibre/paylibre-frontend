import { Download, Search } from 'lucide-react';
import StatusBadge from '@/components/dashboard/StatusBadge';
import StatCard from '@/components/dashboard/StatCard';
import { DollarSign, TrendingUp, Users } from 'lucide-react';

const PAYMENTS = [
  { name: 'Chinonso Okeke', class: 'SS1', fee: 'Tuition Fee',    amount: '₦30,200', account: '8061762007', date: '30-04-2026', status: 'Paid' as const },
  { name: 'Amara Eze',       class: 'SS2', fee: 'ICT Fee',       amount: '₦8,750',  account: '4928375610', date: '03-05-2026', status: 'Partial' as const },
  { name: 'Tunde Adeyemi',   class: 'SS3', fee: 'WAEC Fee',      amount: '₦30,200', account: '7712309842', date: '30-04-2026', status: 'Paid' as const },
  { name: 'Ngozi Okafor',    class: 'JS3', fee: 'Tuition Fee',   amount: '₦0',      account: '—',          date: '03-05-2026', status: 'Due' as const },
  { name: 'Emeka Obi',       class: 'SS1', fee: 'Transport Fee', amount: '₦60,750', account: '8061762008', date: '30-04-2026', status: 'Paid' as const },
  { name: 'Fatima Bello',    class: 'JS1', fee: 'Tuition Fee',   amount: '₦18,750', account: '9032145678', date: '03-05-2026', status: 'Partial' as const },
  { name: 'Ibrahim Musa',    class: 'SS2', fee: 'Development',   amount: '₦30,200', account: '7745612309', date: '02-05-2026', status: 'Paid' as const },
  { name: 'Chisom Onyeka',   class: 'JS2', fee: 'Tuition Fee',   amount: '₦0',      account: '—',          date: '03-05-2026', status: 'Due' as const },
];

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>Payments</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>View and manage all fee payments</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}>
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Collected" value="₦550,000" sub="This term"       icon={DollarSign} />
        <StatCard label="Transactions"    value="1,820"    sub="This term"        icon={TrendingUp} iconBg="var(--pl-green-bg)" iconColor="var(--pl-green)" />
        <StatCard label="Pending"         value="630"      sub="Awaiting payment" icon={Users}      iconBg="var(--pl-amber-bg)" iconColor="var(--pl-amber)" />
      </div>

      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="px-5 py-3 border-b flex items-center gap-3" style={{ borderColor: 'var(--pl-border)' }}>
          <div className="flex items-center gap-2 flex-1 max-w-xs border rounded-lg px-3 py-1.5" style={{ borderColor: 'var(--pl-border)' }}>
            <Search className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--pl-text-secondary)' }} />
            <input placeholder="Search payments" className="text-xs outline-none bg-transparent flex-1" style={{ color: 'var(--pl-text)' }} />
          </div>
          {['Class', 'Fee', 'Status', 'Date'].map(f => (
            <select key={f} className="text-xs border rounded-lg px-2.5 py-1.5 outline-none" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
              <option>{f}</option>
            </select>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--pl-bg)' }}>
                {['Name','Class','Fee','Amount','Dedicated Account','Date','Status'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-medium" style={{ color: 'var(--pl-text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAYMENTS.map((row, i) => (
                <tr key={i} className="border-t hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--pl-border)' }}>
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
        <div className="px-4 py-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
          <span>Showing 8 of 1,820 payments</span>
          <div className="flex items-center gap-1">
            {['Previous','1','2','3','...','Next'].map(p => (
              <button key={p} className="px-2.5 py-1 rounded border" style={{ borderColor: 'var(--pl-border)' }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
