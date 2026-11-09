import { DashboardData, AppointmentsOverviewPoint } from '../types/dashboard.types';
import { TimeRange } from '../types/common.types';
import { dashboardApi } from '../services/api/dashboard.api';
import {
  MOCK_DASHBOARD_DATA,
  MOCK_OVERVIEW_WEEK,
  MOCK_OVERVIEW_MONTH,
  MOCK_OVERVIEW_YEAR,
} from '../data/mock/dashboard.mock';

const DATA_MODE = import.meta.env.VITE_DATA_MODE || 'mock';

export const dashboardRepository = {
  async getDashboardData(): Promise<DashboardData> {
    if (DATA_MODE === 'api') {
      return await dashboardApi.getDashboardData();
    }

    // Mock Mode: Realistic network delay simulation
    await new Promise((resolve) => setTimeout(resolve, 400));
    return JSON.parse(JSON.stringify(MOCK_DASHBOARD_DATA));
  },

  async getOverviewTrend(timeRange: TimeRange): Promise<AppointmentsOverviewPoint[]> {
    if (DATA_MODE === 'api') {
      return await dashboardApi.getOverviewTrend(timeRange);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    switch (timeRange) {
      case 'month':
        return [...MOCK_OVERVIEW_MONTH];
      case 'year':
        return [...MOCK_OVERVIEW_YEAR];
      case 'week':
      default:
        return [...MOCK_OVERVIEW_WEEK];
    }
  },
};
