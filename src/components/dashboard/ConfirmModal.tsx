'use client';

import { X, AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isPending?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isPending = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 overflow-hidden animate-scale-up">
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--pl-border)' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-pl-red" />
            </div>
            <h2 className="font-semibold text-pl-text">{title}</h2>
          </div>
          <button onClick={onClose} className="cursor-pointer">
            <X className="w-5 h-5 text-pl-text-secondary" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm leading-relaxed text-pl-text-secondary">
            {message}
          </p>
          <div className="flex items-center gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border rounded-lg py-2 text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors"
              style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              disabled={isPending}
              className="flex-1 rounded-lg py-2 text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ background: 'var(--pl-red)' }}
            >
              {isPending ? 'Processing...' : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
