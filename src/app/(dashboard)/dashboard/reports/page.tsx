'use client';

import { Download, DollarSign, TrendingUp, Users, AlertCircle } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { useDashboardOverview } from '@/api/dashboard';
import { useOutstandingReport, useCollectionsReport } from '@/api/reports';

function formatMoney(kobo: number | undefined) {
  if (kobo === undefined) return '₦0.00';
  return `₦${(kobo / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function ReportsPage() {
  // Fetch overview for the metric stat cards
  const { data: overview, isLoading: isLoadingOverview } = useDashboardOverview();

  // Fetch report data
  const { data: outstanding, isLoading: isLoadingOutstanding } = useOutstandingReport();
  const { data: collections, isLoading: isLoadingCollections } = useCollectionsReport();

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>Reports</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Financial overview and analytics</p>
        </div>
        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white cursor-pointer"
          style={{ background: 'var(--pl-blue)' }}
        >
          <Download className="w-3.5 h-3.5" />
          Export Report
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Expected"
          value={isLoadingOverview ? '₦...' : formatMoney(overview?.invoicedKobo)}
          icon={DollarSign}
        />
        <StatCard
          label="Total Collected"
          value={isLoadingOverview ? '₦...' : formatMoney(overview?.collectedKobo)}
          icon={TrendingUp}
          iconBg="var(--pl-green-bg)"
          iconColor="var(--pl-green)"
        />
        <StatCard
          label="Total Students"
          value={isLoadingOverview ? '...' : (overview?.totalStudents ?? 0).toLocaleString()}
          icon={Users}
          iconBg="var(--pl-blue-light)"
          iconColor="var(--pl-blue)"
        />
        <StatCard
          label="Outstanding"
          value={isLoadingOverview ? '₦...' : formatMoney(overview?.outstandingKobo)}
          icon={AlertCircle}
          iconBg="var(--pl-red-bg)"
          iconColor="var(--pl-red)"
        />
      </div>

      {/* Class Collections Report */}
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--pl-border)' }}>
          <p className="font-semibold text-sm" style={{ color: 'var(--pl-text)' }}>Class Collections Breakdown</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Invoiced, collected, and outstanding balances rolled up per class</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--pl-bg)' }}>
                {['Class Name', 'Invoiced', 'Collected', 'Outstanding', 'Collection Rate'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-sm font-medium" style={{ color: 'var(--pl-text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoadingCollections ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx} className="border-t animate-pulse" style={{ borderColor: 'var(--pl-border)' }}>
                    <td className="px-4 py-4"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-16 bg-gray-200 rounded" /></td>
                  </tr>
                ))
              ) : !collections || collections.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-pl-text-secondary text-sm">
                    No class billing data recorded.
                  </td>
                </tr>
              ) : (
                collections.map((row, i) => {
                  const rate = row.invoicedKobo > 0 ? Math.round((row.collectedKobo / row.invoicedKobo) * 100) : 0;
                  return (
                    <tr key={row.classId || i} className="border-t hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--pl-border)' }}>
                      <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{row.className || '—'}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{formatMoney(row.invoicedKobo)}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{formatMoney(row.collectedKobo)}</td>
                      <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{formatMoney(row.outstandingKobo)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold" style={{ color: rate >= 70 ? 'var(--pl-green)' : rate >= 40 ? 'var(--pl-amber)' : 'var(--pl-red)' }}>{rate}%</span>
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                            <div className="h-full rounded-full" style={{ width: `${rate}%`, background: rate >= 70 ? 'var(--pl-green)' : rate >= 40 ? 'var(--pl-amber)' : 'var(--pl-red)' }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Outstanding Students Report */}
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--pl-border)' }}>
          <p className="font-semibold text-sm" style={{ color: 'var(--pl-text)' }}>Outstanding Debts By Student</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Students with outstanding balances, sorted largest first</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--pl-bg)' }}>
                {['Student Name', 'Admission No.', 'Class', 'Outstanding Amount'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-sm font-medium" style={{ color: 'var(--pl-text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoadingOutstanding ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <tr key={idx} className="border-t animate-pulse" style={{ borderColor: 'var(--pl-border)' }}>
                    <td className="px-4 py-4"><div className="h-4 w-32 bg-gray-200 rounded" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-16 bg-gray-200 rounded" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
                  </tr>
                ))
              ) : !outstanding || outstanding.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-pl-text-secondary text-sm">
                    No outstanding student balances found.
                  </td>
                </tr>
              ) : (
                outstanding.map((row, i) => (
                  <tr key={row.studentId || i} className="border-t hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--pl-border)' }}>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{row.studentName}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{row.admissionNo || '—'}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{row.className || '—'}</td>
                    <td className="px-4 py-3 font-semibold text-pl-red" style={{ color: 'var(--pl-red)' }}>{formatMoney(row.outstandingKobo)}</td>
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
