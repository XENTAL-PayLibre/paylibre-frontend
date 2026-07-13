'use client';

import { useState } from 'react';
import { Search, MoreVertical, Trash2 } from 'lucide-react';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { useFees, useFeeCategories, useDeleteFee } from '@/api/fees';
import { useClasses } from '@/api/classes';
import ConfirmModal from '@/components/dashboard/ConfirmModal';

interface FeeTableProps {
  onRowClick: (feeId: string) => void;
}

const ITEMS_PER_PAGE = 5;

function formatMoney(kobo: number | undefined) {
  if (kobo === undefined) return '₦0.00';
  const naira = kobo / 100;
  return `₦${naira.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function FeeTable({ onRowClick }: FeeTableProps) {
  // Search & Filter state
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('Class');
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const [selectedStatus, setSelectedStatus] = useState('Status');

  // Pagination state
  const [feesPage, setFeesPage] = useState(1);

  // Popup menu / Action targets state
  const [activeFeeActionsId, setActiveFeeActionsId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Queries
  const { data: fees, isLoading: isLoadingFees } = useFees({
    classId: selectedClass === 'Class' ? undefined : selectedClass,
    categoryId: selectedCategory === 'Category' ? undefined : selectedCategory,
    status: selectedStatus === 'Status' ? undefined : selectedStatus,
  });

  const { data: categories } = useFeeCategories();
  const { data: classes } = useClasses();

  // Mutations
  const deleteFee = useDeleteFee();

  const filteredFees = (fees || []).filter(fee =>
    fee.name.toLowerCase().includes(search.toLowerCase()) ||
    (fee.categoryName || '').toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculations
  const totalFees = filteredFees.length;
  const totalFeesPages = Math.max(1, Math.ceil(totalFees / ITEMS_PER_PAGE));
  const startIndexFees = (feesPage - 1) * ITEMS_PER_PAGE;
  const paginatedFees = filteredFees.slice(startIndexFees, startIndexFees + ITEMS_PER_PAGE);

  // Handle Search input change
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setFeesPage(1);
  };

  const handleConfirmDeleteFee = () => {
    if (deleteTargetId) {
      deleteFee.mutate(deleteTargetId, {
        onSuccess: () => {
          setDeleteTargetId(null);
        }
      });
    }
  };

  return (
    <>
      {/* Dynamic Filters Bar */}
      <div className="px-5 py-3 border-b flex flex-col sm:flex-row sm:items-center gap-3 animate-fade-in rounded-t-xl" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="flex items-center gap-2 w-full sm:max-w-xs border rounded-lg px-2.5 py-1.5" style={{ borderColor: 'var(--pl-border)' }}>
          <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--pl-text-secondary)' }} />
          <input
            value={search}
            onChange={e => handleSearchChange(e.target.value)}
            placeholder="Search by name or category"
            className="bg-transparent text-sm outline-none flex-1 text-pl-text"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
          <select
            value={selectedClass}
            onChange={e => { setSelectedClass(e.target.value); setFeesPage(1); }}
            className="flex-1 sm:flex-initial text-xs border rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}
          >
            <option value="Class">Class</option>
            {classes?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select
            value={selectedCategory}
            onChange={e => { setSelectedCategory(e.target.value); setFeesPage(1); }}
            className="flex-1 sm:flex-initial text-xs border rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}
          >
            <option value="Category">Category</option>
            {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select
            value={selectedStatus}
            onChange={e => { setSelectedStatus(e.target.value); setFeesPage(1); }}
            className="flex-1 sm:flex-initial text-xs border rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}
          >
            <option value="Status">Status</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Dynamic Table Body */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm animate-fade-in">
          <thead>
            <tr style={{ background: 'var(--pl-bg)' }}>
              {['Name','Class','Term','Category','Amount','Students Assigned','Actions'].map((h,i) => (
                <th key={i} className={`px-4 py-2.5 text-sm font-medium ${h === 'Actions' ? 'text-right' : 'text-left'}`} style={{ color: 'var(--pl-text-secondary)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoadingFees ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="border-t" style={{ borderColor: 'var(--pl-border)' }}>
                  <td className="px-4 py-4"><div className="h-4 w-36 bg-gray-200 rounded animate-pulse" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-16 bg-gray-200 rounded animate-pulse" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-16 bg-gray-200 rounded animate-pulse" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-20 bg-gray-200 rounded animate-pulse" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-16 bg-gray-200 rounded animate-pulse" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-12 bg-gray-200 rounded animate-pulse" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-4 bg-gray-200 rounded animate-pulse" /></td>
                </tr>
              ))
            ) : paginatedFees.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-pl-text-secondary text-sm">
                  No fees created yet.
                </td>
              </tr>
            ) : (
              paginatedFees.map(fee => (
                <tr
                  key={fee.id}
                  className="border-t hover:bg-gray-50 cursor-pointer transition-colors"
                  style={{ borderColor: 'var(--pl-border)' }}
                  onClick={() => onRowClick(fee.id)}
                >
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{fee.name}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>
                    {fee.className || classes?.find(c => c.id === fee.classId)?.name || fee.classId}
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{fee.term}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{fee.categoryName || '—'}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{formatMoney(fee.amountKobo)}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{(fee.students ?? 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="relative inline-block text-left">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveFeeActionsId(activeFeeActionsId === fee.id ? null : fee.id);
                        }}
                        className="text-pl-text-secondary hover:text-pl-text cursor-pointer p-1.5 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                        title="Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {activeFeeActionsId === fee.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setActiveFeeActionsId(null); }} />
                          <div className="absolute right-0 top-full mt-1.5 w-32 bg-white border rounded-lg z-20 overflow-hidden flex flex-col py-1 shadow-lg animate-fade-in" style={{ borderColor: '#cbd5e1' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveFeeActionsId(null);
                                onRowClick(fee.id);
                              }}
                              className="flex items-center gap-2 px-3 py-2 text-xs text-pl-text hover:bg-gray-50 cursor-pointer w-full transition-colors font-medium text-left"
                            >
                              View Details
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveFeeActionsId(null);
                                setDeleteTargetId(fee.id);
                              }}
                              className="flex items-center gap-2 px-3 py-2 text-xs text-destructive hover:bg-gray-50 cursor-pointer w-full transition-colors font-medium border-t text-left animate-fade-in"
                              style={{ borderColor: 'var(--pl-border)' }}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete Fee
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-5 py-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs rounded-b-xl animate-fade-in" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
        <span className="text-center sm:text-left">
          {totalFees === 0
            ? 'Showing 0 of 0 fees'
            : `Showing ${startIndexFees + 1}-${Math.min(startIndexFees + ITEMS_PER_PAGE, totalFees)} of ${totalFees} fees`
          }
        </span>
        <div className="flex items-center justify-center gap-1 w-full sm:w-auto">
          <button
            disabled={feesPage === 1}
            onClick={() => setFeesPage(p => Math.max(1, p - 1))}
            className="px-2.5 py-1 rounded border text-xs font-medium cursor-pointer transition-colors bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}
          >
            Previous
          </button>
          {Array.from({ length: totalFeesPages }).map((_, idx) => {
            const p = idx + 1;
            const isActive = feesPage === p;
            return (
              <button
                key={p}
                onClick={() => setFeesPage(p)}
                className="px-2.5 py-1 rounded border text-xs font-medium cursor-pointer transition-colors"
                style={isActive
                  ? { background: 'var(--pl-blue)', color: '#ffffff', borderColor: 'var(--pl-blue)' }
                  : { borderColor: 'var(--pl-border)', color: 'var(--pl-text)', background: '#ffffff' }
                }
              >
                {p}
              </button>
            );
          })}
          <button
            disabled={feesPage === totalFeesPages}
            onClick={() => setFeesPage(p => Math.min(totalFeesPages, p + 1))}
            className="px-2.5 py-1 rounded border text-xs font-medium cursor-pointer transition-colors bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Fee Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDeleteFee}
        title="Delete Fee"
        message="Are you sure you want to delete this fee and all generated student invoices? This action cannot be undone."
        isPending={deleteFee.isPending}
      />
    </>
  );
}
