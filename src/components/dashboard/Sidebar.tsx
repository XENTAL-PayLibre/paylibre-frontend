'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  BarChart2,
  Settings,
  X,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLogout } from '@/api/auth';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Students', href: '/students', icon: Users },
  { label: 'Fees', href: '/fees', icon: FileText },
  { label: 'Payments', href: '/payments', icon: CreditCard },
  { label: 'Reports', href: '/reports', icon: BarChart2 },
];

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const logout = useLogout();

  return (
    <aside className="w-[220px] shrink-0 flex flex-col h-screen bg-white border-r px-3 py-5" style={{ borderColor: 'var(--pl-border)' }}>
      {/* Logo */}
      <div className="px-2 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--pl-blue)' }}>
            <span className="text-white text-xs font-bold">PL</span>
          </div>
          <div>
            <p className="text-sm font-bold leading-tight" style={{ color: 'var(--pl-text)' }}>PayLibre</p>
            <p className="text-[10px] leading-tight" style={{ color: 'var(--pl-text-secondary)' }}>Education Finance</p>
          </div>
        </div>
        {onNavigate && (
          <button onClick={onNavigate} className="lg:hidden p-1 rounded">
            <X className="w-4 h-4" style={{ color: 'var(--pl-text-secondary)' }} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = href === '/dashboard' ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-base transition-colors',
                isActive
                  ? 'font-medium'
                  : 'hover:bg-gray-50'
              )}
              style={isActive
                ? { background: 'var(--pl-blue-light)', color: 'var(--pl-blue)' }
                : { color: 'var(--pl-text-secondary)' }
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="flex flex-col gap-0.5">
        <Link
          href="/settings"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-base hover:bg-gray-50"
          style={{ color: 'var(--pl-text-secondary)' }}
        >
          <Settings className="w-4 h-4 shrink-0" />
          Settings
        </Link>
        <button
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-base hover:bg-red-50 w-full transition-colors cursor-pointer disabled:opacity-50"
          style={{ color: 'var(--pl-text-secondary)' }}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {logout.isPending ? 'Logging out...' : 'Log out'}
        </button>
      </div>
    </aside>
  );
}
