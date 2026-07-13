'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateFee, useFeeCategories } from '@/api/fees';
import { useClasses } from '@/api/classes';
import AddCategoryModal from './AddCategoryModal';

interface AddFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddFeeModal({ isOpen, onClose }: AddFeeModalProps) {
  const createFee = useCreateFee();
  const { data: classes } = useClasses();
  const { data: categories } = useFeeCategories();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    category: '',
    session: '',
    class: '',
    term: '',
    amount: '',
    dueDate: '',
  });

  if (!isOpen) return null;

  const handleCreateCategory = () => {
    setIsCategoryModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.session || !form.class || !form.amount || !form.dueDate) {
      toast.error('Please fill in all required fields.');
      return;
    }
    const amtNaira = parseFloat(form.amount);
    if (isNaN(amtNaira) || amtNaira <= 0) {
      toast.error('Please enter a valid amount.');
      return;
    }

    createFee.mutate({
      name: form.name,
      feeCategoryId: form.category,
      session: form.session,
      classId: form.class,
      term: form.term as 'First' | 'Second' | 'Third' || 'First',
      amountKobo: Math.round(amtNaira * 100), // convert Naira to Kobo integer
      dueDateUtc: new Date(form.dueDate).toISOString(),
    }, {
      onSuccess: () => {
        onClose();
        setForm({ name: '', category: '', session: '', class: '', term: '', amount: '', dueDate: '' });
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 animate-scale-up">
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--pl-border)' }}>
          <div>
            <h2 className="font-semibold text-pl-text">Create Fee</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Create a fee and assign it to students by class</p>
          </div>
          <button onClick={onClose} className="cursor-pointer">
            <X className="w-5 h-5" style={{ color: 'var(--pl-text-secondary)' }} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
              <label className="text-xs font-medium text-pl-text">Name <span className="text-destructive">*</span></label>
              <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Enter fee title" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
            </div>

            <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
              <div className="flex justify-between items-center h-4">
                <label className="text-xs font-medium text-pl-text">Category <span className="text-destructive">*</span></label>
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  className="text-[10px] font-semibold text-pl-blue hover:underline cursor-pointer"
                >
                  + Add New Category
                </button>
              </div>
              <select required value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="border rounded-lg px-3 py-2 text-sm outline-none cursor-pointer" style={{ borderColor: 'var(--pl-border)' }}>
                <option value="">Select category</option>
                {categories?.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Academic Session <span className="text-destructive">*</span></label>
              <select required value={form.session} onChange={e => setForm(p => ({ ...p, session: e.target.value }))}
                className="border rounded-lg px-3 py-2 text-sm outline-none cursor-pointer" style={{ borderColor: 'var(--pl-border)' }}>
                <option value="">Select session</option>
                <option>2025/2026</option>
                <option>2026/2027</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Class <span className="text-destructive">*</span></label>
              <select required value={form.class} onChange={e => setForm(p => ({ ...p, class: e.target.value }))}
                className="border rounded-lg px-3 py-2 text-sm outline-none cursor-pointer" style={{ borderColor: 'var(--pl-border)' }}>
                <option value="">Select class</option>
                {classes?.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Term <span className="text-destructive">*</span></label>
              <select required value={form.term} onChange={e => setForm(p => ({ ...p, term: e.target.value }))}
                className="border rounded-lg px-3 py-2 text-sm outline-none cursor-pointer" style={{ borderColor: 'var(--pl-border)' }}>
                <option value="">Select term</option>
                <option>First</option>
                <option>Second</option>
                <option>Third</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Amount (₦) <span className="text-destructive">*</span></label>
              <input required type="number" step="0.01" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
                placeholder="e.g. 35000" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
            </div>
            
            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Due Date <span className="text-destructive">*</span></label>
              <input required type="date" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))}
                className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-4">
            <button type="button" onClick={onClose}
              className="flex-1 border rounded-lg py-2 text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}>
              Cancel
            </button>
            <button type="submit" disabled={createFee.isPending}
              className="flex-1 rounded-lg py-2 text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50" style={{ background: 'var(--pl-blue)' }}>
              {createFee.isPending ? 'Saving...' : 'Save Fee'}
            </button>
          </div>
        </form>
      </div>
      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </div>
  );
}
