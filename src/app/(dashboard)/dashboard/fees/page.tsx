'use client';

import { useState } from 'react';
import { Plus, Search, X, MoreVertical } from 'lucide-react';
import StatusBadge from '@/components/dashboard/StatusBadge';
import StatCard from '@/components/dashboard/StatCard';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const FEES = [
  { id: 1, name: 'Tuition Fee',      class: 'All students', category: 'Compulsory', amount: '₦30,200', students: 120, status: 'Active' as const },
  { id: 2, name: 'ICT Fee',          class: 'SS1-SS3',      category: 'Optional',   amount: '₦30,200', students: 850, status: 'Draft' as const },
  { id: 3, name: 'WAEC Fee',         class: 'SS3',          category: 'Compulsory', amount: '₦30,200', students: 100, status: 'Active' as const },
  { id: 4, name: 'Transport Fee',    class: 'All students', category: 'Optional',   amount: '₦60,750', students: 1500, status: 'Active' as const },
  { id: 5, name: 'Development Levy', class: 'All students', category: 'Compulsory', amount: '₦30,200', students: 1500, status: 'Closed' as const },
];

type View = 'list' | 'create' | 'edit' | 'detail';

export default function FeesPage() {
  const [view, setView] = useState<View>('list');
  const [selectedFee, setSelectedFee] = useState(FEES[0]);
  const [form, setForm] = useState({ name: '', category: '', session: '', class: '', term: '', amount: '', dueDate: '' });

  function openDetail(fee: typeof FEES[0]) {
    setSelectedFee(fee);
    setView('detail');
  }

  function openEdit() {
    setForm({ name: selectedFee.name, category: selectedFee.category, session: '2026/2027', class: selectedFee.class, term: 'First', amount: selectedFee.amount.replace('₦','').replace(',',''), dueDate: '26-04-2026' });
    setView('edit');
  }

  if (view === 'create' || view === 'edit') {
    const isEdit = view === 'edit';
    return (
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>{isEdit ? 'Edit Fee' : 'Create Fee'}</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>
            {isEdit ? 'Update the details of this fee. Changes will apply to all students currently assigned to it.' : 'Create a fee and assign it to students by class'}
          </p>
        </div>
        <div className="bg-white rounded-xl border p-6 max-w-2xl" style={{ borderColor: 'var(--pl-border)' }}>
          <h2 className="font-semibold mb-5" style={{ color: 'var(--pl-text)' }}>Fee Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>Name *</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Enter fee title" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>Category *</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }}>
                <option value="">Select category</option>
                <option>Compulsory</option>
                <option>Optional</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>Academic Session *</label>
              <select value={form.session} onChange={e => setForm(p => ({ ...p, session: e.target.value }))}
                className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }}>
                <option value="">Select session</option>
                <option>2025/2026</option>
                <option>2026/2027</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>Class *</label>
              <select value={form.class} onChange={e => setForm(p => ({ ...p, class: e.target.value }))}
                className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }}>
                <option value="">Select class</option>
                <option>All students</option>
                {['JS1','JS2','JS3','SS1','SS2','SS3'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>Term</label>
              <select value={form.term} onChange={e => setForm(p => ({ ...p, term: e.target.value }))}
                className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }}>
                <option value="">Select term</option>
                <option>First</option>
                <option>Second</option>
                <option>Third</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>Amount *</label>
              <input value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
                placeholder="Enter amount" className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
            </div>
            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>Due Date *</label>
              <input type="date" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))}
                className="border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: 'var(--pl-border)' }} />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <button onClick={() => setView(isEdit ? 'detail' : 'list')}
              className="px-6 py-2 border rounded-lg text-sm font-medium" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}>
              Back
            </button>
            <button onClick={() => setView(isEdit ? 'detail' : 'list')}
              className="px-6 py-2 rounded-lg text-sm font-medium text-white" style={{ background: 'var(--pl-blue)' }}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'detail') {
    const PAYMENTS = [
      { name: 'Chinonso Okeke', class: 'SS1', amount: '₦30,200', account: '8061762007', date: '30-04-2026', status: 'Paid' as const },
      { name: 'Chinonso Okeke', class: 'SS1', amount: '₦30,200', account: '8061762007', date: '30-04-2026', status: 'Paid' as const },
      { name: 'Chinonso Okeke', class: 'SS2', amount: '₦0',      account: '4928375610', date: '03-05-2026', status: 'Due' as const },
      { name: 'Chinonso Okeke', class: 'SS1', amount: '₦30,200', account: '8061762007', date: '30-04-2026', status: 'Paid' as const },
      { name: 'Chinonso Okeke', class: 'SS2', amount: '₦8,750',  account: '4928375610', date: '03-05-2026', status: 'Partial' as const },
    ];
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>{selectedFee.name}</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Primary 5 • First Term • 2026/2027</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setView('list')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border"
              style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text)' }}>
              <X className="w-3.5 h-3.5" /> Close Fee
            </button>
            <button onClick={openEdit}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white"
              style={{ background: 'var(--pl-blue)' }}>
              Edit Fee
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Expected"      value="₦3.0M" icon={DollarSign} />
          <StatCard label="Amount Collected"    value="₦1.5M" icon={TrendingUp} iconBg="var(--pl-green-bg)" iconColor="var(--pl-green)" />
          <StatCard label="Outstanding Balance" value="₦1.5M" icon={AlertCircle} iconBg="var(--pl-red-bg)" iconColor="var(--pl-red)" />
        </div>
        <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--pl-border)' }}>
          <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--pl-border)' }}>
            <p className="font-semibold text-sm" style={{ color: 'var(--pl-text)' }}>Student Payments</p>
            <div className="flex items-center gap-2">
              {['Date', 'Class', 'Status'].map(f => (
                <select key={f} className="text-xs border rounded-lg px-2 py-1 outline-none" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
                  <option>{f}</option>
                </select>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--pl-bg)' }}>
                  {['Name','Class','Amount Paid','Dedicated Account','Date','Status'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-xs font-medium" style={{ color: 'var(--pl-text-secondary)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PAYMENTS.map((row, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: 'var(--pl-border)' }}>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{row.name}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{row.class}</td>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{row.amount}</td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--pl-text-secondary)' }}>{row.account}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{row.date}</td>
                    <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t flex items-center justify-center gap-1 text-xs" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
            {['Previous','1','2','3','4','...','10','Next'].map(p => (
              <button key={p} className="px-2.5 py-1 rounded border" style={{ borderColor: 'var(--pl-border)' }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--pl-text)' }}>Fees</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--pl-text-secondary)' }}>Manage academic fees here</p>
        </div>
        <button
          onClick={() => setView('create')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: 'var(--pl-blue)' }}
        >
          <Plus className="w-3.5 h-3.5" />
          Create Fee
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Expected"      value="₦3.0M" icon={DollarSign} />
        <StatCard label="Amount Collected"    value="₦1.5M" icon={TrendingUp} iconBg="var(--pl-green-bg)" iconColor="var(--pl-green)" />
        <StatCard label="Outstanding Balance" value="₦1.5M" icon={AlertCircle} iconBg="var(--pl-red-bg)" iconColor="var(--pl-red)" />
      </div>

      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="px-5 py-3 border-b flex items-center gap-3" style={{ borderColor: 'var(--pl-border)' }}>
          <p className="font-semibold text-sm flex-1" style={{ color: 'var(--pl-text)' }}>Fee Table</p>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5" style={{ borderColor: 'var(--pl-border)' }}>
            <Search className="w-3.5 h-3.5" style={{ color: 'var(--pl-text-secondary)' }} />
            <input placeholder="Search by name or ID" className="text-xs outline-none bg-transparent w-36" style={{ color: 'var(--pl-text)' }} />
          </div>
          {['Class', 'Category', 'Status'].map(f => (
            <select key={f} className="text-xs border rounded-lg px-2.5 py-1.5 outline-none" style={{ borderColor: 'var(--pl-border)', color: 'var(--pl-text-secondary)' }}>
              <option>{f}</option>
            </select>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--pl-bg)' }}>
                {['Name','Class','Category','Amount','Students','Status',''].map((h,i) => (
                  <th key={i} className="text-left px-4 py-2.5 text-xs font-medium" style={{ color: 'var(--pl-text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEES.map(fee => (
                <tr
                  key={fee.id}
                  className="border-t hover:bg-gray-50 cursor-pointer transition-colors"
                  style={{ borderColor: 'var(--pl-border)' }}
                  onClick={() => openDetail(fee)}
                >
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{fee.name}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{fee.class}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{fee.category}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--pl-text)' }}>{fee.amount}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--pl-text-secondary)' }}>{fee.students.toLocaleString()}</td>
                  <td className="px-4 py-3"><StatusBadge status={fee.status} /></td>
                  <td className="px-4 py-3"><MoreVertical className="w-4 h-4" style={{ color: 'var(--pl-text-secondary)' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
