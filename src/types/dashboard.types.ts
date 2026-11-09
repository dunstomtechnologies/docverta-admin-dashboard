import { AppointmentItem } from './appointment.types';

export interface SummaryMetric {
  title: string;
  value: number | string;
  formattedValue: string;
  growthPercentage: number; // e.g. 12.5
  comparisonText: string; // e.g. "from last month"
  period: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface DashboardMetrics {
  totalPatients: SummaryMetric;
  totalDoctors: SummaryMetric;
  totalAppointments: SummaryMetric;
  totalRevenue: SummaryMetric;
}

export interface AppointmentsOverviewPoint {
  label: string; // "Mon", "Tue", etc. or date
  completed: number;
  cancelled: number;
  total: number;
}

export interface AppointmentsStatusBreakdown {
  status: 'Completed' | 'Upcoming' | 'Cancelled' | 'Rescheduled';
  count: number;
  percentage: number;
  color: string;
}

export type ActivityType =
  | 'appointment_booked'
  | 'doctor_registered'
  | 'appointment_completed'
  | 'new_review'
  | 'verification_submitted';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    role?: string;
    avatarUrl?: string;
  };
  metadata?: Record<string, unknown>;
}

export interface PendingRequestItem {
  id: string;
  type: 'doctor_verification' | 'document_review' | 'license_update';
  doctorName: string;
  specialization: string;
  licenseNumber: string;
  submittedAt: string;
  documentsCount: number;
  priority: 'low' | 'medium' | 'high';
  actionUrl: string;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  overviewChart: {
    timeRange: 'week' | 'month' | 'year';
    data: AppointmentsOverviewPoint[];
  };
  statusBreakdown: AppointmentsStatusBreakdown[];
  recentActivities: ActivityItem[];
  recentAppointments: AppointmentItem[];
  pendingRequests: PendingRequestItem[];
}
