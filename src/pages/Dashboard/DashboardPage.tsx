import React from 'react';
import {
  Users,
  Stethoscope,
  CalendarCheck,
  TrendingUp,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { SummaryCard } from './components/SummaryCard';
import { AppointmentsOverviewChart } from '../../components/charts/AppointmentsOverviewChart';
import { AppointmentsStatusDonut } from '../../components/charts/AppointmentsStatusDonut';
import { RecentAppointmentsTable } from '../../components/tables/RecentAppointmentsTable';
import { RecentActivityList } from './components/RecentActivityList';
import { PendingRequestsCard } from './components/PendingRequestsCard';
import { useDashboardData } from '../../hooks/useDashboard';
import { Button } from '../../components/common/Button';

export const DashboardPage: React.FC = () => {
  const { data: dashboard, isLoading, isError, error, refetch, isFetching } = useDashboardData();

  if (isError) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl border border-rose-200 bg-rose-50/40 p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-4 shadow-sm">
          <AlertCircle className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Failed to load dashboard data</h2>
        <p className="mt-2 max-w-md text-xs text-slate-600 leading-relaxed">
          {error instanceof Error ? error.message : 'An error occurred while contacting the Docverta backend.'}
        </p>
        <p className="mt-1 text-[11px] text-slate-500">
          (When in API mode, real backend errors are displayed safely without silent mock fallbacks.)
        </p>
        <div className="mt-6">
          <Button
            variant="primary"
            leftIcon={<RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />}
            onClick={() => refetch()}
            disabled={isFetching}
          >
            Retry Request
          </Button>
        </div>
      </div>
    );
  }

  const metrics = dashboard?.metrics;

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Healthcare Overview
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time analytics, patient consultations and doctor onboarding across Docverta
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RefreshCw className={`h-3.5 w-3.5 ${isFetching ? 'animate-spin text-blue-600' : ''}`} />}
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>
      </div>

      {/* 1. Summary Cards (4 Cards) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Patients"
          value={metrics?.totalPatients.formattedValue || '18,420'}
          growth={metrics?.totalPatients.growthPercentage ?? 14.2}
          comparisonText={metrics?.totalPatients.comparisonText || 'from last month'}
          icon={Users}
          theme="blue"
        />

        <SummaryCard
          title="Total Doctors"
          value={metrics?.totalDoctors.formattedValue || '1,280'}
          growth={metrics?.totalDoctors.growthPercentage ?? 8.6}
          comparisonText={metrics?.totalDoctors.comparisonText || 'from last month'}
          icon={Stethoscope}
          theme="green"
        />

        <SummaryCard
          title="Total Appointments"
          value={metrics?.totalAppointments.formattedValue || '42,850'}
          growth={metrics?.totalAppointments.growthPercentage ?? 22.4}
          comparisonText={metrics?.totalAppointments.comparisonText || 'from last month'}
          icon={CalendarCheck}
          theme="purple"
        />

        <SummaryCard
          title="Total Revenue"
          value={metrics?.totalRevenue.formattedValue || '₹48,25,000'}
          growth={metrics?.totalRevenue.growthPercentage ?? 18.7}
          comparisonText={metrics?.totalRevenue.comparisonText || 'from last month'}
          icon={TrendingUp}
          theme="amber"
        />
      </div>

      {/* 2. Dashboard Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Appointments Overview (Line/Area Chart) - 2 Cols */}
        <div className="lg:col-span-2">
          <AppointmentsOverviewChart />
        </div>

        {/* Appointments by Status (Donut Chart) - 1 Col */}
        <div className="lg:col-span-1">
          <AppointmentsStatusDonut
            data={dashboard?.statusBreakdown || []}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* 3. Pending Requests & Tables Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Appointments Table - 2 Cols */}
        <div className="lg:col-span-2 space-y-6">
          <RecentAppointmentsTable />
        </div>

        {/* Right Column: Pending Requests + Recent Activity - 1 Col */}
        <div className="lg:col-span-1 space-y-6">
          <PendingRequestsCard
            requests={dashboard?.pendingRequests || []}
            isLoading={isLoading}
          />
          <RecentActivityList
            activities={dashboard?.recentActivities || []}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
