import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from './api-endpoints';
import { getRequest } from '@/lib/http';
import { OutstandingReportItem, CollectionsReportItem } from './types/reports';

/** Get students with outstanding balances, largest first */
export function useOutstandingReport() {
  return useQuery<OutstandingReportItem[], Error>({
    queryKey: ['reports', 'outstanding'],
    queryFn: () => getRequest<OutstandingReportItem[]>({ url: API_ENDPOINTS.REPORTS.OUTSTANDING }),
  });
}

/** Get invoiced, collected, and outstanding balances rolled up per class */
export function useCollectionsReport() {
  return useQuery<CollectionsReportItem[], Error>({
    queryKey: ['reports', 'collections'],
    queryFn: () => getRequest<CollectionsReportItem[]>({ url: API_ENDPOINTS.REPORTS.COLLECTIONS }),
  });
}
