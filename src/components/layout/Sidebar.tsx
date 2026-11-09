import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Stethoscope,
  Award,
  Star,
  BarChart3,
  FileText,
  Settings,
  ChevronDown,
  ShieldCheck,
  X,
  Activity,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';

interface NavItemChild {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavItemChild[];
}

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { mobileSidebarOpen, setMobileSidebarOpen } = useUIStore();
  const { user } = useAuthStore();

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    Users: true,
    'Content Management': false,
  });

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'Users',
      icon: Users,
      children: [
        { name: 'Patients', href: '/patients' },
        { name: 'Doctors', href: '/doctors' },
      ],
    },
    {
      name: 'Appointments',
      href: '/appointments',
      icon: CalendarCheck,
    },
    {
      name: 'Services',
      href: '/services',
      icon: Stethoscope,
    },
    {
      name: 'Specializations',
      href: '/specializations',
      icon: Award,
    },
    {
      name: 'Reviews & Ratings',
      href: '/reviews',
      icon: Star,
    },
    {
      name: 'Reports & Analytics',
      href: '/reports',
      icon: BarChart3,
    },
    {
      name: 'Content Management',
      icon: FileText,
      children: [
        { name: 'Announcements', href: '/announcements' },
        { name: 'FAQs', href: '/faqs' },
      ],
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];

  const isChildActive = (children?: NavItemChild[]) => {
    if (!children) return false;
    return children.some((c) => location.pathname === c.href);
  };

  const renderNavContent = () => (
    <div className="flex h-full flex-col justify-between overflow-y-auto bg-[#0B132B] text-slate-300">
      <div>
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white">Docverta</span>
                <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-blue-400">
                  ADMIN
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-400">Healthcare Core</span>
            </div>
          </div>
          {/* Mobile close button */}
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="px-4 py-6">
          <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Main Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              if (item.children) {
                const groupActive = isChildActive(item.children);
                const isExpanded = expandedGroups[item.name] ?? groupActive;

                return (
                  <div key={item.name} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => toggleGroup(item.name)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150',
                        groupActive
                          ? 'bg-white/10 text-white'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={cn(
                            'h-5 w-5 transition-colors',
                            groupActive ? 'text-blue-400' : 'text-slate-400'
                          )}
                        />
                        <span>{item.name}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-slate-400 transition-transform duration-200',
                          isExpanded && 'rotate-180 text-white'
                        )}
                      />
                    </button>

                    {isExpanded && (
                      <div className="ml-4 space-y-1 border-l border-white/10 pl-3">
                        {item.children.map((sub) => {
                          const active = location.pathname === sub.href;
                          return (
                            <NavLink
                              key={sub.name}
                              to={sub.href}
                              onClick={() => setMobileSidebarOpen(false)}
                              className={cn(
                                'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                                active
                                  ? 'bg-blue-600 font-semibold text-white shadow-sm shadow-blue-600/30'
                                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
                              )}
                            >
                              <span>{sub.name}</span>
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isItemActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href || '#'}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={cn(
                    'group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150',
                    isItemActive
                      ? 'bg-blue-600 font-semibold text-white shadow-sm shadow-blue-600/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        'h-5 w-5 transition-colors',
                        isItemActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                      )}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-semibold text-blue-300">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer User Box */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
            alt={user?.name || 'Admin'}
            className="h-10 w-10 rounded-full border border-white/20 object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">{user?.name || 'Administrator'}</p>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="h-3 w-3" />
              <span className="capitalize">{user?.role?.replace('_', ' ') || 'Super Admin'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-800 lg:block">
        {renderNavContent()}
      </aside>

      {/* Mobile Sidebar Overlay and Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-full shadow-2xl transition-transform">
            {renderNavContent()}
          </div>
        </div>
      )}
    </>
  );
};
