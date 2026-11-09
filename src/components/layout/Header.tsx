import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  LogOut,
  Shield,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../utils/security';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleMobileSidebar, unreadNotificationsCount, clearUnreadNotifications } = useUIStore();
  const { user, logout, updateRole } = useAuthStore();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = (pathname: string): { title: string; subtitle?: string } => {
    switch (pathname) {
      case '/':
        return { title: 'Dashboard', subtitle: 'Overview of platform statistics, appointments and doctor approvals' };
      case '/patients':
        return { title: 'Patients Management', subtitle: 'View registered patients, appointment history and protected records' };
      case '/doctors':
        return { title: 'Doctors Directory', subtitle: 'Manage practicing physicians, qualifications and consult schedules' };
      case '/doctor-verification':
        return { title: 'Doctor Verification & KYC', subtitle: 'Review medical registrations and approve practicing licenses' };
      case '/appointments':
        return { title: 'Appointments Management', subtitle: 'Monitor upcoming, completed and rescheduled consultations' };
      case '/services':
        return { title: 'Clinical Services', subtitle: 'Manage available health packages, diagnostic tests and consultations' };
      case '/specializations':
        return { title: 'Medical Specializations', subtitle: 'Departmental classifications and clinical domains' };
      case '/reviews':
        return { title: 'Reviews & Ratings', subtitle: 'Patient feedback, clinical ratings and service quality metrics' };
      case '/reports':
        return { title: 'Reports & Analytics', subtitle: 'Financial reconciliation, appointment trends and utilization metrics' };
      case '/announcements':
        return { title: 'Announcements', subtitle: 'Broadcast platform notices to doctors and patients' };
      case '/faqs':
        return { title: 'FAQ Management', subtitle: 'Manage frequently asked questions and knowledge base' };
      case '/settings':
        return { title: 'Admin Settings', subtitle: 'Security policies, role configurations and audit trails' };
      default:
        return { title: 'Docverta Admin', subtitle: 'Healthcare Administration' };
    }
  };

  const { title } = getPageTitle(location.pathname);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notifications = [
    {
      id: 1,
      type: 'verification',
      title: 'New Verification Request',
      description: 'Dr. Harshvardhan Patel submitted medical license for verification',
      time: '10 mins ago',
      read: false,
    },
    {
      id: 2,
      type: 'appointment',
      title: 'High Consultation Volume',
      description: 'Over 240 appointments completed today across specialties',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'system',
      title: 'Security Audit Completed',
      description: 'HIPAA & Indian Digital Health compliance checks passed',
      time: '3 hours ago',
      read: true,
    },
  ];

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-6 backdrop-blur transition-all">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileSidebar}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden"
          aria-label="Toggle Navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight sm:text-xl">
            {title}
          </h1>
        </div>
      </div>

      {/* Right: Search, Notifications, Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Global Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients, doctors, appointments..."
            className="h-9 w-64 rounded-full border border-slate-200 bg-slate-50/70 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all lg:w-80"
          />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              if (!notificationsOpen) clearUnreadNotifications();
            }}
            className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl z-50">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-900 text-sm">Notifications</h4>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                    Live
                  </span>
                </div>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  Mark all as read
                </button>
              </div>

              <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      {item.type === 'verification' && <AlertCircle className="h-4 w-4" />}
                      {item.type === 'appointment' && <UserCheck className="h-4 w-4" />}
                      {item.type === 'system' && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="font-semibold text-slate-800">{item.title}</p>
                      <p className="text-slate-500 mt-0.5 leading-relaxed">{item.description}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 border-t border-slate-100 pt-2 text-center">
                <button
                  onClick={() => {
                    setNotificationsOpen(false);
                    navigate('/doctor-verification');
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  View Pending Requests <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 rounded-full p-1 pl-1 pr-2 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Admin User Menu"
          >
            <div className="relative">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={user?.name || 'Admin'}
                className="h-8 w-8 rounded-full border border-slate-200 object-cover"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
            </div>
            <div className="hidden text-left md:block">
              <p className="text-xs font-semibold text-slate-800 leading-tight">
                {user?.name || 'Admin'}
              </p>
              <p className="text-[10px] font-medium text-slate-500 capitalize">
                {user?.role?.replace('_', ' ') || 'Super Admin'}
              </p>
            </div>
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50">
              <div className="border-b border-slate-100 px-3 py-2">
                <p className="text-xs font-semibold text-slate-900">{user?.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                <div className="mt-2 flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                  <Shield className="h-3 w-3 text-blue-600" />
                  <span className="capitalize">{user?.role?.replace('_', ' ')}</span>
                </div>
              </div>

              {/* RBAC Role Switcher (For live demonstration of permissions) */}
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Simulate Role (RBAC)
                </p>
                <div className="grid grid-cols-3 gap-1">
                  {(['super_admin', 'admin', 'auditor'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => updateRole(r)}
                      className={`px-2 py-1 text-[10px] rounded font-medium capitalize transition-colors ${
                        user?.role === r
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {r.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    navigate('/settings');
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Shield className="h-4 w-4 text-slate-400" />
                  Security Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="h-4 w-4 text-rose-500" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
