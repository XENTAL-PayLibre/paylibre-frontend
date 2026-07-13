'use client';

import { useState } from 'react';
import { X, Trash2, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import StatusBadge from '@/components/dashboard/StatusBadge';
import ConfirmModal from '@/components/dashboard/ConfirmModal';
import { useFeeDetails, useDeleteFee } from '@/api/fees';
import { useClasses } from '@/api/classes';

interface FeeDetailViewProps {
  id: string;
  onClose: () => void;
}

function formatMoney(kobo: number | undefined) {
  if (kobo === undefined) return '₦0.00';
  const naira = kobo / 100;
  return `₦${naira.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function FeeDetailView({ id, onClose }: FeeDetailViewProps) {
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Queries
  const { data: feeDetails, isLoading: isLoadingDetails } = useFeeDetails(id);
  const { data: classes } = useClasses();

  // Mutations
  const deleteFee = useDeleteFee();

  const handleConfirmDeleteFee = () => {
    if (deleteTargetId) {
      deleteFee.mutate(deleteTargetId, {
        onSuccess: () => {
          setDeleteTargetId(null);
          onClose(); // return to list after deletion
        }
      });
    }
  };

  if (isLoadingDetails) {
    return (
      <div className="flex flex-col gap-5 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-9 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-28 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-28 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-28 bg-gray-200 rounded-xl animate-pulse" />
        </div>
        <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!feeDetails) {
    return (
      <div className="text-center py-8 text-pl-text-secondary text-sm">
        Failed to load fee details.
        <button onClick={onClose} className="mt-2 text-pl-blue underline block mx-auto">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>{feeDetails.fee.name}</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>
            {feeDetails.fee.className || classes?.find(c => c.id === feeDetails.fee.classId)?.name || feeDetails.fee.classId} • {feeDetails.fee.term} Term • {feeDetails.fee.session}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border cursor-pointer hover:bg-gray-50 transition-colors"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
          >
            <X className="w-3.5 h-3.5" /> Close Details
          </button>
          <button
            onClick={() => setDeleteTargetId(feeDetails.fee.id)}
            disabled={deleteFee.isPending}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ background: 'var(--pl-red)' }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            {deleteFee.isPending ? 'Deleting...' : 'Delete Fee'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Expected"
          value={formatMoney(feeDetails.fee.invoicedKobo)}
          icon={DollarSign}
          layout="figma"
        />
        <StatCard
          label="Amount Collected"
          value={formatMoney(feeDetails.fee.collectedKobo)}
          icon={TrendingUp}
          iconBg="var(--pl-green-bg)"
          iconColor="var(--pl-green)"
          layout="figma"
        />
        <StatCard
          label="Outstanding Balance"
          value={formatMoney(feeDetails.fee.outstandingKobo)}
          icon={AlertCircle}
          iconBg="var(--pl-red-bg)"
          iconColor="var(--pl-red)"
          layout="figma"
        />
      </div>

      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="px-5 py-3.5 border-b" style={{ borderColor: 'var(--pl-border)' }}>
          <p className="font-semibold text-sm text-pl-text">Student Invoices</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--pl-bg)' }}>
                {['Name','Class','Amount Paid','Due Date','Status'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-sm font-medium" style={{ color: 'var(--pl-text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!feeDetails.invoices || feeDetails.invoices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-pl-text-secondary text-sm">
                    No invoices dispatched for this fee.
                  </td>
                </tr>
              ) : (
                feeDetails.invoices.map((row, i) => (
                  <tr key={row.studentId || i} className="border-t" style={{ borderColor: 'var(--pl-border)' }}>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{row.studentName}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{row.className || classes?.find(c => c.id === row.classId)?.name || row.classId}</td>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{formatMoney(row.amountPaidKobo)}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{row.dueDateUtc ? new Date(row.dueDateUtc).toLocaleDateString() : '—'}</td>
                    <td className="px-4 py-3"><StatusBadge status={row.status as any} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDeleteFee}
        title="Delete Fee"
        message="Are you sure you want to delete this fee and all generated student invoices? This action cannot be undone."
        isPending={deleteFee.isPending}
      />
    </div>
  );
}
