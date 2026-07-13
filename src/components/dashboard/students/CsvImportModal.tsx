'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { useImportStudents } from '@/api/students';

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CsvImportModal({ isOpen, onClose }: CsvImportModalProps) {
  const importStudents = useImportStudents();
  const [dragging, setDragging] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.csv')) {
        setCsvFile(file);
      } else {
        toast.error('Please upload a valid CSV file.');
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.name.endsWith('.csv')) {
        setCsvFile(file);
      } else {
        toast.error('Please upload a valid CSV file.');
      }
    }
  };

  const handleSubmit = () => {
    if (!csvFile) {
      toast.error('Please select a CSV file first.');
      return;
    }
    const formData = new FormData();
    formData.append('file', csvFile);

    importStudents.mutate(formData, {
      onSuccess: () => {
        setCsvFile(null);
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 animate-scale-up">
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--pl-border)' }}>
          <div>
            <h2 className="font-semibold text-pl-text">Import Students</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Upload a CSV file to bulk-add students</p>
          </div>
          <button onClick={onClose} className="cursor-pointer">
            <X className="w-5 h-5" style={{ color: 'var(--pl-text-secondary)' }} />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center gap-3 transition-colors"
            style={{ borderColor: dragging ? 'var(--pl-blue)' : 'var(--pl-border)', background: dragging ? 'var(--pl-blue-light)' : 'var(--pl-bg)' }}
          >
            <Upload className="w-8 h-8" style={{ color: 'var(--pl-blue)' }} />
            <div className="text-center">
              <p className="text-sm font-medium text-pl-text">Drag & drop your CSV file here</p>
              <p className="text-xs mt-1 text-pl-text-secondary">or click to browse</p>
            </div>
            <input type="file" accept=".csv" className="hidden" id="csv-input" onChange={handleFileChange} />
            <label htmlFor="csv-input"
              className="px-4 py-2 rounded-lg text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity"
              style={{ background: 'var(--pl-blue)' }}>
              Browse file
            </label>
          </div>
          {csvFile && (
            <p className="text-xs font-semibold text-pl-blue">
              Selected file: {csvFile.name} ({(csvFile.size / 1024).toFixed(1)} KB)
            </p>
          )}
          <p className="text-xs text-pl-text-secondary">
            CSV must include: <strong>AdmissionNo, FullName, Class, Session, GuardianName, GuardianPhone, GuardianEmail</strong>
          </p>
          <div className="flex items-center gap-3">
            <button onClick={onClose}
              className="flex-1 border rounded-lg py-2 text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}>
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={importStudents.isPending || !csvFile}
              className="flex-1 rounded-lg py-2 text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ background: 'var(--pl-blue)' }}
            >
              {importStudents.isPending ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
