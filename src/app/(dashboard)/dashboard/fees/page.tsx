'use client';

import { useState } from 'react';
import { Plus, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { useFeeSummary } from '@/api/fees';
import AddCategoryModal from '@/components/dashboard/fees/AddCategoryModal';
import AddFeeModal from '@/components/dashboard/fees/AddFeeModal';
import FeeTable from '@/components/dashboard/fees/FeeTable';
import CategoryTable from '@/components/dashboard/fees/CategoryTable';
import FeeDetailView from '@/components/dashboard/fees/FeeDetailView';

type Tab = 'fees' | 'categories';

function formatLargeMoney(kobo: number | undefined) {
  if (kobo === undefined) return '₦0';
  const naira = kobo / 100;
  if (naira >= 1_000_000) {
    return `₦${(naira / 1_000_000).toFixed(1)}M`;
  }
  if (naira >= 1_000) {
    return `₦${(naira / 1_000).toFixed(0)}k`;
  }
  return `₦${naira.toLocaleString()}`;
}

export default function FeesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('fees');
  const [viewDetailsId, setViewDetailsId] = useState<string | null>(null);
  const [isCreateFeeOpen, setIsCreateFeeOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Queries
  const { data: summary, isLoading: isLoadingSummary } = useFeeSummary();

  // If in details view, render the modular details panel
  if (viewDetailsId) {
    return (
      <FeeDetailView
        id={viewDetailsId}
        onClose={() => setViewDetailsId(null)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      {/* Header section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>Fees</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Manage academic fees here</p>
        </div>
        <div className="flex items-center gap-2">
          {activeTab === 'fees' ? (
            <button
              onClick={() => setIsCreateFeeOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity"
              style={{ background: 'var(--pl-blue)' }}
            >
              <Plus className="w-3.5 h-3.5" />
              Create Fee
            </button>
          ) : (
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity"
              style={{ background: 'var(--pl-blue)' }}
            >
              <Plus className="w-3.5 h-3.5" />
              Create Category
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards (Always Visible at the top level) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Expected"
          value={isLoadingSummary ? '₦...' : formatLargeMoney(summary?.totalInvoicedKobo)}
          icon={DollarSign}
          layout="figma"
        />
        <StatCard
          label="Amount Collected"
          value={isLoadingSummary ? '₦...' : formatLargeMoney(summary?.collectedKobo)}
          icon={TrendingUp}
          iconBg="var(--pl-green-bg)"
          iconColor="var(--pl-green)"
          layout="figma"
        />
        <StatCard
          label="Outstanding Balance"
          value={isLoadingSummary ? '₦...' : formatLargeMoney(summary?.outstandingKobo)}
          icon={AlertCircle}
          iconBg="var(--pl-red-bg)"
          iconColor="var(--pl-red)"
          layout="figma"
        />
      </div>

      {/* Tabs Menu (Positioned between cards and table) */}
      <div className="flex items-center gap-6 border-b text-sm font-medium mt-1" style={{ borderColor: 'var(--pl-border)' }}>
        <button
          onClick={() => setActiveTab('fees')}
          className={`pb-3 -mb-px border-b-2 cursor-pointer transition-all ${
            activeTab === 'fees'
              ? 'border-pl-blue text-pl-blue font-bold'
              : 'border-transparent text-pl-text-secondary hover:text-pl-text'
          }`}
        >
          Fees List
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-3 -mb-px border-b-2 cursor-pointer transition-all ${
            activeTab === 'categories'
              ? 'border-pl-blue text-pl-blue font-bold'
              : 'border-transparent text-pl-text-secondary hover:text-pl-text'
          }`}
        >
          Manage Categories
        </button>
      </div>

      {/* Fixed Table card wrapper - Only content inside changes */}
      <div className="bg-white rounded-xl border" style={{ borderColor: 'var(--pl-border)' }}>
        {activeTab === 'fees' ? (
          <FeeTable onRowClick={setViewDetailsId} />
        ) : (
          <CategoryTable />
        )}
      </div>

      {/* Create Fee Modal component */}
      <AddFeeModal
        isOpen={isCreateFeeOpen}
        onClose={() => setIsCreateFeeOpen(false)}
      />

      {/* Create Category Modal component */}
      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </div>
  );
}
