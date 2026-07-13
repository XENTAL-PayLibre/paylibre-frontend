'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useCreateClass, useUpdateClass, useClasses } from '@/api/classes';
import { ClassRoom } from '@/api/types/classes';
import { toast } from 'sonner';

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (newClass: ClassRoom) => void;
  editingClass?: ClassRoom | null;
}

export default function AddClassModal({ isOpen, onClose, onSuccess, editingClass }: AddClassModalProps) {
  const { data: classes } = useClasses();
  const createClass = useCreateClass();
  const updateClass = useUpdateClass();
  const [name, setName] = useState('');
  const [session, setSession] = useState('');

  useEffect(() => {
    if (editingClass) {
      setName(editingClass.name);
      setSession(editingClass.session);
    } else {
      setName('');
      setSession('');
    }
  }, [editingClass, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedSession = session.trim();

    // Check for case-insensitive duplicates within the same session
    const isDuplicate = classes?.some(
      (cls) =>
        cls.name.trim().toLowerCase() === trimmedName.toLowerCase() &&
        cls.session.trim() === trimmedSession &&
        cls.id !== editingClass?.id
    );

    if (isDuplicate) {
      toast.error(`Class "${trimmedName}" already exists for the ${trimmedSession} session.`);
      return;
    }

    if (editingClass) {
      updateClass.mutate(
        { id: editingClass.id, payload: { name: trimmedName, session: trimmedSession } },
        {
          onSuccess: (data) => {
            onSuccess?.(data);
            onClose();
          },
        }
      );
    } else {
      createClass.mutate(
        { name: trimmedName, session: trimmedSession },
        {
          onSuccess: (data) => {
            setName('');
            setSession('');
            onSuccess?.(data);
            onClose();
          },
        }
      );
    }
  };

  const isPending = editingClass ? updateClass.isPending : createClass.isPending;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 animate-scale-up">
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--pl-border)' }}>
          <div>
            <h2 className="font-semibold text-pl-text">{editingClass ? 'Edit Class' : 'Create Class'}</h2>
            <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>
              {editingClass ? 'Update the details of this class' : 'Add a new class to your school'}
            </p>
          </div>
          <button onClick={onClose} className="cursor-pointer">
            <X className="w-5 h-5" style={{ color: 'var(--pl-text-secondary)' }} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-pl-text">Class Name <span className="text-destructive">*</span></label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Primary 1, SS1"
              className="border rounded-lg px-3 py-2 text-sm outline-none text-pl-text"
              style={{ borderColor: 'var(--pl-border)' }}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-pl-text">Academic Session <span className="text-destructive">*</span></label>
            <select
              required
              value={session}
              onChange={(e) => setSession(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm outline-none cursor-pointer text-pl-text"
              style={{ borderColor: 'var(--pl-border)' }}
            >
              <option value="">Select session</option>
              <option>2025/2026</option>
              <option>2026/2027</option>
            </select>
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
              disabled={isPending}
              className="flex-1 rounded-lg py-2 text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ background: 'var(--pl-blue)' }}
            >
              {isPending ? 'Saving...' : (editingClass ? 'Save Changes' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
