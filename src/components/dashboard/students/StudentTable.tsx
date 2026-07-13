'use client';

import Link from 'next/link';
import { Search, ChevronRight } from 'lucide-react';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { Student } from '@/api/types/students';
import { useClasses } from '@/api/classes';

interface StudentTableProps {
  students: Student[];
  isLoading: boolean;
  onRowClick: (student: Student) => void;
  selectedClass: string;
  setSelectedClass: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  search: string;
  setSearch: (val: string) => void;
}

export default function StudentTable({
  students,
  isLoading,
  onRowClick,
  selectedClass,
  setSelectedClass,
  selectedStatus,
  setSelectedStatus,
  search,
  setSearch,
}: StudentTableProps) {
  const { data: classes } = useClasses();

  const filtered = students.filter((s) =>
    s.fullName.toLowerCase().includes(search.toLowerCase()) ||
    s.admissionNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--pl-border)' }}>
      {/* Filters Bar */}
      <div className="px-5 py-3 border-b flex flex-col sm:flex-row sm:items-center gap-3" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="flex items-center gap-2 w-full sm:max-w-xs border rounded-lg px-2.5 py-1.5" style={{ borderColor: 'var(--pl-border)' }}>
          <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--pl-text-secondary)' }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or ID"
            className="bg-transparent text-sm outline-none flex-1 text-pl-text"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="flex-1 sm:flex-initial text-xs border rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}
          >
            <option value="All Classes">All Classes</option>
            {classes?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="flex-1 sm:flex-initial text-xs border rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}
          >
            <option>All Status</option>
            <option>Paid</option><option>Partial</option><option>Due</option>
          </select>
        </div>
      </div>

      {/* Roster Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--pl-bg)' }}>
              <th className="text-left px-4 py-2.5 text-sm font-medium hidden md:table-cell" style={{ color: 'var(--pl-text-secondary)' }}>Admission No.</th>
              <th className="text-left px-4 py-2.5 text-sm font-medium" style={{ color: 'var(--pl-text-secondary)' }}>Name</th>
              <th className="text-left px-4 py-2.5 text-sm font-medium" style={{ color: 'var(--pl-text-secondary)' }}>Class</th>
              <th className="text-left px-4 py-2.5 text-sm font-medium hidden md:table-cell" style={{ color: 'var(--pl-text-secondary)' }}>Parent/Guardian</th>
              <th className="text-left px-4 py-2.5 text-sm font-medium hidden sm:table-cell" style={{ color: 'var(--pl-text-secondary)' }}>Dedicated Account</th>
              <th className="text-left px-4 py-2.5 text-sm font-medium" style={{ color: 'var(--pl-text-secondary)' }}>Status</th>
              <th className="text-left px-4 py-2.5 text-sm font-medium" style={{ color: 'var(--pl-text-secondary)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <tr key={idx} className="border-t" style={{ borderColor: 'var(--pl-border)' }}>
                  <td className="px-4 py-4 hidden md:table-cell"><div className="h-4 w-16 bg-gray-200 rounded animate-pulse" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-36 bg-gray-200 rounded animate-pulse" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-12 bg-gray-200 rounded animate-pulse" /></td>
                  <td className="px-4 py-4 hidden md:table-cell"><div className="h-4 w-28 bg-gray-200 rounded animate-pulse" /></td>
                  <td className="px-4 py-4 hidden sm:table-cell"><div className="h-4 w-32 bg-gray-200 rounded animate-pulse" /></td>
                  <td className="px-4 py-4"><div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-10 bg-gray-200 rounded animate-pulse" /></td>
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-pl-text-secondary text-sm">
                  No students found.
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr
                  key={row.id || i}
                  onClick={() => onRowClick(row)}
                  className="border-t hover:bg-gray-50 cursor-pointer transition-colors"
                  style={{ borderColor: 'var(--pl-border)' }}
                >
                  <td className="px-4 py-3 text-sm font-mono hidden md:table-cell" style={{ color: 'var(--pl-text-secondary)' }}>{row.admissionNo}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{row.fullName}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>
                    {classes?.find(c => c.id === (row.classId || row.class))?.name || row.class || '—'}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell" style={{ color: 'var(--pl-text-secondary)' }}>{row.guardianName}</td>
                  <td className="px-4 py-3 font-mono text-sm hidden sm:table-cell" style={{ color: 'var(--pl-text-secondary)' }}>
                    {row.nuban || row.virtualAccount?.accountNumber || '—'}
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <Link
                      href={`/dashboard/students/${row.id}`}
                      className="text-pl-blue hover:opacity-85 inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-100 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
        <span className="text-center sm:text-left">Showing {filtered.length} of {students.length} students</span>
        <div className="flex items-center justify-center gap-1 w-full sm:w-auto">
          {['Previous', '1', '2', '3', 'Next'].map((p) => {
            const isActive = p === '1';
            const isNav = p === 'Previous' || p === 'Next';
            return (
              <button
                key={p}
                className="px-2.5 py-1 rounded border text-xs font-medium cursor-pointer transition-colors"
                style={isActive
                  ? { background: 'var(--pl-blue)', color: '#ffffff', borderColor: 'var(--pl-blue)' }
                  : { borderColor: 'var(--pl-border)', color: isNav ? 'var(--pl-text-secondary)' : 'var(--pl-text)', background: '#ffffff' }
                }
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
