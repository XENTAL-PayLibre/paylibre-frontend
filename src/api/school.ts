'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getRequest, putRequest } from '@/lib/http';
import { API_ENDPOINTS } from './api-endpoints';
import { displayError } from './auth';
import type { Bank, SchoolInfo, UpdateSettlementPayload } from './types/auth';

// ── useBanks (GET /banks) — payout banks for the settlement picker ───────────
export function useBanks() {
  return useQuery<Bank[]>({
    queryKey: ['banks'],
    queryFn: () => getRequest<Bank[]>({ url: API_ENDPOINTS.BANKS }),
    staleTime: 1000 * 60 * 60, // banks rarely change
  });
}

// ── useUpdateSettlement (PUT /schools/settlement) ────────────────────────────
export function useUpdateSettlement() {
  const qc = useQueryClient();

  return useMutation<SchoolInfo, unknown, UpdateSettlementPayload>({
    mutationKey: ['school', 'settlement'],
    mutationFn: (payload) =>
      putRequest<SchoolInfo, UpdateSettlementPayload>({
        url: API_ENDPOINTS.SCHOOLS.SETTLEMENT,
        payload,
      }),
    onSuccess() {
      toast.success('Payout account saved.');
      qc.invalidateQueries({ queryKey: ['auth', 'me'] });
      qc.invalidateQueries({ queryKey: ['school', 'current'] });
    },
    onError(error) {
      displayError(error, 'Could not save the payout account. Please try again.', {
        400: 'Please check the bank and account number and try again.',
      });
    },
  });
}
