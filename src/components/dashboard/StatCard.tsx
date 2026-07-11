import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
}

export default function StatCard({ label, value, sub, icon: Icon, iconBg, iconColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border p-5" style={{ borderColor: 'var(--pl-border)' }}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm" style={{ color: 'var(--pl-text-secondary)' }}>{label}</p>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: iconBg ?? 'var(--pl-blue-light)' }}>
          <Icon className="w-4 h-4" style={{ color: iconColor ?? 'var(--pl-blue)' }} />
        </div>
      </div>
      <p className="text-2xl font-bold" style={{ color: 'var(--pl-text)' }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: 'var(--pl-text-secondary)' }}>{sub}</p>}
    </div>
  );
}
