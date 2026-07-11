import { cn } from '@/lib/utils';

type Status = 'Paid' | 'Due' | 'Partial' | 'Active' | 'Draft' | 'Closed';

const styles: Record<Status, { bg: string; color: string }> = {
  Paid:    { bg: 'var(--pl-green-bg)',  color: 'var(--pl-green)' },
  Active:  { bg: 'var(--pl-green-bg)',  color: 'var(--pl-green)' },
  Partial: { bg: 'var(--pl-amber-bg)',  color: 'var(--pl-amber)' },
  Draft:   { bg: 'var(--pl-amber-bg)',  color: 'var(--pl-amber)' },
  Due:     { bg: 'var(--pl-red-bg)',    color: 'var(--pl-red)' },
  Closed:  { bg: '#F3F4F6',            color: '#6B7280' },
};

export default function StatusBadge({ status }: { status: Status }) {
  const s = styles[status] ?? styles.Closed;
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ background: s.bg, color: s.color }}
    >
      {status}
    </span>
  );
}
