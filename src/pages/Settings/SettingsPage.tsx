import React from 'react';
import { Shield, Database } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../utils/security';

export const SettingsPage: React.FC = () => {
  const { user, updateRole } = useAuthStore();
  const dataMode = import.meta.env.VITE_DATA_MODE || 'mock';

  return (
    <div className="space-y-6">
      {/* Security & Access Control */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Shield className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="text-base font-bold text-slate-900">Administrative Security & RBAC</h3>
            <p className="text-xs text-slate-500">Configure administrative roles and privilege levels</p>
          </div>
        </div>

        <div className="mt-4 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Active Session Role
            </label>
            <div className="flex gap-2">
              {(['super_admin', 'admin', 'auditor'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => updateRole(role)}
                  className={`px-3 py-1.5 rounded-lg font-semibold capitalize border transition-all ${
                    user?.role === role
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {role.replace('_', ' ')}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-slate-400 text-[11px]">
              Switch roles to test dynamic RBAC permission gating across the admin dashboard.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
            <h4 className="font-bold text-slate-800 mb-2">Healthcare Privacy Constraints</h4>
            <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
              <li>Aadhaar / National ID numbers are strictly masked on all UI endpoints.</li>
              <li>Family member medical and demographic files follow a read-only security model.</li>
              <li>Administrative credential changes require two-factor authentication (2FA).</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Backend & Environment Configuration */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Database className="h-5 w-5 text-purple-600" />
          <div>
            <h3 className="text-base font-bold text-slate-900">Data Architecture & API Integration</h3>
            <p className="text-xs text-slate-500">Current frontend data-provider configuration</p>
          </div>
        </div>

        <div className="mt-4 space-y-3 text-xs">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-200">
            <div>
              <span className="text-slate-500 text-[11px] block">Active Data Provider Mode</span>
              <span className="font-bold text-slate-900 font-mono text-sm uppercase">
                {dataMode}
              </span>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                dataMode === 'mock'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {dataMode === 'mock' ? 'Local High-Fidelity Mock' : 'Production API Active'}
            </span>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            To switch to live API integration, update <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">VITE_DATA_MODE=api</code> and provide <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">VITE_API_BASE_URL</code> in your environment file.
          </p>
        </div>
      </div>
    </div>
  );
};
