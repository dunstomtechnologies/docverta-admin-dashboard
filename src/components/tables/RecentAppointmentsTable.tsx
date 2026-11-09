import React, { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  Calendar,
  Video,
  Building2,
  Receipt,
  User,
  Stethoscope,
} from 'lucide-react';
import { AppointmentItem, AppointmentStatus } from '../../types/appointment.types';
import { Badge, BadgeVariant } from '../common/Badge';
import { Modal } from '../common/Modal';
import { Pagination } from './Pagination';
import { formatDateTime, formatCurrency } from '../../utils/formatters';
import { useAppointments } from '../../hooks/useAppointments';
import { Skeleton } from '../common/Skeleton';

export const RecentAppointmentsTable: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentItem | null>(null);

  const { data: response, isLoading } = useAppointments({
    page: currentPage,
    limit: 5,
    search: search.trim() ? search : undefined,
    status: statusFilter,
  });

  const getStatusBadge = (status: AppointmentStatus) => {
    const config: Record<AppointmentStatus, { variant: BadgeVariant; label: string }> = {
      Completed: { variant: 'success', label: 'Completed' },
      Upcoming: { variant: 'info', label: 'Upcoming' },
      Cancelled: { variant: 'danger', label: 'Cancelled' },
      Rescheduled: { variant: 'warning', label: 'Rescheduled' },
    };

    const c = config[status] || { variant: 'neutral', label: status };
    return <Badge variant={c.variant} size="sm">{c.label}</Badge>;
  };

  const appointments = response?.data || [];
  const pagination = response?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 5,
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
      {/* Table Header: Title + Search & Status Filter */}
      <div className="flex flex-col gap-3 p-5 border-b border-slate-100 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Recent Appointments
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time appointment schedule, booking channels and patient check-ins
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search patient, doctor, ID..."
              className="h-8.5 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as AppointmentStatus | 'All');
                setCurrentPage(1);
              }}
              className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Rescheduled">Rescheduled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3">Appointment ID</th>
              <th className="px-5 py-3">Patient</th>
              <th className="px-5 py-3">Doctor</th>
              <th className="px-5 py-3">Date & Time</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={6} className="px-5 py-3.5">
                    <Skeleton className="h-6 w-full" />
                  </td>
                </tr>
              ))
            ) : appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-slate-400">
                  No appointments found matching your search and filter criteria.
                </td>
              </tr>
            ) : (
              appointments.map((apt) => (
                <tr
                  key={apt.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* Appointment ID */}
                  <td className="px-5 py-3.5">
                    <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100/80">
                      {apt.id}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-1">
                      {apt.type}
                    </span>
                  </td>

                  {/* Patient */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={apt.patient.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60'}
                        alt={apt.patient.name}
                        className="h-8 w-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{apt.patient.name}</p>
                        <p className="text-[11px] text-slate-400">{apt.patient.phone}</p>
                      </div>
                    </div>
                  </td>

                  {/* Doctor */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={apt.doctor.avatarUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60'}
                        alt={apt.doctor.name}
                        className="h-8 w-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{apt.doctor.name}</p>
                        <p className="text-[11px] text-slate-500 font-normal">
                          {apt.doctor.specialization}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td className="px-5 py-3.5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">
                        {formatDateTime(apt.dateTime)}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Fee: {formatCurrency(apt.amount)}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3.5">
                    {getStatusBadge(apt.status)}
                  </td>

                  {/* Action */}
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => setSelectedAppointment(apt)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalCount={pagination.totalCount}
        limit={pagination.limit}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Consultation Details Modal */}
      {selectedAppointment && (
        <Modal
          isOpen={!!selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          title={`Appointment Details • ${selectedAppointment.id}`}
          description="Clinical consultation booking overview and administrative audit metadata"
          size="md"
        >
          <div className="space-y-4 text-xs">
            {/* Status & ID Banner */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-200">
              <div>
                <span className="text-[11px] text-slate-500">Booking Reference</span>
                <p className="text-base font-extrabold text-blue-600">{selectedAppointment.id}</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 block mb-1">Status</span>
                {getStatusBadge(selectedAppointment.status)}
              </div>
            </div>

            {/* Patient & Doctor Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Patient Card */}
              <div className="rounded-xl border border-slate-200 p-3.5">
                <div className="flex items-center gap-2 mb-2 text-slate-500 font-semibold">
                  <User className="h-4 w-4 text-blue-600" />
                  <span>Patient Profile</span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={selectedAppointment.patient.avatarUrl}
                    alt={selectedAppointment.patient.name}
                    className="h-10 w-10 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-bold text-slate-900">{selectedAppointment.patient.name}</p>
                    <p className="text-slate-500">{selectedAppointment.patient.phone}</p>
                    <span className="text-[10px] text-emerald-600 font-medium">Verified Identity</span>
                  </div>
                </div>
              </div>

              {/* Doctor Card */}
              <div className="rounded-xl border border-slate-200 p-3.5">
                <div className="flex items-center gap-2 mb-2 text-slate-500 font-semibold">
                  <Stethoscope className="h-4 w-4 text-purple-600" />
                  <span>Consulting Physician</span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={selectedAppointment.doctor.avatarUrl}
                    alt={selectedAppointment.doctor.name}
                    className="h-10 w-10 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-bold text-slate-900">{selectedAppointment.doctor.name}</p>
                    <p className="text-slate-500">{selectedAppointment.doctor.specialization}</p>
                    <span className="text-[10px] text-blue-600 font-medium">Licensed Specialist</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Metadata */}
            <div className="rounded-xl border border-slate-200 p-3.5 space-y-2 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" /> Date & Time
                </span>
                <span className="font-semibold text-slate-800">
                  {formatDateTime(selectedAppointment.dateTime)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500">
                  {selectedAppointment.type === 'Online Video' ? (
                    <Video className="h-3.5 w-3.5 text-slate-400" />
                  ) : (
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                  )}
                  Consultation Channel
                </span>
                <span className="font-semibold text-slate-800">{selectedAppointment.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Receipt className="h-3.5 w-3.5 text-slate-400" /> Consultation Fee
                </span>
                <span className="font-bold text-slate-900 text-sm">
                  {formatCurrency(selectedAppointment.amount)}
                </span>
              </div>
            </div>

            {/* HIPAA Compliance Note */}
            <p className="text-[10px] text-slate-400 italic">
              Protected healthcare consultation record. Administrative audit log created for this lookup.
            </p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="rounded-lg bg-slate-100 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
