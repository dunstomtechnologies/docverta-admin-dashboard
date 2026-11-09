import { apiClient } from './api-client';
import { PatientItem } from '../../types/patient.types';
import { PaginatedResponse, ApiResponse, PaginationParams } from '../../types/common.types';

export const patientApi = {
  async getPatients(params: PaginationParams): Promise<PaginatedResponse<PatientItem>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<PatientItem>>>(
      '/admin/patients',
      { params }
    );
    return response.data.data;
  },

  async getPatientById(id: string): Promise<PatientItem> {
    const response = await apiClient.get<ApiResponse<PatientItem>>(`/admin/patients/${id}`);
    return response.data.data;
  },
};
