'use client';

import { useState } from 'react';
import { Search, MoreVertical, Trash2, Edit2, X } from 'lucide-react';
import { useFeeCategories, useUpdateFeeCategory, useDeleteFeeCategory } from '@/api/fees';
import ConfirmModal from '@/components/dashboard/ConfirmModal';

const ITEMS_PER_PAGE = 5;

export default function CategoryTable() {
  const [search, setSearch] = useState('');
  const [categoriesPage, setCategoriesPage] = useState(1);

  // Popup menu / Action targets state
  const [activeCategoryActionsId, setActiveCategoryActionsId] = useState<string | null>(null);
  const [deleteCategoryTargetId, setDeleteCategoryTargetId] = useState<string | null>(null);
  const [renamingCategory, setRenamingCategory] = useState<{ id: string; name: string } | null>(null);

  // Queries
  const { data: categories, isLoading: isLoadingCategories } = useFeeCategories();

  // Mutations
  const updateCategory = useUpdateFeeCategory();
  const deleteCategory = useDeleteFeeCategory();

  const filteredCategories = (categories || []).filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculations
  const totalCategories = filteredCategories.length;
  const totalCategoriesPages = Math.max(1, Math.ceil(totalCategories / ITEMS_PER_PAGE));
  const startIndexCategories = (categoriesPage - 1) * ITEMS_PER_PAGE;
  const paginatedCategories = filteredCategories.slice(startIndexCategories, startIndexCategories + ITEMS_PER_PAGE);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCategoriesPage(1);
  };

  const handleConfirmDeleteCategory = () => {
    if (deleteCategoryTargetId) {
      deleteCategory.mutate(deleteCategoryTargetId, {
        onSuccess: () => {
          setDeleteCategoryTargetId(null);
        }
      });
    }
  };

  return (
    <>
      {/* Simple Search bar */}
      <div className="px-5 py-3 border-b flex items-center justify-between animate-fade-in rounded-t-xl" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="flex items-center gap-2 w-full sm:max-w-xs border rounded-lg px-2.5 py-1.5" style={{ borderColor: 'var(--pl-border)' }}>
          <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--pl-text-secondary)' }} />
          <input
            value={search}
            onChange={e => handleSearchChange(e.target.value)}
            placeholder="Search category name"
            className="bg-transparent text-sm outline-none flex-1 text-pl-text"
          />
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm animate-fade-in">
          <thead>
            <tr style={{ background: 'var(--pl-bg)' }}>
              <th className="text-left px-5 py-2.5 text-sm font-medium" style={{ color: 'var(--pl-text-secondary)' }}>Category Name</th>
              <th className="text-left px-5 py-2.5 text-sm font-medium" style={{ color: 'var(--pl-text-secondary)' }}>ID Reference</th>
              <th className="text-left px-5 py-2.5 text-sm font-medium w-24" style={{ color: 'var(--pl-text-secondary)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingCategories ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <tr key={idx} className="border-t" style={{ borderColor: 'var(--pl-border)' }}>
                  <td className="px-5 py-4"><div className="h-4 w-32 bg-gray-200 rounded animate-pulse" /></td>
                  <td className="px-5 py-4"><div className="h-4 w-40 bg-gray-200 rounded animate-pulse" /></td>
                  <td className="px-5 py-4"><div className="h-4 w-10 bg-gray-200 rounded animate-pulse" /></td>
                </tr>
              ))
            ) : paginatedCategories.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-pl-text-secondary text-sm">
                  No categories registered.
                </td>
              </tr>
            ) : (
              paginatedCategories.map(cat => (
                <tr
                  key={cat.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                  style={{ borderColor: 'var(--pl-border)' }}
                >
                  <td className="px-5 py-3.5 font-medium text-pl-text">{cat.name}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-pl-text-secondary">{cat.id}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="relative inline-block text-left" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCategoryActionsId(activeCategoryActionsId === cat.id ? null : cat.id);
                        }}
                        className="text-pl-text-secondary hover:text-pl-text cursor-pointer p-1.5 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                        title="Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {activeCategoryActionsId === cat.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setActiveCategoryActionsId(null); }} />
                          <div className="absolute right-0 top-full mt-1.5 w-32 bg-white border rounded-lg z-20 overflow-hidden flex flex-col py-1 shadow-lg animate-fade-in" style={{ borderColor: '#cbd5e1' }}>
                            <button
                              onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveCategoryActionsId(null);
                                  setRenamingCategory({ id: cat.id, name: cat.name });
                                }}
                                className="flex items-center gap-2 px-3 py-2 text-xs text-pl-text hover:bg-gray-50 w-full text-left transition-colors font-medium cursor-pointer"
                              >
                                <Edit2 className="w-3.5 h-3.5 text-pl-text-secondary" />
                                Rename
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveCategoryActionsId(null);
                                  setDeleteCategoryTargetId(cat.id);
                                }}
                                className="flex items-center gap-2 px-3 py-2 text-xs text-destructive hover:bg-gray-50 w-full text-left transition-colors font-medium border-t cursor-pointer"
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

      {/* Categories Pagination Footer */}
      <div className="px-5 py-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs rounded-b-xl animate-fade-in" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
        <span className="text-center sm:text-left">
          {totalCategories === 0
            ? 'Showing 0 of 0 categories'
            : `Showing ${startIndexCategories + 1}-${Math.min(startIndexCategories + ITEMS_PER_PAGE, totalCategories)} of ${totalCategories} categories`
          }
        </span>
        <div className="flex items-center justify-center gap-1 w-full sm:w-auto">
          <button
            disabled={categoriesPage === 1}
            onClick={() => setCategoriesPage(p => Math.max(1, p - 1))}
            className="px-2.5 py-1 rounded border text-xs font-medium cursor-pointer transition-colors bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}
          >
            Previous
          </button>
          {Array.from({ length: totalCategoriesPages }).map((_, idx) => {
            const p = idx + 1;
            const isActive = categoriesPage === p;
            return (
              <button
                key={p}
                onClick={() => setCategoriesPage(p)}
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
            disabled={categoriesPage === totalCategoriesPages}
            onClick={() => setCategoriesPage(p => Math.min(totalCategoriesPages, p + 1))}
            className="px-2.5 py-1 rounded border text-xs font-medium cursor-pointer transition-colors bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Category Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteCategoryTargetId}
        onClose={() => setDeleteCategoryTargetId(null)}
        onConfirm={handleConfirmDeleteCategory}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action is permanent and only succeeds if no fees are currently using it."
        isPending={deleteCategory.isPending}
      />

      {/* Rename Category dialog modal */}
      {renamingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 animate-scale-up">
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--pl-border)' }}>
              <h2 className="font-semibold text-pl-text">Rename Category</h2>
              <button onClick={() => setRenamingCategory(null)} className="cursor-pointer">
                <X className="w-5 h-5" style={{ color: 'var(--pl-text-secondary)' }} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (renamingCategory.name.trim()) {
                  updateCategory.mutate(
                    { id: renamingCategory.id, name: renamingCategory.name },
                    { onSuccess: () => setRenamingCategory(null) }
                  );
                }
              }}
              className="p-6 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-pl-text">Category Name</label>
                <input
                  required
                  value={renamingCategory.name}
                  onChange={(e) => setRenamingCategory((p) => p ? { ...p, name: e.target.value } : null)}
                  placeholder="Enter category name"
                  className="border rounded-lg px-3 py-2 text-sm outline-none"
                  style={{ borderColor: 'var(--pl-border)' }}
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRenamingCategory(null)}
                  className="flex-1 border rounded-lg py-2 text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateCategory.isPending}
                  className="flex-1 rounded-lg py-2 text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
                  style={{ background: 'var(--pl-blue)' }}
                >
                  {updateCategory.isPending ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
