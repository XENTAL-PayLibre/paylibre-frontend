'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Landmark, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useMe } from '@/api/auth';
import { useBanks, useUpdateSettlement } from '@/api/school';
import { SettlementSchema } from '@/schemas';

type SettlementFormData = z.infer<typeof SettlementSchema>;

export default function SettingsPage() {
  const { data: me } = useMe();
  const { data: banks, isLoading: banksLoading } = useBanks();
  const updateSettlement = useUpdateSettlement();
  const school = me?.school;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettlementFormData>({
    resolver: zodResolver(SettlementSchema),
    defaultValues: {
      bankName: school?.settlementBankName ?? '',
      accountNumber: school?.settlementAccountNumber ?? '',
    },
  });

  const onSubmit = (data: SettlementFormData) => {
    const bankCode = banks?.find((b) => b.name === data.bankName)?.code ?? '';
    updateSettlement.mutate({
      bankName: data.bankName,
      bankCode,
      accountNumber: data.accountNumber,
    });
  };

  const configured = school?.settlementConfigured;

  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>Settings</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>
          Manage where your collected fees are paid out.
        </p>
      </div>

      <div className="bg-white rounded-xl border p-5 flex flex-col gap-4" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="flex items-center gap-2.5 border-b pb-3" style={{ borderColor: 'var(--pl-border)' }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--pl-blue-light)' }}>
            <Landmark className="w-4 h-4" style={{ color: 'var(--pl-blue)' }} />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--pl-text)' }}>Payout Account</p>
            <p className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>The bank account your school fees settle to.</p>
          </div>
        </div>

        {/* Current status */}
        {configured ? (
          <div className="flex items-start gap-2.5 rounded-lg p-3" style={{ background: 'var(--pl-green-bg)' }}>
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--pl-green)' }} />
            <div className="text-sm">
              <p className="font-medium" style={{ color: 'var(--pl-text)' }}>
                {school?.settlementAccountName || 'Account configured'}
              </p>
              <p style={{ color: 'var(--pl-text-secondary)' }}>
                {school?.settlementBankName} · <span className="font-mono">{school?.settlementAccountNumber}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2.5 rounded-lg p-3" style={{ background: 'var(--pl-red-bg)' }}>
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--pl-red)' }} />
            <div className="text-sm">
              <p className="font-medium" style={{ color: 'var(--pl-text)' }}>No payout account yet</p>
              <p style={{ color: 'var(--pl-text-secondary)' }}>
                Add your bank account below so collected fees can be settled to your school.
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium" style={{ color: 'var(--pl-text-secondary)' }}>Bank</span>
            <select
              disabled={banksLoading}
              className={`border rounded-lg px-3 py-2.5 text-base outline-none w-full bg-transparent disabled:opacity-60 ${errors.bankName ? 'border-pl-red' : 'border-pl-border focus:border-pl-blue'}`}
              {...register('bankName')}
            >
              <option value="">{banksLoading ? 'Loading banks…' : 'Select your bank'}</option>
              {banks?.map((b) => (
                <option key={b.code} value={b.name}>{b.name}</option>
              ))}
            </select>
            {errors.bankName && <span className="text-xs text-pl-red">{errors.bankName.message}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium" style={{ color: 'var(--pl-text-secondary)' }}>Account Number</span>
            <input
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit account number"
              className={`border rounded-lg px-3 py-2.5 text-base outline-none w-full ${errors.accountNumber ? 'border-pl-red' : 'border-pl-border focus:border-pl-blue'}`}
              {...register('accountNumber')}
            />
            {errors.accountNumber && <span className="text-xs text-pl-red">{errors.accountNumber.message}</span>}
          </label>

          <button
            type="submit"
            disabled={updateSettlement.isPending}
            className="self-start px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
            style={{ background: 'var(--pl-blue)' }}
          >
            {updateSettlement.isPending ? 'Saving…' : configured ? 'Update Payout Account' : 'Save Payout Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
