import React, { useState } from 'react';
import { Search, Lock, FileSpreadsheet } from 'lucide-react';
import { usePatients } from '../../hooks/usePatients';
import { Badge } from '../../components/common/Badge';
import { Pagination } from '../../components/tables/Pagination';
import { Skeleton } from '../../components/common/Skeleton';
import { useAuthStore } from '../../store/authStore';
import { getRolePermissions } from '../../utils/security';

export const PatientsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuthStore();
  const permissions = getRolePermissions(user?.role || 'admin');

  const { data: response, isLoading } = usePatients({
    page: currentPage,
    limit: 10,
    search: search.trim() ? search : undefined,
  });

  const patients = response?.data || [];
  const pagination = response?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10,
  };

  return (
    <div className="space-y-6">
      {/* Privacy Notice Banner */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 flex items-start gap-3">
        <Lock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-bold text-blue-900">Protected Healthcare Data Governance (DISHA / HIPAA)</p>
          <p className="text-blue-700 mt-0.5">
            Aadhaar and national identification numbers are strictly masked. Family member medical histories
            are restricted to a read-only security model. Modifications to family identity documents are disabled for administrators.
          </p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-5 border-b border-slate-100 gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Registered Patients</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Demographic registry and clinical appointment volume
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search patient name, city..."
                className="h-8.5 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {permissions.canExportPatientData ? (
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
                <FileSpreadsheet className="h-4 w-4 text-emerald-600" /> Export List
              </button>
            ) : (
              <span className="text-[11px] text-slate-400 italic">Export Restricted</span>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3">Patient Profile</th>
                <th className="px-5 py-3">Protected ID (Aadhaar)</th>
                <th className="px-5 py-3">Gender / Age</th>
                <th className="px-5 py-3">Blood Group</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Family Members</th>
                <th className="px-5 py-3 text-right">Appointments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7} className="px-5 py-3.5">
                      <Skeleton className="h-6 w-full" />
                    </td>
                  </tr>
                ))
              ) : patients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-400">
                    No patients found matching the criteria.
                  </td>
                </tr>
              ) : (
                patients.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.avatarUrl}
                          alt={p.name}
                          className="h-8 w-8 rounded-full object-cover border"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{p.name}</p>
                          <p className="text-[11px] text-slate-400">{p.phone}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 font-mono text-slate-600">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px]">
                        {p.maskedAadhaar}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      {p.gender}, {p.age} yrs
                    </td>

                    <td className="px-5 py-3.5">
                      <Badge variant="purple" size="sm">
                        {p.bloodGroup}
                      </Badge>
                    </td>

                    <td className="px-5 py-3.5 text-slate-600">{p.city}</td>

                    <td className="px-5 py-3.5">
                      <span className="text-slate-600">
                        {p.familyMembersCount} (Read-only)
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-right font-bold text-slate-900">
                      {p.totalAppointments}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalCount={pagination.totalCount}
          limit={pagination.limit}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
