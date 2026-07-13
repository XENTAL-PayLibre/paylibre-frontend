'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateStudent } from '@/api/students';
import { Student } from '@/api/types/students';
import { useClasses } from '@/api/classes';
import AddClassModal from './AddClassModal';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (student: Student) => void;
}

export default function AddStudentModal({ isOpen, onClose, onSuccess }: AddStudentModalProps) {
  const createStudent = useCreateStudent();
  const { data: classes } = useClasses();
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  const [newStudent, setNewStudent] = useState({
    name: '',
    admNo: '',
    guardian: '',
    phone: '',
    email: '',
    session: '',
    class: '',
  });

  if (!isOpen) return null;

  const handleCreateClass = () => {
    setIsAddClassOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createStudent.mutate(
      {
        fullName: newStudent.name,
        admissionNo: newStudent.admNo,
        classId: newStudent.class,
        guardianName: newStudent.guardian,
        guardianPhone: newStudent.phone,
        guardianEmail: newStudent.email,
        session: newStudent.session,
      },
      {
        onSuccess: (data) => {
          onSuccess(data);
          setNewStudent({
            name: '',
            admNo: '',
            guardian: '',
            phone: '',
            email: '',
            session: '',
            class: '',
          });
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 animate-scale-up">
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--pl-border)' }}>
          <div>
            <h2 className="font-semibold text-pl-text">Add Student</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Fill in the student details below</p>
          </div>
          <button onClick={onClose} className="cursor-pointer">
            <X className="w-5 h-5" style={{ color: 'var(--pl-text-secondary)' }} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Full Name <span className="text-destructive">*</span></label>
              <input required value={newStudent.name} onChange={e => setNewStudent(p => ({ ...p, name: e.target.value }))}
                placeholder="Enter full name" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Admission Number <span className="text-destructive">*</span></label>
              <input required value={newStudent.admNo} onChange={e => setNewStudent(p => ({ ...p, admNo: e.target.value }))}
                placeholder="e.g. ADM009" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Parent/Guardian <span className="text-destructive">*</span></label>
              <input required value={newStudent.guardian} onChange={e => setNewStudent(p => ({ ...p, guardian: e.target.value }))}
                placeholder="Guardian name" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Parent/Guardian Phone Number <span className="text-destructive">*</span></label>
              <input required value={newStudent.phone} onChange={e => setNewStudent(p => ({ ...p, phone: e.target.value }))}
                placeholder="08012345678" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Parent/Guardian Email Address <span className="text-destructive">*</span></label>
              <input required type="email" value={newStudent.email} onChange={e => setNewStudent(p => ({ ...p, email: e.target.value }))}
                placeholder="parent@email.com" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Academic Session <span className="text-destructive">*</span></label>
              <select required value={newStudent.session} onChange={e => setNewStudent(p => ({ ...p, session: e.target.value }))}
                className="border rounded-lg px-3 py-2 text-sm outline-none cursor-pointer" style={{ borderColor: 'var(--pl-border)' }}>
                <option value="">Select session</option>
                <option>2025/2026</option>
                <option>2026/2027</option>
              </select>
            </div>
            <div className="col-span-2 flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-pl-text">Class <span className="text-destructive">*</span></label>
                <button
                  type="button"
                  onClick={handleCreateClass}
                  className="text-[10px] font-semibold text-pl-blue hover:underline cursor-pointer"
                >
                  + Add New Class
                </button>
              </div>
              <select required value={newStudent.class} onChange={e => setNewStudent(p => ({ ...p, class: e.target.value }))}
                className="border rounded-lg px-3 py-2 text-sm outline-none cursor-pointer" style={{ borderColor: 'var(--pl-border)' }}>
                <option value="">Select class</option>
                {classes?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-lg p-3 text-xs" style={{ background: 'var(--pl-blue-light)', color: 'var(--pl-blue)' }}>
            <span className="shrink-0">ℹ️</span>
            A dedicated virtual account will be created automatically for this student upon saving.
          </div>
          <div className="flex items-center gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 border rounded-lg py-2 text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}>
              Cancel
            </button>
            <button type="submit" disabled={createStudent.isPending}
              className="flex-1 rounded-lg py-2 text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50" style={{ background: 'var(--pl-blue)' }}>
              {createStudent.isPending ? 'Saving...' : 'Save Student'}
            </button>
          </div>
        </form>
      </div>
      <AddClassModal
        isOpen={isAddClassOpen}
        onClose={() => setIsAddClassOpen(false)}
        onSuccess={(data) => {
          setNewStudent(p => ({ ...p, class: data.id, session: data.session }));
        }}
      />
    </div>
  );
}
