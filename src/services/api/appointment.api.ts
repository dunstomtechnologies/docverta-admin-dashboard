import { apiClient } from './api-client';
import { AppointmentItem, AppointmentFilterParams } from '../../types/appointment.types';
import { PaginatedResponse, ApiResponse } from '../../types/common.types';

export const appointmentApi = {
  async getAppointments(
    params: AppointmentFilterParams
  ): Promise<PaginatedResponse<AppointmentItem>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<AppointmentItem>>>(
      '/admin/appointments',
      { params }
    );
    return response.data.data;
  },

  async getAppointmentById(id: string): Promise<AppointmentItem> {
    const response = await apiClient.get<ApiResponse<AppointmentItem>>(
      `/admin/appointments/${id}`
    );
    return response.data.data;
  },
};
