'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Upload, GraduationCap } from 'lucide-react';
import { useStudents } from '@/api/students';
import { Student } from '@/api/types/students';
import StudentTable from '@/components/dashboard/students/StudentTable';
import AddStudentModal from '@/components/dashboard/students/AddStudentModal';
import CsvImportModal from '@/components/dashboard/students/CsvImportModal';
import AddClassModal from '@/components/dashboard/students/AddClassModal';

type ModalType = 'none' | 'add' | 'csv';

export default function StudentsPage() {
  const router = useRouter();
  const [modal, setModal] = useState<ModalType>('none');
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  // Queries
  const { data: students, isLoading } = useStudents({
    classId: selectedClass === 'All Classes' ? undefined : selectedClass,
    status: selectedStatus === 'All Status' ? undefined : selectedStatus,
  });

  const handleRowClick = (student: Student) => {
    router.push(`/dashboard/students/${student.id}`);
  };

  const handleAddSuccess = (newStudent: Student) => {
    router.push(`/dashboard/students/${newStudent.id}/success`);
  };

  const handleAddClass = () => {
    setIsAddClassOpen(true);
  };

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>Students</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Manage your student directory</p>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:items-center sm:gap-2 sm:w-auto">
          <button
            onClick={handleAddClass}
            className="col-span-1 sm:order-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border cursor-pointer hover:bg-gray-50 transition-colors"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Add Class
          </button>
          <button
            onClick={() => setModal('csv')}
            className="col-span-1 sm:order-2 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border cursor-pointer hover:bg-gray-50 transition-colors"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
          >
            <Upload className="w-3.5 h-3.5" />
            Import CSV
          </button>
          <button
            onClick={() => setModal('add')}
            className="col-span-2 sm:order-3 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity"
            style={{ background: 'var(--pl-blue)' }}
          >
            <Plus className="w-3.5 h-3.5" />
            Add Student
          </button>
        </div>
      </div>

      {/* Roster list modular table */}
      <StudentTable
        students={students || []}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        search={search}
        setSearch={setSearch}
      />

      {/* Add Student Form overlay */}
      <AddStudentModal
        isOpen={modal === 'add'}
        onClose={() => setModal('none')}
        onSuccess={handleAddSuccess}
      />

      {/* CSV importer overlay */}
      <CsvImportModal
        isOpen={modal === 'csv'}
        onClose={() => setModal('none')}
      />

      {/* Class creation overlay */}
      <AddClassModal
        isOpen={isAddClassOpen}
        onClose={() => setIsAddClassOpen(false)}
      />
    </div>
  );
}
