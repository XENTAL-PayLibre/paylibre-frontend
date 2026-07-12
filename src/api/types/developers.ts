// ── API-key types (public API / SIS integration) ────────────────────────────

export type ApiScope = 'students:read' | 'students:write' | 'payments:read';

export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  scopes: string; // comma-separated
  active: boolean;
  createdAtUtc: string;
  lastUsedAtUtc: string | null;
  revokedAtUtc: string | null;
}

export interface CreateApiKeyPayload {
  name: string;
  scopes: string[];
}

/** POST /api-keys returns the plaintext key exactly once. */
export interface CreatedApiKey {
  key: ApiKey;
  plaintextKey: string;
}
