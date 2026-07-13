'use client';

import { useState } from 'react';
import { Download, Search, DollarSign, TrendingUp, Users } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { usePayments } from '@/api/payments';
import { useDashboardOverview } from '@/api/dashboard';

function formatMoney(kobo: number | undefined) {
  if (kobo === undefined) return '₦0.00';
  return `₦${(kobo / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function PaymentsPage() {
  const [search, setSearch] = useState('');

  // Fetch dynamic payments list and overview metrics
  const { data: payments, isLoading } = usePayments({ take: 100 });
  const { data: overview, isLoading: isLoadingOverview } = useDashboardOverview();

  // Search filtering
  const filteredPayments = (payments || []).filter(p =>
    p.studentName.toLowerCase().includes(search.toLowerCase()) ||
    (p.admissionNo || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.payerName || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>Payments</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>View and manage all fee payments</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border cursor-pointer" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}>
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Collected"
          value={isLoadingOverview ? '₦...' : formatMoney(overview?.collectedKobo)}
          icon={DollarSign}
        />
        <StatCard
          label="Transactions"
          value={isLoadingOverview ? '...' : (overview?.payments ?? 0).toLocaleString()}
          icon={TrendingUp}
          iconBg="var(--pl-green-bg)"
          iconColor="var(--pl-green)"
        />
        <StatCard
          label="Pending"
          value={isLoadingOverview ? '...' : (overview?.overdueInvoices ?? 0).toLocaleString()}
          icon={Users}
          iconBg="var(--pl-amber-bg)"
          iconColor="var(--pl-amber)"
        />
      </div>

      {/* Roster list table */}
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--pl-border)' }}>
          <div className="flex items-center gap-2 flex-1 max-w-xs border rounded-lg px-3 py-1.5 animate-fade-in" style={{ borderColor: 'var(--pl-border)' }}>
            <Search className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--pl-text-secondary)' }} />
            <input
              placeholder="Search payments by student or payer"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="text-xs outline-none bg-transparent flex-1"
              style={{ color: 'var(--pl-text)' }}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--pl-bg)' }}>
                {['Name', 'Admission No.', 'Payer Name', 'Amount Paid', 'Date'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-sm font-medium" style={{ color: 'var(--pl-text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <tr key={idx} className="border-t animate-pulse" style={{ borderColor: 'var(--pl-border)' }}>
                    <td className="px-4 py-4"><div className="h-4 w-32 bg-gray-200 rounded" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-24 bg-gray-200 rounded" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                    <td className="px-4 py-4"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
                  </tr>
                ))
              ) : filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-pl-text-secondary text-sm">
                    No matching payments found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((row, i) => (
                  <tr key={row.id || i} className="border-t hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--pl-border)' }}>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{row.studentName}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{row.admissionNo || '—'}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{row.payerName || '—'}</td>
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
        <div className="px-4 py-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
          <span>Showing {filteredPayments.length} of {(payments || []).length} payments</span>
        </div>
      </div>
    </div>
  );
}
