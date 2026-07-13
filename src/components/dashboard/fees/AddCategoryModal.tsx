'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateFeeCategory } from '@/api/fees';
import { FeeCategory } from '@/api/types/fees';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (newCategory: FeeCategory) => void;
}

export default function AddCategoryModal({ isOpen, onClose, onSuccess }: AddCategoryModalProps) {
  const createCategory = useCreateFeeCategory();
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCategory.mutate(
      { name },
      {
        onSuccess: (data) => {
          setName('');
          onSuccess?.(data);
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 animate-scale-up">
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--pl-border)' }}>
          <div>
            <h2 className="font-semibold text-pl-text">Create Category</h2>
            <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Add a new fee category</p>
          </div>
          <button onClick={onClose} className="cursor-pointer">
            <X className="w-5 h-5 text-pl-text-secondary" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-pl-text">Category Name <span className="text-destructive">*</span></label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tuition, Books, Uniforms"
              className="border rounded-lg px-3 py-2 text-sm outline-none text-pl-text"
              style={{ borderColor: 'var(--pl-border)' }}
            />
          </div>
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border rounded-lg py-2 text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors"
              style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createCategory.isPending}
              className="flex-1 rounded-lg py-2 text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ background: 'var(--pl-blue)' }}
            >
              {createCategory.isPending ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
