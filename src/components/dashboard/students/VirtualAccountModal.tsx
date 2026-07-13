'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, CheckCheck, Landmark } from 'lucide-react';
import { toast } from 'sonner';
import { useStudentVirtualAccount, useSendStudentVirtualAccount } from '@/api/students';
import { Student } from '@/api/types/students';

interface VirtualAccountModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VirtualAccountModal({ student, isOpen, onClose }: VirtualAccountModalProps) {
  const [copied, setCopied] = useState(false);

  // Fetch virtual account details on-the-fly when modal is open
  const { data: virtualAccount, isLoading: isLoadingAccount } = useStudentVirtualAccount(
    isOpen && student?.id ? student.id : ''
  );

  const sendDetails = useSendStudentVirtualAccount();

  if (!isOpen || !student) return null;

  const handleCopy = () => {
    const num = virtualAccount?.accountNumber || '';
    if (num) {
      navigator.clipboard.writeText(num);
      setCopied(true);
      toast.success('Account number copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col items-center gap-4 animate-scale-up">
        <div
          className="w-full rounded-2xl p-5 flex flex-col gap-2 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--pl-blue), #0041a8)' }}
        >
          <div className="flex items-center justify-between mb-2 z-10">
            <span className="text-white text-xs opacity-70">Dedicated Account</span>
            <Landmark className="w-5 h-5 text-white opacity-80" />
          </div>
          
          <p className="text-white font-mono text-xl font-bold tracking-widest z-10">
            {isLoadingAccount ? 'Loading...' : (virtualAccount?.accountNumber || '•••• •••• ••••')}
          </p>
          
          <div className="flex justify-between items-end mt-2 z-10">
            <div>
              <p className="text-white text-[10px] opacity-75">Account Name</p>
              <p className="text-white text-xs font-semibold truncate max-w-[180px]">
                {isLoadingAccount ? 'Loading...' : (virtualAccount?.accountName || student.fullName || '—')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white text-[10px] opacity-75">Bank Name</p>
              <p className="text-white text-xs font-semibold">
                {isLoadingAccount ? 'Loading...' : (virtualAccount?.bankName || 'PayLibre Bank')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="font-semibold text-pl-text">Virtual Account Details</p>
          <p className="text-xs mt-1 text-pl-text-secondary">
            This is a dedicated account number assigned to this student. Parents can make payments directly to this account number.
          </p>
        </div>
        
        <div className="flex flex-col gap-2.5 w-full">
          <Link
            href={`/dashboard/students/${student.id}`}
            className="flex items-center justify-center gap-2 border rounded-lg py-2 text-sm font-medium w-full hover:bg-gray-50 text-center transition-colors"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
          >
            View Full Profile
          </Link>

          <button
            onClick={handleCopy}
            disabled={isLoadingAccount || !virtualAccount?.accountNumber}
            className="flex items-center justify-center gap-2 border rounded-lg py-2 text-sm font-medium w-full cursor-pointer hover:bg-gray-50 disabled:opacity-50"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
          >
            {copied ? <CheckCheck className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Account Number'}
          </button>
          
          <button
            onClick={() => sendDetails.mutate(student.id)}
            disabled={sendDetails.isPending || isLoadingAccount}
            className="flex items-center justify-center gap-2 border rounded-lg py-2 text-sm font-medium w-full cursor-pointer hover:bg-gray-50 disabled:opacity-50"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
          >
            {sendDetails.isPending ? 'Sending...' : 'Notify Parent via SMS/Email'}
          </button>
          
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-lg py-2 text-sm font-medium text-white w-full cursor-pointer hover:opacity-90"
            style={{ background: 'var(--pl-blue)' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
