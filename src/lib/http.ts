import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { getApiBaseUrl } from '@/lib/api-base-url';
import { invalidateAccessTokenCache, logoutUser } from './get-token';

// ── Types ──────────────────────────────────────────────────────────────────
export type ErrorData = {
  message: string;
};

type RetryableConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

// ── Singleton & shared refresh promise ────────────────────────────────────
let apiInstance: AxiosInstance | null = null;
let refreshPromise: Promise<void> | null = null;

/** Call after login so a prior failed refresh doesn't block the new session. */
export function resetAuthRefreshState() {
  refreshPromise = null;
  invalidateAccessTokenCache();
}

// ── Helpers ────────────────────────────────────────────────────────────────
function isAuthEndpoint(url: string) {
  const exact = url.split('?')[0];
  return (
    exact === API_ENDPOINTS.AUTH.LOGIN ||
    exact === API_ENDPOINTS.AUTH.LOGIN_VERIFY ||
    exact === API_ENDPOINTS.AUTH.REGISTER ||
    exact === API_ENDPOINTS.AUTH.REFRESH
  );
}

// ── Coalesced refresh (cookie session) ─────────────────────────────────────
function coalescedRefresh(): Promise<void> {
  refreshPromise ??= getApi()
    .post(API_ENDPOINTS.AUTH.REFRESH, {})
    .then(() => undefined)
    .finally(() => {
      refreshPromise = null;
    });
  return refreshPromise;
}

// ── 401 handler ────────────────────────────────────────────────────────────
async function handleUnauthorized(
  error: AxiosError,
  originalRequest: RetryableConfig,
): Promise<unknown> {
  originalRequest._retry = true;
  invalidateAccessTokenCache();

  try {
    await (refreshPromise ?? coalescedRefresh());
    return getApi()(originalRequest);
  } catch {
    logoutUser();
    return Promise.reject(error);
  }
}

// ── Axios singleton factory ────────────────────────────────────────────────
function getApi(): AxiosInstance {
  if (apiInstance) return apiInstance;

  apiInstance = axios.create({
    baseURL: getApiBaseUrl(),
    withCredentials: true,
  });

  apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const originalRequest = error.config as RetryableConfig | undefined;
      const url = String(originalRequest?.url ?? '');

      if (
        status !== 401 ||
        !originalRequest ||
        originalRequest._retry ||
        isAuthEndpoint(url)
      ) {
        return Promise.reject(error);
      }

      return handleUnauthorized(error, originalRequest);
    },
  );

  return apiInstance;
}

// ── Request helpers ────────────────────────────────────────────────────────
export const getRequest = async <T>(params: { url: string; signal?: AbortSignal; headers?: Record<string, string> }) => {
  const { data } = await getApi().get<T>(params.url, { signal: params.signal, headers: params.headers });
  return data;
};

export const postRequest = async <T, P = void>(params: {
  url: string;
  payload?: P;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}) => {
  const { data } = await getApi().post<T>(params.url, params.payload, { signal: params.signal, headers: params.headers });
  return data;
};

export const patchRequest = async <T, P = void>(params: { url: string; payload?: P }) => {
  const { data } = await getApi().patch<T>(params.url, params.payload);
  return data;
};

/** Multipart POST. Let the browser/axios set the Content-Type boundary automatically. */
export const postFormRequest = async <T>(params: { url: string; form: FormData }) => {
  const { data } = await getApi().post<T>(params.url, params.form);
  return data;
};

export const putRequest = async <T, P = void>(params: { url: string; payload?: P }) => {
  const { data } = await getApi().put<T>(params.url, params.payload);
  return data;
};

export const deleteRequest = async <T>(params: { url: string }) => {
  const { data } = await getApi().delete<T>(params.url);
  return data;
};
