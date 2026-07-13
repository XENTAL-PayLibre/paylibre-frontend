'use client';

import { DollarSign, Users, CheckCircle, AlertCircle, Download } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { useMe } from '@/api/auth';
import { useDashboardOverview } from '@/api/dashboard';

function formatMoney(kobo: number | undefined) {
  if (kobo === undefined) return '₦0.00';
  return `₦${(kobo / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function DashboardPage() {
  const { data: user, isLoading: isLoadingUser } = useMe();
  const { data: overview, isLoading: isLoadingOverview } = useDashboardOverview();

  // Scale chart bars relative to the maximum series value
  const series = overview?.revenueSeries || [];
  const maxAmount = Math.max(...series.map(item => item.amountKobo), 0);

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>Dashboard</h1>
          <div className="text-sm mt-0.5 flex items-center gap-1.5 h-5" style={{ color: 'var(--pl-text-secondary)' }}>
            <span>Welcome back,</span>
            {isLoadingUser ? (
              <span className="inline-block w-40 h-4 bg-gray-200 rounded animate-pulse" />
            ) : (
              <span className="font-medium text-pl-text">{user?.school?.name}</span>
            )}
          </div>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white cursor-pointer"
          style={{ background: 'var(--pl-blue)' }}
        >
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Revenue"
          value={isLoadingOverview ? '₦...' : formatMoney(overview?.collectedKobo)}
          sub="This term"
          icon={DollarSign}
        />
        <StatCard
          label="Total Students"
          value={isLoadingOverview ? '...' : (overview?.totalStudents ?? 0).toLocaleString()}
          sub="Enrolled"
          icon={Users}
          iconBg="var(--pl-green-bg)"
          iconColor="var(--pl-green)"
        />
        <StatCard
          label="Paid"
          value={isLoadingOverview ? '...' : (overview?.paidInvoices ?? 0).toLocaleString()}
          sub={isLoadingOverview ? '... collection' : `${overview?.collectionRatePct ?? 0}% collection`}
          icon={CheckCircle}
          iconBg="var(--pl-green-bg)"
          iconColor="var(--pl-green)"
        />
        <StatCard
          label="Due"
          value={isLoadingOverview ? '...' : (overview?.overdueInvoices ?? 0).toLocaleString()}
          sub="Needs attention"
          icon={AlertCircle}
          iconBg="var(--pl-red-bg)"
          iconColor="var(--pl-red)"
        />
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-xl border p-5" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--pl-text)' }}>Revenue Growth</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Last 12 months</p>
          </div>
          <select className="text-xs border rounded-lg px-2.5 py-1.5 outline-none cursor-pointer" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
            <option>Last 12 months</option>
            <option>Last 6 months</option>
            <option>This term</option>
          </select>
        </div>
        <div className="flex items-end gap-2 h-36">
          {isLoadingOverview ? (
            <div className="flex-1 h-full bg-gray-50 rounded flex items-center justify-center text-sm text-pl-text-secondary">
              Loading chart data...
            </div>
          ) : series.length === 0 ? (
            <div className="flex-1 h-full bg-gray-50 rounded flex items-center justify-center text-sm text-pl-text-secondary">
              No revenue records for this period.
            </div>
          ) : (
            series.map((item, i) => {
              const pctHeight = maxAmount > 0 ? (item.amountKobo / maxAmount) * 90 + 10 : 10;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t transition-all duration-500"
                    style={{
                      height: `${pctHeight}%`,
                      background: i === series.length - 1 ? 'var(--pl-blue)' : 'var(--pl-blue-light)'
                    }}
                    title={`${item.month}: ${formatMoney(item.amountKobo)}`}
                  />
                  <span className="text-[10px] hidden sm:block" style={{ color: 'var(--pl-text-secondary)' }}>{item.month}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Recent payments */}
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--pl-border)' }}>
          <p className="font-semibold text-sm" style={{ color: 'var(--pl-text)' }}>Recent Payments</p>
          <a href="/dashboard/payments" className="text-xs font-medium" style={{ color: 'var(--pl-blue)' }}>View all</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--pl-bg)' }}>
                {['Name', 'Admission No.', 'Amount', 'Date'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-sm font-medium" style={{ color: 'var(--pl-text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoadingOverview ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <tr key={idx} className="border-t animate-pulse" style={{ borderColor: 'var(--pl-border)' }}>
                    <td className="px-4 py-4"><div className="h-4 w-32 bg-gray-200 rounded" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                  </tr>
                ))
              ) : !overview?.recent || overview.recent.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-pl-text-secondary text-sm">
                    No recent payments recorded.
                  </td>
                </tr>
              ) : (
                overview.recent.map((row, i) => (
                  <tr key={row.studentId || i} className="border-t hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--pl-border)' }}>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{row.studentName}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{row.admissionNo || '—'}</td>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{formatMoney(row.amountKobo)}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>
                      {row.occurredAtUtc ? new Date(row.occurredAtUtc).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
