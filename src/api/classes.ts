import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { API_ENDPOINTS } from './api-endpoints';
import { getRequest, postRequest, putRequest, deleteRequest } from '@/lib/http';
import { ClassRoom, CreateClassPayload, UpdateClassPayload } from './types/classes';

// ── Queries ──────────────────────────────────────────────────────────────────

/** Get all classes for the school */
export function useClasses() {
  return useQuery<ClassRoom[], Error>({
    queryKey: ['classes', 'list'],
    queryFn: () => getRequest<ClassRoom[]>({ url: API_ENDPOINTS.CLASSES.BASE }),
  });
}

/** Get details of a single class by ID */
export function useClassDetails(id: string) {
  return useQuery<ClassRoom, Error>({
    queryKey: ['classes', 'detail', id],
    queryFn: () => getRequest<ClassRoom>({ url: API_ENDPOINTS.CLASSES.ONE(id) }),
    enabled: !!id,
  });
}

// ── Mutations ────────────────────────────────────────────────────────────────

/** Create a new class */
export function useCreateClass() {
  const queryClient = useQueryClient();

  return useMutation<ClassRoom, Error, CreateClassPayload>({
    mutationFn: (payload) =>
      postRequest<ClassRoom, CreateClassPayload>({
        url: API_ENDPOINTS.CLASSES.BASE,
        payload,
      }),
    onSuccess: (data) => {
      toast.success(`Class "${data.name}" created successfully.`);
      queryClient.invalidateQueries({ queryKey: ['classes', 'list'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to create class.');
    },
  });
}

/** Rename or change academic session of a class */
export function useUpdateClass() {
  const queryClient = useQueryClient();

  return useMutation<ClassRoom, Error, { id: string; payload: UpdateClassPayload }>({
    mutationFn: ({ id, payload }) =>
      putRequest<ClassRoom, UpdateClassPayload>({
        url: API_ENDPOINTS.CLASSES.ONE(id),
        payload,
      }),
    onSuccess: (data) => {
      toast.success(`Class "${data.name}" updated successfully.`);
      queryClient.invalidateQueries({ queryKey: ['classes', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['classes', 'detail', data.id] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to update class.');
    },
  });
}

/** Delete a class (only if it has no students assigned) */
export function useDeleteClass() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) =>
      deleteRequest<void>({
        url: API_ENDPOINTS.CLASSES.ONE(id),
      }),
    onSuccess: () => {
      toast.success('Class deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['classes', 'list'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete class.');
    },
  });
}
