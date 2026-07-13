'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useUpdateStudent } from '@/api/students';
import { Student } from '@/api/types/students';
import { useClasses } from '@/api/classes';
import AddClassModal from './AddClassModal';

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
}

export default function EditStudentModal({ isOpen, onClose, student }: EditStudentModalProps) {
  const updateStudent = useUpdateStudent();
  const { data: classes } = useClasses();
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  const [editedStudent, setEditedStudent] = useState({
    name: '',
    admNo: '',
    guardian: '',
    phone: '',
    email: '',
    session: '',
    class: '',
  });

  useEffect(() => {
    if (student && isOpen) {
      setEditedStudent({
        name: student.fullName || '',
        admNo: student.admissionNo || '',
        guardian: student.guardianName || '',
        phone: student.guardianPhone || '',
        email: student.guardianEmail || '',
        session: student.academicSession || '2025/2026',
        class: student.classId || '',
      });
    }
  }, [student, isOpen]);

  if (!isOpen) return null;

  const handleCreateClass = () => {
    setIsAddClassOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudent.mutate(
      {
        id: student.id,
        payload: {
          fullName: editedStudent.name,
          admissionNo: editedStudent.admNo,
          classId: editedStudent.class,
          guardianName: editedStudent.guardian,
          guardianPhone: editedStudent.phone,
          guardianEmail: editedStudent.email,
          session: editedStudent.session,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 animate-scale-up">
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--pl-border)' }}>
          <div>
            <h2 className="font-semibold text-pl-text">Edit Student Details</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Update the student profile information</p>
          </div>
          <button onClick={onClose} className="cursor-pointer">
            <X className="w-5 h-5" style={{ color: 'var(--pl-text-secondary)' }} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Full Name <span className="text-destructive">*</span></label>
              <input required value={editedStudent.name} onChange={e => setEditedStudent(p => ({ ...p, name: e.target.value }))}
                placeholder="Enter full name" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Admission Number <span className="text-destructive">*</span></label>
              <input required value={editedStudent.admNo} onChange={e => setEditedStudent(p => ({ ...p, admNo: e.target.value }))}
                placeholder="e.g. ADM009" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Parent/Guardian <span className="text-destructive">*</span></label>
              <input required value={editedStudent.guardian} onChange={e => setEditedStudent(p => ({ ...p, guardian: e.target.value }))}
                placeholder="Guardian name" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Parent/Guardian Phone Number <span className="text-destructive">*</span></label>
              <input required value={editedStudent.phone} onChange={e => setEditedStudent(p => ({ ...p, phone: e.target.value }))}
                placeholder="08012345678" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Parent/Guardian Email Address <span className="text-destructive">*</span></label>
              <input required type="email" value={editedStudent.email} onChange={e => setEditedStudent(p => ({ ...p, email: e.target.value }))}
                placeholder="parent@email.com" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-pl-text">Academic Session <span className="text-destructive">*</span></label>
              <select required value={editedStudent.session} onChange={e => setEditedStudent(p => ({ ...p, session: e.target.value }))}
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
              <select required value={editedStudent.class} onChange={e => setEditedStudent(p => ({ ...p, class: e.target.value }))}
                className="border rounded-lg px-3 py-2 text-sm outline-none cursor-pointer" style={{ borderColor: 'var(--pl-border)' }}>
                <option value="">Select class</option>
                {classes?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-4">
            <button type="button" onClick={onClose}
              className="flex-1 border rounded-lg py-2 text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}>
              Cancel
            </button>
            <button type="submit" disabled={updateStudent.isPending}
              className="flex-1 rounded-lg py-2 text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50" style={{ background: 'var(--pl-blue)' }}>
              {updateStudent.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
      <AddClassModal
        isOpen={isAddClassOpen}
        onClose={() => setIsAddClassOpen(false)}
        onSuccess={(data) => {
          setEditedStudent(p => ({ ...p, class: data.id, session: data.session }));
        }}
      />
    </div>
  );
}
