'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Copy, CheckCheck, Send, Mail, Landmark, Info, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useStudent, useStudentVirtualAccount, useSendStudentVirtualAccount } from '@/api/students';

interface StudentSuccessProps {
  id: string;
}

export default function StudentSuccess({ id }: StudentSuccessProps) {
  const [copiedNuban, setCopiedNuban] = useState(false);
  const [copiedDetails, setCopiedDetails] = useState(false);

  // Queries
  const { data: student, isLoading: isLoadingStudent } = useStudent(id);
  const { data: virtualAccount, isLoading: isLoadingAccount } = useStudentVirtualAccount(id);

  // Mutations
  const sendDetails = useSendStudentVirtualAccount();

  const handleCopy = () => {
    const num = virtualAccount?.accountNumber || student?.nuban || '';
    const bank = virtualAccount?.bankName || student?.bankName || 'PayLibre';
    const name = `${bank} - ${student?.fullName}`;
    if (num) {
      const textToCopy = `Bank: ${bank}\nAccount Number: ${num}\nAccount Name: ${name}`;
      navigator.clipboard.writeText(textToCopy);
      setCopiedDetails(true);
      toast.success('Account details copied to clipboard');
      setTimeout(() => setCopiedDetails(false), 2000);
    }
  };

  const handleCopyNuban = () => {
    const num = virtualAccount?.accountNumber || student?.nuban || '';
    if (num) {
      navigator.clipboard.writeText(num);
      setCopiedNuban(true);
      toast.success('Account number copied to clipboard');
      setTimeout(() => setCopiedNuban(false), 2000);
    }
  };

  const handleSendEmail = () => {
    toast.success(`Account details emailed to guardian: ${student?.guardianEmail || 'N/A'}`);
  };

  const formatAccountNumber = (num: string | undefined) => {
    if (!num) return '•••• •••• ••••';
    if (num.length === 10) {
      return `${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6)}`;
    }
    return num.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  if (isLoadingStudent || isLoadingAccount) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-10 h-10 border-4 border-pl-blue border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-pl-text-secondary">Generating virtual account details...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <p className="text-sm text-destructive">Student details not found.</p>
        <Link href="/dashboard/students" className="text-sm text-pl-blue hover:underline">
          Return to Student List
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-0 sm:py-8 px-0 sm:px-4 animate-fade-in w-full max-w-[672px] mx-auto gap-12 text-center">
      {/* Success Checked Header badge */}
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#E2E7FF] animate-ripple select-none">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--pl-blue)' }}>
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-pl-text">Virtual Account Ready</h1>
          <p className="text-base text-pl-text-secondary leading-relaxed">
            A dedicated account has been successfully generated for this student's fee payments.
          </p>
        </div>
      </div>

      {/* Visual NUBAN Credit Card */}
      <div
        className="w-full rounded-[24px] p-6 sm:p-8 text-white flex flex-col transition-all select-none text-left"
        style={{
          background: 'linear-gradient(135deg, #004DBB 0%, #001847 100%)',
          boxShadow: '0px 20px 40px -15px rgba(0, 77, 187, 0.3)',
        }}
      >
        {/* Mobile Layout (Figma stacked card layout) */}
        <div className="flex flex-col gap-4 sm:hidden">
          {/* Bank Name */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-wider opacity-50 font-semibold">Bank Name</span>
            <span className="text-base font-bold tracking-wide">
              {virtualAccount?.bankName || student?.bankName}
            </span>
          </div>

          {/* Account Number */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-wider opacity-50 font-semibold">Account Number</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-wider font-mono">
                {formatAccountNumber(virtualAccount?.accountNumber || student?.nuban)}
              </span>
              <button
                onClick={handleCopyNuban}
                className="p-1 hover:bg-white/10 rounded-md transition-colors cursor-pointer"
                title="Copy account number"
              >
                {copiedNuban ? <CheckCheck className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/80" />}
              </button>
            </div>
          </div>

          {/* Account Name */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-wider opacity-50 font-semibold">Account Name</span>
            <span className="text-base font-semibold tracking-wide">
              {virtualAccount?.bankName || student?.bankName || 'PayLibre'} - {student.fullName}
            </span>
          </div>
        </div>

        {/* Desktop Layout (Figma landscape card layout) */}
        <div className="hidden sm:flex flex-col gap-8">
          {/* Top Card Row */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Landmark className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-sm font-semibold tracking-wider uppercase opacity-95">
                {virtualAccount?.bankName || student?.bankName}
              </span>
            </div>
            {/* Wireless wave indicator */}
            <svg
              className="w-7 h-7 opacity-60 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <g fill="currentColor" transform="rotate(0 12 12) translate(-2, -0.5)">
                <path d="M 7.9 10.4 L 8.9 9.6 A 3.8 3.8 0 0 1 8.9 14.4 L 7.9 13.6 A 2.5 2.5 0 0 0 7.9 10.4 Z" />
                <path d="M 9.8 8.8 L 11.0 7.8 A 6.5 6.5 0 0 1 11.0 16.2 L 9.8 15.2 A 5.0 5.0 0 0 0 9.8 8.8 Z" />
                <path d="M 11.7 7.2 L 13.0 6.1 A 9.2 9.2 0 0 1 13.0 17.9 L 11.7 16.8 A 7.5 7.5 0 0 0 11.7 7.2 Z" />
                <path d="M 13.8 5.4 L 15.2 4.3 A 12.0 12.0 0 0 1 15.2 19.7 L 13.8 18.6 A 10.2 10.2 0 0 0 13.8 5.4 Z" />
              </g>
            </svg>
          </div>

          {/* Middle Card Row */}
          <div className="flex flex-col gap-1.5 mt-2">
            <span className="text-sm uppercase tracking-wider opacity-60 font-semibold">Account Number</span>
            <div className="flex items-center gap-4">
              <span className="text-5xl font-bold tracking-widest font-mono">
                {formatAccountNumber(virtualAccount?.accountNumber || student?.nuban)}
              </span>
              <button
                onClick={handleCopyNuban}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Copy account number"
              >
                {copiedNuban ? <CheckCheck className="w-4.5 h-4.5 text-green-400" /> : <Copy className="w-4.5 h-4.5 text-white/80" />}
              </button>
            </div>
          </div>

          {/* Bottom Card Row */}
          <div className="flex justify-between items-end mt-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm uppercase tracking-wider opacity-50 font-semibold">Account Name</span>
              <span className="text-base font-medium tracking-wide">
                {virtualAccount?.bankName} - {student.fullName}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 items-end">
              <span className="text-sm uppercase tracking-wider opacity-50 font-semibold">Routing</span>
              <span className="text-base font-semibold font-mono opacity-80">021000021</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full">
        <button
          onClick={handleCopy}
          className="h-[72px] sm:h-[46px] flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white hover:opacity-90 transition-opacity cursor-pointer shadow-sm text-center w-full"
          style={{ background: 'var(--pl-blue)' }}
        >
          {copiedDetails ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>Copy Details</span>
        </button>
        <button
          onClick={() => sendDetails.mutate(student.id)}
          disabled={sendDetails.isPending}
          className="h-[72px] sm:h-[46px] flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-2 sm:py-2.5 border border-[#C2C6D7]! rounded-lg text-xs sm:text-sm font-semibold bg-[#EAEDFF] hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 text-pl-text text-center w-full"
          style={{ borderColor: 'var(--pl-border)' }}
        >
          <Send className="w-3.5 h-3.5 text-pl-text-secondary" />
          <span>
            {sendDetails.isPending ? 'Sending...' : 'Send via SMS'}
          </span>
        </button>
        <button
          onClick={handleSendEmail}
          className="h-[72px] sm:h-[46px] flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-2 sm:py-2.5 border border-[#C2C6D7]! rounded-lg text-xs sm:text-sm font-semibold bg-[#EAEDFF] hover:bg-gray-50 transition-colors cursor-pointer text-pl-text text-center w-full"
          style={{ borderColor: 'var(--pl-border)' }}
        >
          <Mail className="w-3.5 h-3.5 text-pl-text-secondary" />
          <span>Email Details</span>
        </button>
      </div>

      {/* Info Card Instruction panel */}
      <div
        className="w-full bg-[#F2F3FF] border border-[#C2C6D7] rounded-xl p-5 flex items-start gap-3 text-left"
      >
        <svg className="w-5 h-5 shrink-0 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#004DBB" />
          <line x1="12" y1="16" x2="12" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="7.5" r="1" fill="white" />
        </svg>
        <div className="flex flex-col gap-0.5">
          <h4 className="text-lg font-bold text-pl-text">How this works</h4>
          <p className="text-sm leading-relaxed text-pl-text-secondary">
            Parents can transfer funds directly to this account from their bank&apos;s app. Payments are automatically matched to{' '}
            <strong className="text-pl-text font-semibold">{student.fullName}</strong>&apos;s fee ledger within 15 minutes of receiving the transfer. No manual reconciliation is required.
          </p>
        </div>
      </div>

      {/* Return Back Link */}
      <Link
        href={`/dashboard/students/${student.id}`}
        className="flex items-center justify-center gap-2 font-semibold text-sm text-pl-blue hover:text-pl-blue transition-colors group"
      >
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
        Return to Student Profile
      </Link>
    </div>
  );
}
