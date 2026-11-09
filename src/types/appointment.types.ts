export type AppointmentStatus = 'Completed' | 'Upcoming' | 'Cancelled' | 'Rescheduled';

export interface AppointmentItem {
  id: string; // e.g., "APT-8042"
  patient: {
    id: string;
    name: string;
    avatarUrl?: string;
    phone?: string;
  };
  doctor: {
    id: string;
    name: string;
    specialization: string;
    avatarUrl?: string;
  };
  dateTime: string; // ISO string e.g., "2026-11-09T10:30:00Z"
  type: 'Online Video' | 'In-Clinic' | 'Follow-up';
  status: AppointmentStatus;
  amount: number;
}

export interface AppointmentFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: AppointmentStatus | 'All';
  startDate?: string;
  endDate?: string;
}
