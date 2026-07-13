import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  layout?: 'vertical' | 'horizontal' | 'figma';
}

export default function StatCard({ label, value, sub, icon: Icon, iconBg, iconColor, layout = 'vertical' }: StatCardProps) {
  if (layout === 'figma') {
    return (
      <div className="bg-white rounded-xl border p-5 flex flex-col gap-3" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: iconBg ?? 'var(--pl-blue-light)' }}>
          <Icon className="w-4.5 h-4.5" style={{ color: iconColor ?? 'var(--pl-blue)' }} />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm" style={{ color: 'var(--pl-text-secondary)' }}>{label}</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--pl-text)' }}>{value}</p>
          {sub && <p className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>{sub}</p>}
        </div>
      </div>
    );
  }

  if (layout === 'horizontal') {
    return (
      <div className="bg-white rounded-xl border p-5 flex items-center gap-4" style={{ borderColor: 'var(--pl-border)' }}>
        <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: iconBg ?? 'var(--pl-blue-light)' }}>
          <Icon className="w-5 h-5" style={{ color: iconColor ?? 'var(--pl-blue)' }} />
        </div>
        <div className="flex flex-col">
          <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--pl-text-secondary)' }}>{label}</p>
          <p className="text-xl sm:text-2xl font-bold mt-0.5" style={{ color: 'var(--pl-text)' }}>{value}</p>
          {sub && <p className="text-xs mt-1" style={{ color: 'var(--pl-text-secondary)' }}>{sub}</p>}
        </div>
      </div>
    );
  }

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
