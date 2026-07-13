'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getRequest, postRequest, deleteRequest } from '@/lib/http';
import { API_ENDPOINTS } from './api-endpoints';
import { displayError } from './auth';
import type { ApiKey, CreateApiKeyPayload, CreatedApiKey } from './types/developers';

export function useApiKeys() {
  return useQuery<ApiKey[]>({
    queryKey: ['api-keys'],
    queryFn: () => getRequest<ApiKey[]>({ url: API_ENDPOINTS.API_KEYS.BASE }),
  });
}

export function useCreateApiKey() {
  const qc = useQueryClient();
  return useMutation<CreatedApiKey, unknown, CreateApiKeyPayload>({
    mutationKey: ['api-keys', 'create'],
    mutationFn: (payload) =>
      postRequest<CreatedApiKey, CreateApiKeyPayload>({ url: API_ENDPOINTS.API_KEYS.BASE, payload }),
    onSuccess() {
      qc.invalidateQueries({ queryKey: ['api-keys'] });
    },
    onError(error) {
      displayError(error, 'Could not create the API key.', {
        400: 'Please provide a name and at least one scope.',
      });
    },
  });
}

export function useRevokeApiKey() {
  const qc = useQueryClient();
  return useMutation<void, unknown, string>({
    mutationKey: ['api-keys', 'revoke'],
    mutationFn: (id) => deleteRequest<void>({ url: API_ENDPOINTS.API_KEYS.ONE(id) }),
    onSuccess() {
      toast.success('API key revoked.');
      qc.invalidateQueries({ queryKey: ['api-keys'] });
    },
    onError(error) {
      displayError(error, 'Could not revoke the API key.');
    },
  });
}
