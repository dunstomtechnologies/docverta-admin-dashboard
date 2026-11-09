import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, ShieldCheck } from 'lucide-react';
import { useDoctors } from '../../hooks/useDoctors';
import { Badge } from '../../components/common/Badge';
import { Pagination } from '../../components/tables/Pagination';
import { Skeleton } from '../../components/common/Skeleton';

export const DoctorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: response, isLoading } = useDoctors({
    page: currentPage,
    limit: 10,
    search: search.trim() ? search : undefined,
  });

  const doctors = response?.data || [];
  const pagination = response?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10,
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-5 border-b border-slate-100 gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Doctors Directory</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified clinicians, consulting affiliations and clinical ratings
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
                placeholder="Search name, specialty, hospital..."
                className="h-8.5 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <button
              onClick={() => navigate('/doctor-verification')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 shadow-sm transition-colors"
            >
              <ShieldCheck className="h-4 w-4" /> Pending Approvals
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3">Doctor</th>
                <th className="px-5 py-3">Specialization & Degrees</th>
                <th className="px-5 py-3">Affiliation / Clinic</th>
                <th className="px-5 py-3">License Number</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Rating</th>
                <th className="px-5 py-3 text-right">Consultations</th>
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
              ) : doctors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-400">
                    No doctors found matching criteria.
                  </td>
                </tr>
              ) : (
                doctors.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={d.avatarUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60'}
                          alt={d.name}
                          className="h-8 w-8 rounded-full object-cover border"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{d.name}</p>
                          <p className="text-[11px] text-slate-400">{d.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-slate-900">{d.specialization}</p>
                      <p className="text-[11px] text-slate-500">{d.qualification}</p>
                    </td>

                    <td className="px-5 py-3.5 text-slate-600">{d.clinicHospital}</td>

                    <td className="px-5 py-3.5 font-mono text-[11px] text-slate-700">
                      {d.medicalLicenseNumber}
                    </td>

                    <td className="px-5 py-3.5">
                      {d.verificationStatus === 'Active' ? (
                        <Badge variant="success" size="sm">
                          Verified Active
                        </Badge>
                      ) : (
                        <Badge variant="warning" size="sm">
                          Pending KYC
                        </Badge>
                      )}
                    </td>

                    <td className="px-5 py-3.5">
                      {d.rating > 0 ? (
                        <span className="flex items-center gap-1 font-bold text-slate-800">
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                          {d.rating.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">N/A</span>
                      )}
                    </td>

                    <td className="px-5 py-3.5 text-right font-bold text-slate-900">
                      {d.totalConsultations}
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
