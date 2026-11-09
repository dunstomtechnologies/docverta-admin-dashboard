import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ErrorBoundary } from '../common/ErrorBoundary';

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col lg:pl-64 transition-all duration-200 min-h-screen">
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>

        {/* Healthcare Platform Footer */}
        <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <p>© {new Date().getFullYear()} Docverta Health Technologies. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                HIPAA & DISHA Aligned
              </span>
              <span>•</span>
              <span>Audit Logging Active</span>
              <span>•</span>
              <span className="text-blue-600 font-medium">Mode: {import.meta.env.VITE_DATA_MODE || 'mock'}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
