import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { API_ENDPOINTS } from './api-endpoints';
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  postFormRequest,
} from '@/lib/http';
import {
  Student,
  VirtualAccount,
  CreateStudentPayload,
  UpdateStudentPayload,
  ImportStudentsResponse,
} from './types/students';

// ── Queries ──────────────────────────────────────────────────────────────────

/** Get all students with optional status/class filters */
export function useStudents(filters?: { classId?: string; status?: string }) {
  const queryParams = new URLSearchParams();
  if (filters?.classId) queryParams.append('classId', filters.classId);
  if (filters?.status) queryParams.append('status', filters.status);

  const queryString = queryParams.toString();
  const url = `${API_ENDPOINTS.STUDENTS.BASE}${queryString ? `?${queryString}` : ''}`;

  return useQuery<Student[], Error>({
    queryKey: ['students', 'list', filters],
    queryFn: () => getRequest<Student[]>({ url }),
  });
}

/** Get a single student's details by ID */
export function useStudent(id: string) {
  return useQuery<Student, Error>({
    queryKey: ['students', 'detail', id],
    queryFn: () => getRequest<Student>({ url: API_ENDPOINTS.STUDENTS.ONE(id) }),
    enabled: !!id,
  });
}

/** Get a student's virtual account NUBAN card details */
export function useStudentVirtualAccount(id: string) {
  return useQuery<VirtualAccount, Error>({
    queryKey: ['students', 'virtual-account', id],
    queryFn: () => getRequest<VirtualAccount>({ url: API_ENDPOINTS.STUDENTS.VIRTUAL_ACCOUNT(id) }),
    enabled: !!id,
  });
}

// ── Mutations ────────────────────────────────────────────────────────────────

/** Create a new student (provisions NUBAN automatically) */
export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation<Student, Error, CreateStudentPayload>({
    mutationFn: (payload) =>
      postRequest<Student, CreateStudentPayload>({
        url: API_ENDPOINTS.STUDENTS.BASE,
        payload,
      }),
    onSuccess: (data) => {
      toast.success(`Student ${data.fullName} created successfully.`);
      queryClient.invalidateQueries({ queryKey: ['students', 'list'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to create student.');
    },
  });
}

/** Update an existing student's details */
export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation<Student, Error, { id: string; payload: UpdateStudentPayload }>({
    mutationFn: ({ id, payload }) =>
      putRequest<Student, UpdateStudentPayload>({
        url: API_ENDPOINTS.STUDENTS.ONE(id),
        payload,
      }),
    onSuccess: (data) => {
      toast.success(`Student ${data.fullName} updated successfully.`);
      queryClient.invalidateQueries({ queryKey: ['students', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['students', 'detail', data.id] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to update student.');
    },
  });
}

/** Delete a student */
export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) =>
      deleteRequest<void>({
        url: API_ENDPOINTS.STUDENTS.ONE(id),
      }),
    onSuccess: () => {
      toast.success('Student deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['students', 'list'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete student.');
    },
  });
}

/** Send student NUBAN account details to their parent/guardian */
export function useSendStudentVirtualAccount() {
  return useMutation<void, Error, string>({
    mutationFn: (id) =>
      postRequest<void, void>({
        url: API_ENDPOINTS.STUDENTS.VIRTUAL_ACCOUNT_SEND(id),
      }),
    onSuccess: () => {
      toast.success('Virtual account details sent to parent.');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to send account details.');
    },
  });
}

/** Bulk-import students via CSV file upload */
export function useImportStudents() {
  const queryClient = useQueryClient();

  return useMutation<ImportStudentsResponse, Error, FormData>({
    mutationFn: (form) =>
      postFormRequest<ImportStudentsResponse>({
        url: API_ENDPOINTS.STUDENTS.IMPORT,
        form,
      }),
    onSuccess: (data) => {
      toast.success(`CSV Import completed: ${data.created} created successfully, ${data.failed} failed.`);
      if (data.errors && data.errors.length > 0) {
        toast.warning(`First error (Row ${data.errors[0].row}): ${data.errors[0].message}`);
      }
      queryClient.invalidateQueries({ queryKey: ['students', 'list'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to import CSV file.');
    },
  });
}
