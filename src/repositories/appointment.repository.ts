import { AppointmentItem, AppointmentFilterParams } from '../types/appointment.types';
import { PaginatedResponse } from '../types/common.types';
import { appointmentApi } from '../services/api/appointment.api';
import { MOCK_APPOINTMENTS } from '../data/mock/appointments.mock';

const DATA_MODE = import.meta.env.VITE_DATA_MODE || 'mock';

export const appointmentRepository = {
  async getAppointments(
    params: AppointmentFilterParams
  ): Promise<PaginatedResponse<AppointmentItem>> {
    if (DATA_MODE === 'api') {
      return await appointmentApi.getAppointments(params);
    }

    // Mock Mode with search, status filtering, and pagination
    await new Promise((resolve) => setTimeout(resolve, 350));

    let filtered = [...MOCK_APPOINTMENTS];

    // Status filter
    if (params.status && params.status !== 'All') {
      filtered = filtered.filter((apt) => apt.status === params.status);
    }

    // Search filter (patient name, doctor name, appointment id)
    if (params.search && params.search.trim() !== '') {
      const q = params.search.toLowerCase().trim();
      filtered = filtered.filter(
        (apt) =>
          apt.id.toLowerCase().includes(q) ||
          apt.patient.name.toLowerCase().includes(q) ||
          apt.doctor.name.toLowerCase().includes(q) ||
          apt.doctor.specialization.toLowerCase().includes(q)
      );
    }

    const page = params.page || 1;
    const limit = params.limit || 5;
    const totalCount = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    const startIndex = (page - 1) * limit;
    const data = filtered.slice(startIndex, startIndex + limit);

    return {
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  },

  async getAppointmentById(id: string): Promise<AppointmentItem> {
    if (DATA_MODE === 'api') {
      return await appointmentApi.getAppointmentById(id);
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
    const found = MOCK_APPOINTMENTS.find((apt) => apt.id === id);
    if (!found) {
      throw new Error(`Appointment with ID ${id} not found.`);
    }
    return found;
  },
};
