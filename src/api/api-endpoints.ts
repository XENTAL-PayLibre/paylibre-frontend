// PayLibre API paths (relative to NEXT_PUBLIC_API_URL/api/v1).

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGIN_VERIFY: '/auth/login/verify',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    VERIFY_EMAIL: '/auth/verify-email',
    ME: '/auth/me',
  },
  SCHOOLS: {
    CURRENT: '/schools/current',
    SETTLEMENT: '/schools/settlement',
  },
  API_KEYS: {
    BASE: '/api-keys',
    ONE: (id: string) => `/api-keys/${id}`,
  },
  BANKS: '/banks',
  // Add other resource endpoints here as paylibre evolves, e.g.:
  // STUDENTS: {
  //   BASE: '/students',
  //   ONE: (id: string) => `/students/${id}`,
  // }
} as const;
