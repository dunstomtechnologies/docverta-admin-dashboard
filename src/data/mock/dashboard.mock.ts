import { DashboardData, AppointmentsOverviewPoint } from '../../types/dashboard.types';
import { MOCK_ACTIVITIES } from './activities.mock';
import { MOCK_APPOINTMENTS } from './appointments.mock';
import { MOCK_PENDING_REQUESTS } from './pendingRequests.mock';

export const MOCK_OVERVIEW_WEEK: AppointmentsOverviewPoint[] = [
  { label: 'Mon', completed: 145, cancelled: 18, total: 163 },
  { label: 'Tue', completed: 182, cancelled: 14, total: 196 },
  { label: 'Wed', completed: 210, cancelled: 22, total: 232 },
  { label: 'Thu', completed: 198, cancelled: 19, total: 217 },
  { label: 'Fri', completed: 245, cancelled: 25, total: 270 },
  { label: 'Sat', completed: 280, cancelled: 32, total: 312 },
  { label: 'Sun', completed: 160, cancelled: 15, total: 175 },
];

export const MOCK_OVERVIEW_MONTH: AppointmentsOverviewPoint[] = [
  { label: 'Week 1', completed: 1120, cancelled: 110, total: 1230 },
  { label: 'Week 2', completed: 1340, cancelled: 145, total: 1485 },
  { label: 'Week 3', completed: 1490, cancelled: 125, total: 1615 },
  { label: 'Week 4', completed: 1650, cancelled: 160, total: 1810 },
];

export const MOCK_OVERVIEW_YEAR: AppointmentsOverviewPoint[] = [
  { label: 'Jan', completed: 3400, cancelled: 310, total: 3710 },
  { label: 'Feb', completed: 3650, cancelled: 290, total: 3940 },
  { label: 'Mar', completed: 4100, cancelled: 340, total: 4440 },
  { label: 'Apr', completed: 3950, cancelled: 320, total: 4270 },
  { label: 'May', completed: 4300, cancelled: 370, total: 4670 },
  { label: 'Jun', completed: 4500, cancelled: 360, total: 4860 },
  { label: 'Jul', completed: 4800, cancelled: 410, total: 5210 },
  { label: 'Aug', completed: 4950, cancelled: 390, total: 5340 },
  { label: 'Sep', completed: 5200, cancelled: 420, total: 5620 },
  { label: 'Oct', completed: 5450, cancelled: 450, total: 5900 },
  { label: 'Nov', completed: 5700, cancelled: 430, total: 6130 },
  { label: 'Dec', completed: 5900, cancelled: 460, total: 6360 },
];

export const MOCK_DASHBOARD_DATA: DashboardData = {
  metrics: {
    totalPatients: {
      title: 'Total Patients',
      value: 18420,
      formattedValue: '18,420',
      growthPercentage: 14.2,
      comparisonText: 'from last month',
      period: 'last month',
      trend: 'up',
    },
    totalDoctors: {
      title: 'Total Doctors',
      value: 1280,
      formattedValue: '1,280',
      growthPercentage: 8.6,
      comparisonText: 'from last month',
      period: 'last month',
      trend: 'up',
    },
    totalAppointments: {
      title: 'Total Appointments',
      value: 42850,
      formattedValue: '42,850',
      growthPercentage: 22.4,
      comparisonText: 'from last month',
      period: 'last month',
      trend: 'up',
    },
    totalRevenue: {
      title: 'Total Revenue',
      value: 4825000,
      formattedValue: '₹48,25,000',
      growthPercentage: 18.7,
      comparisonText: 'from last month',
      period: 'last month',
      trend: 'up',
    },
  },
  overviewChart: {
    timeRange: 'week',
    data: MOCK_OVERVIEW_WEEK,
  },
  statusBreakdown: [
    { status: 'Completed', count: 29138, percentage: 68, color: '#10b981' }, // emerald-500
    { status: 'Upcoming', count: 7713, percentage: 18, color: '#3b82f6' }, // blue-500
    { status: 'Cancelled', count: 3428, percentage: 8, color: '#ef4444' }, // red-500
    { status: 'Rescheduled', count: 2571, percentage: 6, color: '#f59e0b' }, // amber-500
  ],
  recentActivities: MOCK_ACTIVITIES,
  recentAppointments: MOCK_APPOINTMENTS.slice(0, 6),
  pendingRequests: MOCK_PENDING_REQUESTS,
};
