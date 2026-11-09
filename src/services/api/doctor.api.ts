import { apiClient } from './api-client';
import { DoctorItem } from '../../types/doctor.types';
import { PaginatedResponse, ApiResponse, PaginationParams } from '../../types/common.types';

export const doctorApi = {
  async getDoctors(params: PaginationParams): Promise<PaginatedResponse<DoctorItem>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<DoctorItem>>>(
      '/admin/doctors',
      { params }
    );
    return response.data.data;
  },

  async verifyDoctor(
    doctorId: string,
    action: 'approve' | 'reject',
    remarks?: string
  ): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post<ApiResponse<{ success: boolean; message: string }>>(
      `/admin/doctors/${doctorId}/verify`,
      { action, remarks }
    );
    return response.data.data;
  },
};
