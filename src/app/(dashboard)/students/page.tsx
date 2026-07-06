'use client';

import { useState } from 'react';
import { Search, Upload, Plus, X, Copy, CheckCheck } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';

const STUDENTS = [
  { admNo: 'ADM001', name: 'Chinonso Okeke',   class: 'SS1', guardian: 'Mr. Okeke',    account: '8061762007', status: 'Paid' as const },
  { admNo: 'ADM002', name: 'Amara Eze',         class: 'SS2', guardian: 'Mrs. Eze',     account: '4928375610', status: 'Partial' as const },
  { admNo: 'ADM003', name: 'Tunde Adeyemi',     class: 'SS3', guardian: 'Mr. Adeyemi',  account: '7712309842', status: 'Paid' as const },
  { admNo: 'ADM004', name: 'Ngozi Okafor',      class: 'JS3', guardian: 'Mrs. Okafor',  account: '—',          status: 'Due' as const },
  { admNo: 'ADM005', name: 'Emeka Obi',         class: 'SS1', guardian: 'Mr. Obi',      account: '8061762008', status: 'Paid' as const },
  { admNo: 'ADM006', name: 'Fatima Bello',      class: 'JS1', guardian: 'Mr. Bello',    account: '9032145678', status: 'Partial' as const },
  { admNo: 'ADM007', name: 'Ibrahim Musa',      class: 'SS2', guardian: 'Mrs. Musa',    account: '7745612309', status: 'Paid' as const },
  { admNo: 'ADM008', name: 'Chisom Onyeka',     class: 'JS2', guardian: 'Mr. Onyeka',   account: '—',          status: 'Due' as const },
];

type Modal = 'none' | 'add' | 'csv' | 'account';

export default function StudentsPage() {
  const [modal, setModal] = useState<Modal>('none');
  const [search, setSearch] = useState('');
  const [newStudent, setNewStudent] = useState({ name: '', admNo: '', guardian: '', phone: '', email: '', session: '', class: '' });
  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState(false);

  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.admNo.toLowerCase().includes(search.toLowerCase())
  );

  function handleCopy() {
    navigator.clipboard.writeText('9024 5512 8830');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleAddStudent(e: React.FormEvent) {
    e.preventDefault();
    setModal('account');
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>Students</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Manage your student directory</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setModal('csv')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border"
            style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}
          >
            <Upload className="w-3.5 h-3.5" />
            Import CSV
          </button>
          <button
            onClick={() => setModal('add')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: 'var(--pl-blue)' }}
          >
            <Plus className="w-3.5 h-3.5" />
            Add Student
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="px-5 py-3 border-b flex items-center gap-3" style={{ borderColor: 'var(--pl-border)' }}>
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--pl-text-secondary)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or ID"
              className="bg-transparent text-sm outline-none flex-1"
              style={{ color: 'var(--pl-text)' }}
            />
          </div>
          <select className="text-xs border rounded-lg px-2.5 py-1.5 outline-none ml-auto" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
            <option>All Classes</option>
            <option>SS1</option><option>SS2</option><option>SS3</option>
            <option>JS1</option><option>JS2</option><option>JS3</option>
          </select>
          <select className="text-xs border rounded-lg px-2.5 py-1.5 outline-none" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
            <option>All Status</option>
            <option>Paid</option><option>Partial</option><option>Due</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--pl-bg)' }}>
                {['Admission No.', 'Name', 'Class', 'Parent/Guardian', 'Dedicated Account', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-medium" style={{ color: 'var(--pl-text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={i} className="border-t hover:bg-gray-50 cursor-pointer transition-colors" style={{ borderColor: 'var(--pl-border)' }}>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: 'var(--pl-text-secondary)' }}>{row.admNo}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{row.name}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{row.class}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{row.guardian}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--pl-text-secondary)' }}>{row.account}</td>
                  <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
          <span>Showing {filtered.length} of {STUDENTS.length} students</span>
          <div className="flex items-center gap-1">
            {['Previous', '1', '2', '3', 'Next'].map(p => (
              <button key={p} className="px-2.5 py-1 rounded border" style={{ borderColor: 'var(--pl-border)' }}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {modal === 'add' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--pl-border)' }}>
              <div>
                <h2 className="font-semibold" style={{ color: 'var(--pl-text)' }}>Add Student</h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Fill in the student details below</p>
              </div>
              <button onClick={() => setModal('none')}><X className="w-5 h-5" style={{ color: 'var(--pl-text-secondary)' }} /></button>
            </div>
            <form onSubmit={handleAddStudent} className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>Full Name *</label>
                  <input required value={newStudent.name} onChange={e => setNewStudent(p => ({ ...p, name: e.target.value }))}
                    placeholder="Enter full name" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>Admission Number *</label>
                  <input required value={newStudent.admNo} onChange={e => setNewStudent(p => ({ ...p, admNo: e.target.value }))}
                    placeholder="e.g. ADM009" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>Parent/Guardian</label>
                  <input value={newStudent.guardian} onChange={e => setNewStudent(p => ({ ...p, guardian: e.target.value }))}
                    placeholder="Guardian name" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>Phone Number</label>
                  <input value={newStudent.phone} onChange={e => setNewStudent(p => ({ ...p, phone: e.target.value }))}
                    placeholder="08012345678" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>Email Address</label>
                  <input type="email" value={newStudent.email} onChange={e => setNewStudent(p => ({ ...p, email: e.target.value }))}
                    placeholder="parent@email.com" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>Academic Session *</label>
                  <select required value={newStudent.session} onChange={e => setNewStudent(p => ({ ...p, session: e.target.value }))}
                    className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }}>
                    <option value="">Select session</option>
                    <option>2025/2026</option>
                    <option>2026/2027</option>
                  </select>
                </div>
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>Class *</label>
                  <select required value={newStudent.class} onChange={e => setNewStudent(p => ({ ...p, class: e.target.value }))}
                    className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }}>
                    <option value="">Select class</option>
                    {['JS1','JS2','JS3','SS1','SS2','SS3'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-lg p-3 text-xs" style={{ background: 'var(--pl-blue-light)', color: 'var(--pl-blue)' }}>
                <span className="shrink-0">ℹ️</span>
                A dedicated virtual account will be created automatically for this student upon saving.
              </div>
              <div className="flex items-center gap-3 pt-1">
                <button type="button" onClick={() => setModal('none')}
                  className="flex-1 border rounded-lg py-2 text-sm font-medium" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}>
                  Cancel
                </button>
                <button type="submit" className="flex-1 rounded-lg py-2 text-sm font-medium text-white" style={{ background: 'var(--pl-blue)' }}>
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV Modal */}
      {modal === 'csv' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--pl-border)' }}>
              <div>
                <h2 className="font-semibold" style={{ color: 'var(--pl-text)' }}>Import Students</h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Upload a CSV file to bulk-add students</p>
              </div>
              <button onClick={() => setModal('none')}><X className="w-5 h-5" style={{ color: 'var(--pl-text-secondary)' }} /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); }}
                className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center gap-3 transition-colors"
                style={{ borderColor: dragging ? 'var(--pl-blue)' : 'var(--pl-border)', background: dragging ? 'var(--pl-blue-light)' : 'var(--pl-bg)' }}
              >
                <Upload className="w-8 h-8" style={{ color: 'var(--pl-blue)' }} />
                <div className="text-center">
                  <p className="text-sm font-medium" style={{ color: 'var(--pl-text)' }}>Drag & drop your CSV file here</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--pl-text-secondary)' }}>or click to browse</p>
                </div>
                <input type="file" accept=".csv" className="hidden" id="csv-input" />
                <label htmlFor="csv-input"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white cursor-pointer"
                  style={{ background: 'var(--pl-blue)' }}>
                  Browse file
                </label>
              </div>
              <p className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>
                CSV must include: <strong>name, admission_no, class, guardian_name, phone, email</strong>
              </p>
              <div className="flex items-center gap-3">
                <button onClick={() => setModal('none')}
                  className="flex-1 border rounded-lg py-2 text-sm font-medium" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}>
                  Cancel
                </button>
                <button className="flex-1 rounded-lg py-2 text-sm font-medium text-white" style={{ background: 'var(--pl-blue)' }}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Virtual Account Ready Modal */}
      {modal === 'account' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col items-center gap-4">
            <div
              className="w-full rounded-2xl p-5 flex flex-col gap-2"
              style={{ background: 'linear-gradient(135deg, var(--pl-blue), #0041a8)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-xs opacity-70">Dedicated Account</span>
                <span className="text-white text-xs opacity-70">PayLibre</span>
              </div>
              <p className="text-white font-mono text-xl font-bold tracking-widest">9024 5512 8830</p>
              <p className="text-white text-xs opacity-80">PayLibre — {newStudent.name || 'Emma Thompson'}</p>
            </div>
            <div className="text-center">
              <p className="font-semibold" style={{ color: 'var(--pl-text)' }}>Virtual Account Ready!</p>
              <p className="text-xs mt-1" style={{ color: 'var(--pl-text-secondary)' }}>
                A dedicated NUBAN has been assigned to this student. Parents can now pay directly to this account number.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <button onClick={handleCopy}
                className="flex items-center justify-center gap-2 border rounded-lg py-2 text-sm font-medium w-full"
                style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}>
                {copied ? <CheckCheck className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Account Details'}
              </button>
              <button onClick={() => setModal('none')}
                className="flex items-center justify-center rounded-lg py-2 text-sm font-medium text-white w-full"
                style={{ background: 'var(--pl-blue)' }}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
