'use client';

import { useState, useRef, useEffect } from 'react';
import { User, ChevronDown } from 'lucide-react';
import { useMe } from '@/api/auth';

export default function ProfileDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useMe();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isLoading || !data) {
    return (
      <div className="flex items-center gap-2 select-none animate-pulse">
        <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
        <div className="hidden sm:flex flex-col text-left">
          <div className="w-28 h-4 bg-gray-200 rounded" />
        </div>
        <ChevronDown className="w-4 h-4 text-pl-text-secondary" />
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Profile trigger with Dropdown Arrow */}
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 cursor-pointer hover:opacity-90 select-none animate-fade-in"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-pl-blue-light shrink-0">
          <User className="w-4 h-4 text-pl-blue" />
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-base font-semibold text-pl-text leading-none">{data.school?.name || 'School Name'}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-pl-text-secondary transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
      </div>

      {/* Floating School Details Dialog */}
      {showDropdown && (
        <div className="absolute right-0 top-11 w-[calc(100vw-32px)] sm:w-96 bg-white border border-pl-border rounded-xl shadow-lg p-5 z-50 animate-fade-in flex flex-col gap-4">
          <div className="border-b pb-2 border-pl-border">
            <h3 className="font-bold text-base text-pl-text">School Profile</h3>
            <p className="text-sm text-pl-text-secondary mt-0.5">Additional account details</p>
          </div>
          <div className="flex flex-col gap-3.5 text-base">
            <div className="flex justify-between items-center gap-4">
              <span className="text-pl-text-secondary shrink-0">Role</span>
              <span className="font-medium text-pl-text capitalize text-right">{data.role || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <span className="text-pl-text-secondary shrink-0">Official Email</span>
              <span className="font-medium text-pl-text text-right break-all max-w-[200px]">{data.school?.officialEmail || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="text-pl-text-secondary shrink-0">Phone</span>
              <span className="font-medium text-pl-text text-right">{data.school?.phone || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="text-pl-text-secondary shrink-0">Status</span>
              <span className="font-medium text-pl-text capitalize text-right">{data.school?.status || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="text-pl-text-secondary shrink-0">Settlement Bank</span>
              <span className="font-medium text-pl-text text-right truncate max-w-[200px]">{data.school?.settlementBankName || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="text-pl-text-secondary shrink-0">Account Number</span>
              <span className="font-medium text-pl-text font-mono text-right">{data.school?.settlementAccountNumber || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="text-pl-text-secondary shrink-0">Account Name</span>
              <span className="font-medium text-pl-text text-right truncate max-w-[200px]">{data.school?.settlementAccountName || 'N/A'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
