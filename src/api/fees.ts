import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { API_ENDPOINTS } from './api-endpoints';
import { getRequest, postRequest, putRequest, deleteRequest } from '@/lib/http';
import {
  Fee,
  FeeCategory,
  FeeSummary,
  CreateFeePayload,
  CreateFeeCategoryPayload,
  FeeDetailsResponse,
} from './types/fees';

// ── Fee Categories Queries & Mutations ──────────────────────────────────────

/** Get all fee categories */
export function useFeeCategories() {
  return useQuery<FeeCategory[], Error>({
    queryKey: ['fees', 'categories', 'list'],
    queryFn: () => getRequest<FeeCategory[]>({ url: API_ENDPOINTS.FEE_CATEGORIES.BASE }),
  });
}

/** Create a new fee category */
export function useCreateFeeCategory() {
  const queryClient = useQueryClient();

  return useMutation<FeeCategory, Error, CreateFeeCategoryPayload>({
    mutationFn: (payload) =>
      postRequest<FeeCategory, CreateFeeCategoryPayload>({
        url: API_ENDPOINTS.FEE_CATEGORIES.BASE,
        payload,
      }),
    onSuccess: (data) => {
      toast.success(`Fee category "${data.name}" created successfully.`);
      queryClient.invalidateQueries({ queryKey: ['fees', 'categories', 'list'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to create fee category.');
    },
  });
}

/** Rename an existing fee category */
export function useUpdateFeeCategory() {
  const queryClient = useQueryClient();

  return useMutation<FeeCategory, Error, { id: string; name: string }>({
    mutationFn: ({ id, name }) =>
      putRequest<FeeCategory, { name: string }>({
        url: API_ENDPOINTS.FEE_CATEGORIES.ONE(id),
        payload: { name },
      }),
    onSuccess: (data) => {
      toast.success(`Fee category renamed to "${data.name}".`);
      queryClient.invalidateQueries({ queryKey: ['fees', 'categories', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['fees', 'list'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to rename fee category.');
    },
  });
}

/** Delete an empty fee category */
export function useDeleteFeeCategory() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) =>
      deleteRequest<void>({
        url: API_ENDPOINTS.FEE_CATEGORIES.ONE(id),
      }),
    onSuccess: () => {
      toast.success('Fee category deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['fees', 'categories', 'list'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete fee category.');
    },
  });
}

// ── Fees Queries & Mutations ────────────────────────────────────────────────

/** Get all fees with optional class/category/status filters */
export function useFees(filters?: { classId?: string; categoryId?: string; status?: string }) {
  const queryParams = new URLSearchParams();
  if (filters?.classId) queryParams.append('classId', filters.classId);
  if (filters?.categoryId) queryParams.append('categoryId', filters.categoryId);
  if (filters?.status) queryParams.append('status', filters.status);

  const queryString = queryParams.toString();
  const url = `${API_ENDPOINTS.FEES.BASE}${queryString ? `?${queryString}` : ''}`;

  return useQuery<Fee[], Error>({
    queryKey: ['fees', 'list', filters],
    queryFn: () => getRequest<Fee[]>({ url }),
  });
}

/** Get headline summary metrics across all fees */
export function useFeeSummary() {
  return useQuery<FeeSummary, Error>({
    queryKey: ['fees', 'summary'],
    queryFn: () => getRequest<FeeSummary>({ url: API_ENDPOINTS.FEES.SUMMARY }),
  });
}

/** Get full details of a specific fee, including student invoices breakdown */
export function useFeeDetails(id: string) {
  return useQuery<FeeDetailsResponse, Error>({
    queryKey: ['fees', 'detail', id],
    queryFn: () => getRequest<FeeDetailsResponse>({ url: API_ENDPOINTS.FEES.ONE(id) }),
    enabled: !!id,
  });
}

/** Create a new fee (fans out invoices to the class's active students) */
export function useCreateFee() {
  const queryClient = useQueryClient();

  return useMutation<Fee, Error, CreateFeePayload>({
    mutationFn: (payload) =>
      postRequest<Fee, CreateFeePayload>({
        url: API_ENDPOINTS.FEES.BASE,
        payload,
      }),
    onSuccess: (data) => {
      toast.success(`Fee "${data.name}" created and invoices dispatched.`);
      queryClient.invalidateQueries({ queryKey: ['fees', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['fees', 'summary'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to create fee.');
    },
  });
}

/** Delete a fee and its invoices */
export function useDeleteFee() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) =>
      deleteRequest<void>({
        url: API_ENDPOINTS.FEES.ONE(id),
      }),
    onSuccess: () => {
      toast.success('Fee and invoices deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['fees', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['fees', 'summary'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete fee.');
    },
  });
}
