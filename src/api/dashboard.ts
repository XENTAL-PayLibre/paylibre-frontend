import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from './api-endpoints';
import { getRequest } from '@/lib/http';
import { DashboardOverviewResponse } from './types/dashboard';

/** Get dashboard overview metrics, revenue series, and recent payments */
export function useDashboardOverview() {
  return useQuery<DashboardOverviewResponse, Error>({
    queryKey: ['dashboard', 'overview'],
    queryFn: () => getRequest<DashboardOverviewResponse>({ url: API_ENDPOINTS.DASHBOARD.OVERVIEW }),
  });
}
