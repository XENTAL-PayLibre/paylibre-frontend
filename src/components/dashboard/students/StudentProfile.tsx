'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, ArrowLeft, Trash2, Landmark, Copy, CheckCheck, Send, User, ShieldAlert, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { useStudent, useStudentVirtualAccount, useDeleteStudent, useSendStudentVirtualAccount } from '@/api/students';
import StatusBadge from '@/components/dashboard/StatusBadge';
import ConfirmModal from '@/components/dashboard/ConfirmModal';
import EditStudentModal from './EditStudentModal';

interface StudentProfileProps {
  id: string;
}

export default function StudentProfile({ id }: StudentProfileProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Queries
  const { data: student, isLoading: isLoadingStudent, error } = useStudent(id);
  const { data: virtualAccount, isLoading: isLoadingAccount } = useStudentVirtualAccount(id);

  // Mutations
  const deleteStudent = useDeleteStudent();
  const sendDetails = useSendStudentVirtualAccount();

  const formatAccountNumber = (num: string | undefined) => {
    if (!num) return '•••• •••• ••••';
    if (num.length === 10) {
      return `${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6)}`;
    }
    return num.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handleCopy = () => {
    const num = virtualAccount?.accountNumber || student?.nuban || '';
    const bank = virtualAccount?.bankName || student?.bankName || 'PayLibre';
    const name = `${bank} - ${student?.fullName}`;
    if (num) {
      const textToCopy = `Bank: ${bank}\nAccount Number: ${num}\nAccount Name: ${name}`;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast.success('Account details copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteStudent.mutate(id, {
      onSuccess: () => {
        router.push('/dashboard/students');
      },
    });
  };

  if (isLoadingStudent) {
    return (
      <div className="flex flex-col gap-6 animate-fade-in">
        {/* Skeleton Breadcrumbs */}
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
        
        {/* Skeleton Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b" style={{ borderColor: 'var(--pl-border)' }}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-9 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-9 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-xl border p-6 h-56 animate-pulse" style={{ borderColor: 'var(--pl-border)' }} />
            <div className="bg-white rounded-xl border p-6 h-56 animate-pulse" style={{ borderColor: 'var(--pl-border)' }} />
          </div>
          <div className="bg-white rounded-xl border p-6 h-96 animate-pulse" style={{ borderColor: 'var(--pl-border)' }} />
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <ShieldAlert className="w-8 h-8 text-red-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-pl-text">Student Profile Not Found</h2>
          <p className="text-sm text-pl-text-secondary mt-1 max-w-sm">
            We couldn't retrieve the details for this student. They may have been deleted, or there was a network issue.
          </p>
        </div>
        <Link
          href="/dashboard/students"
          className="flex items-center gap-1.5 px-4 py-2 border rounded-lg text-sm font-medium text-pl-text hover:bg-gray-50 transition-colors"
          style={{ borderColor: 'var(--pl-border)' }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Students
        </Link>
      </div>
    );
  }

  // Get initials for profile placeholder
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--pl-text-secondary)' }}>
        <Link href="/dashboard/students" className="hover:text-pl-blue hover:underline">Students</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-medium text-pl-text">Student Profile</span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-semibold text-pl-text truncate max-w-[120px]">{student.fullName}</span>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-inner"
            style={{ background: 'linear-gradient(135deg, var(--pl-blue), #0041a8)' }}>
            {getInitials(student.fullName)}
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-bold text-pl-text">{student.fullName}</h1>
              <StatusBadge status={student.status} />
            </div>
            <p className="text-sm mt-1" style={{ color: 'var(--pl-text-secondary)' }}>
              Admission Number: <span className="font-mono font-medium text-pl-text">{student.admissionNo}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
          >
            <Pencil className="w-3.5 h-3.5" /> Edit Details
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteStudent.isPending}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white rounded-lg cursor-pointer hover:opacity-90 disabled:opacity-50 transition-all"
            style={{ background: 'var(--pl-red)' }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            {deleteStudent.isPending ? 'Deleting...' : 'Delete Student'}
          </button>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left column details card */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Roster detail info block */}
          <div className="bg-white rounded-xl border p-6" style={{ borderColor: 'var(--pl-border)' }}>
            <h3 className="font-semibold text-sm mb-4 text-pl-text">Academic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>Full Name</span>
                <span className="font-semibold text-pl-text">{student.fullName}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>Admission Number</span>
                <span className="font-mono font-semibold text-pl-text">{student.admissionNo}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>Academic Session</span>
                <span className="font-semibold text-pl-text">{student.academicSession || '2025/2026'}</span>
              </div>
            </div>
          </div>

          {/* Parent contact information */}
          <div className="bg-white rounded-xl border p-6" style={{ borderColor: 'var(--pl-border)' }}>
            <h3 className="font-semibold text-sm mb-4 text-pl-text">Parent / Guardian Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>Name</span>
                <span className="font-semibold text-pl-text">{student.guardianName}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>Phone Number</span>
                <span className="font-semibold text-pl-text">{student.guardianPhone || '—'}</span>
              </div>
              <div className="col-span-1 sm:col-span-2 flex flex-col gap-0.5">
                <span className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>Email Address</span>
                <span className="font-semibold text-pl-text break-all">{student.guardianEmail || '—'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column dedicated NUBAN card details */}
        <div className="bg-white rounded-xl border p-6 flex flex-col gap-5 justify-between lg:col-span-2" style={{ borderColor: 'var(--pl-border)' }}>
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-sm text-pl-text">Dedicated Account Card</h3>
            
            {/* Visual virtual bank card */}
            <div
              className="w-full rounded-[24px] p-6 flex flex-col gap-4 relative overflow-hidden text-white"
              style={{
                background: 'linear-gradient(135deg, #004DBB 0%, #001847 100%)',
                boxShadow: '0px 20px 40px -15px rgba(0, 77, 187, 0.3)',
              }}
            >
              <div className="flex items-center justify-between mb-2 z-10">
                <span className="text-white text-xs opacity-70">Dedicated Account</span>
                <Landmark className="w-5 h-5 text-white opacity-85" />
              </div>
              
              <p className="text-white font-mono text-lg sm:text-xl font-bold tracking-widest z-10">
                {isLoadingAccount ? 'Loading...' : formatAccountNumber(virtualAccount?.accountNumber || student?.nuban)}
              </p>
              
              <div className="flex justify-between items-end mt-2 z-10 text-xs">
                <div>
                  <p className="text-white text-[8px] sm:text-[10px] opacity-75">Account Name</p>
                  <p className="text-white font-semibold truncate max-w-[120px] sm:max-w-[150px]">
                    {isLoadingAccount ? 'Loading...' : `${virtualAccount?.bankName || student?.bankName || 'PayLibre'} - ${student.fullName}`}
                  </p>
                </div>
                <div className="text-right text-xs">
                  <p className="text-white text-[8px] sm:text-[10px] opacity-75">Bank Name</p>
                  <p className="text-white font-semibold">
                    {isLoadingAccount ? 'Loading...' : (virtualAccount?.bankName || 'PayLibre Bank')}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-pl-text-secondary text-center">
              All bank transfers made to this unique account number are automatically reconciled and credited to the student's invoices.
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full mt-4">
            <button
              onClick={handleCopy}
              disabled={isLoadingAccount || !(virtualAccount?.accountNumber || student?.nuban)}
              className="flex items-center justify-center gap-2 border rounded-lg py-2 text-sm font-medium w-full cursor-pointer hover:bg-gray-50 disabled:opacity-50 transition-colors"
              style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
            >
              {copied ? <CheckCheck className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Account Details'}
            </button>
            <button
              onClick={() => sendDetails.mutate(student.id)}
              disabled={sendDetails.isPending || isLoadingAccount}
              className="flex items-center justify-center gap-2 border rounded-lg py-2 text-sm font-medium w-full cursor-pointer hover:bg-gray-50 disabled:opacity-50 transition-colors"
              style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
            >
              <Send className="w-4 h-4 text-pl-text-secondary" />
              {sendDetails.isPending ? 'Sending...' : 'Notify Parent via SMS/Email'}
            </button>
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Student"
        message="Are you sure you want to delete this student and deactivate their dedicated virtual account? This action is permanent."
        isPending={deleteStudent.isPending}
      />

      {/* Edit Student Modal */}
      <EditStudentModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        student={student}
      />
    </div>
  );
}
