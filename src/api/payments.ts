import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from './api-endpoints';
import { getRequest } from '@/lib/http';
import { Payment } from './types/payments';

/** List received payments, most recent first. Optionally filter by student */
export function usePayments(params?: { studentId?: string; take?: number }) {
  const queryParams = new URLSearchParams();
  if (params?.studentId) queryParams.append('studentId', params.studentId);
  if (params?.take) queryParams.append('take', params.take.toString());

  const url = `${API_ENDPOINTS.PAYMENTS.BASE}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  return useQuery<Payment[], Error>({
    queryKey: ['payments', 'list', params],
    queryFn: () => getRequest<Payment[]>({ url }),
  });
}
