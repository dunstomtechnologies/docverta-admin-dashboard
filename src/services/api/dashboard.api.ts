import { apiClient } from './api-client';
import { DashboardData, AppointmentsOverviewPoint } from '../../types/dashboard.types';
import { ApiResponse, TimeRange } from '../../types/common.types';

export const dashboardApi = {
  async getDashboardData(): Promise<DashboardData> {
    const response = await apiClient.get<ApiResponse<DashboardData>>('/admin/dashboard');
    return response.data.data;
  },

  async getOverviewTrend(timeRange: TimeRange): Promise<AppointmentsOverviewPoint[]> {
    const response = await apiClient.get<ApiResponse<AppointmentsOverviewPoint[]>>(
      '/admin/dashboard/overview-trend',
      { params: { range: timeRange } }
    );
    return response.data.data;
  },
};
