'use client';

import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, GraduationCap, MoreVertical } from 'lucide-react';
import { useClasses, useDeleteClass } from '@/api/classes';
import { ClassRoom } from '@/api/types/classes';
import AddClassModal from '@/components/dashboard/students/AddClassModal';
import ConfirmModal from '@/components/dashboard/ConfirmModal';

export default function ClassesPage() {
  const { data: classes, isLoading } = useClasses();
  const deleteClass = useDeleteClass();

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassRoom | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ClassRoom | null>(null);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  const handleEditClick = (cls: ClassRoom) => {
    setEditingClass(cls);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (cls: ClassRoom) => {
    setDeleteTarget(cls);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteClass.mutate(deleteTarget.id);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingClass(null);
  };

  // Filter classes based on search
  const filtered = classes?.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.session.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>Classes</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Configure school classrooms and academic sessions</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity w-full sm:w-auto"
          style={{ background: 'var(--pl-blue)' }}
        >
          <Plus className="w-3.5 h-3.5" />
          Add Class
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border" style={{ borderColor: 'var(--pl-border)' }}>
        {/* Filters Bar */}
        <div className="px-5 py-3 border-b flex flex-col sm:flex-row sm:items-center gap-3 rounded-t-xl" style={{ borderColor: 'var(--pl-border)' }}>
          <div className="flex items-center gap-2 w-full sm:max-w-xs border rounded-lg px-2.5 py-1.5" style={{ borderColor: 'var(--pl-border)' }}>
            <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--pl-text-secondary)' }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or session"
              className="bg-transparent text-sm outline-none flex-1 text-pl-text"
            />
          </div>
        </div>

        {/* Classes Table */}
        <div className="w-full">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--pl-bg)' }}>
                <th className="text-left px-5 py-2.5 text-sm font-medium" style={{ color: 'var(--pl-text-secondary)' }}>Class Name</th>
                <th className="text-left px-5 py-2.5 text-sm font-medium" style={{ color: 'var(--pl-text-secondary)' }}>Academic Session</th>
                <th className="text-right px-5 py-2.5 text-sm font-medium" style={{ color: 'var(--pl-text-secondary)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <tr key={idx} className="border-t" style={{ borderColor: 'var(--pl-border)' }}>
                    <td className="px-5 py-4"><div className="h-4 w-36 bg-gray-200 rounded animate-pulse" /></td>
                    <td className="px-5 py-4"><div className="h-4 w-24 bg-gray-200 rounded animate-pulse" /></td>
                    <td className="px-5 py-4 flex justify-end gap-3"><div className="h-4 w-12 bg-gray-200 rounded animate-pulse" /></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-pl-text-secondary text-sm">
                    No classes found.
                  </td>
                </tr>
              ) : (
                filtered.map((cls, i) => (
                  <tr
                    key={cls.id || i}
                    className="border-t hover:bg-gray-50 transition-colors"
                    style={{ borderColor: 'var(--pl-border)' }}
                  >
                    <td className="px-5 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-pl-blue" />
                        {cls.name}
                      </div>
                    </td>
                    <td className="px-5 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{cls.session}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdownId(activeDropdownId === cls.id ? null : cls.id);
                          }}
                          className="text-pl-text-secondary hover:text-pl-text cursor-pointer p-1.5 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                          title="Actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        
                        {activeDropdownId === cls.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setActiveDropdownId(null); }} />
                            <div className="absolute right-0 top-full mt-1.5 w-32 bg-white border rounded-lg z-20 overflow-hidden flex flex-col py-1" style={{ borderColor: '#cbd5e1' }}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditClick(cls);
                                  setActiveDropdownId(null);
                                }}
                                className="flex items-center gap-2 px-3 py-2 text-xs text-pl-text hover:bg-gray-50 cursor-pointer w-full transition-colors font-medium"
                              >
                                <Edit2 className="w-3.5 h-3.5 text-pl-text-secondary" />
                                Edit Class
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteClick(cls);
                                  setActiveDropdownId(null);
                                }}
                                className="flex items-center gap-2 px-3 py-2 text-xs text-destructive hover:bg-gray-50 cursor-pointer w-full transition-colors font-medium border-t"
                                style={{ borderColor: 'var(--pl-border)' }}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
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

        {/* Centered Footer Pagination Details */}
        <div className="px-5 py-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs rounded-b-xl" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
          <span className="text-center sm:text-left">Showing {filtered.length} of {classes?.length || 0} classes</span>
          <div className="flex items-center justify-center gap-1 w-full sm:w-auto">
            {['Previous', '1', 'Next'].map((p) => {
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

      {/* Generalized Add / Edit Class Modal */}
      <AddClassModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        editingClass={editingClass}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Class"
        message={deleteTarget ? `Are you sure you want to delete class "${deleteTarget.name}"? This action cannot be undone.` : ''}
        isPending={deleteClass.isPending}
      />
    </div>
  );
}
