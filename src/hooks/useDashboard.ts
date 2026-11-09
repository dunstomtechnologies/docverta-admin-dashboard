import { useQuery } from '@tanstack/react-query';
import { dashboardRepository } from '../repositories/dashboard.repository';
import { TimeRange } from '../types/common.types';

export function useDashboardData() {
  return useQuery({
    queryKey: ['dashboard', 'data'],
    queryFn: () => dashboardRepository.getDashboardData(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

export function useAppointmentsOverview(timeRange: TimeRange) {
  return useQuery({
    queryKey: ['dashboard', 'overview', timeRange],
    queryFn: () => dashboardRepository.getOverviewTrend(timeRange),
    staleTime: 1000 * 60 * 5,
  });
}
