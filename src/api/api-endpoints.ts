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
  BANKS: '/banks',
  STUDENTS: {
    BASE: '/students',
    ONE: (id: string) => `/students/${id}`,
    VIRTUAL_ACCOUNT: (id: string) => `/students/${id}/virtual-account`,
    VIRTUAL_ACCOUNT_SEND: (id: string) => `/students/${id}/virtual-account/send`,
    IMPORT: '/students/import',
  },
  FEES: {
    BASE: '/fees',
    SUMMARY: '/fees/summary',
    ONE: (id: string) => `/fees/${id}`,
  },
  FEE_CATEGORIES: {
    BASE: '/fee-categories',
    ONE: (id: string) => `/fee-categories/${id}`,
  },
  CLASSES: {
    BASE: '/classes',
    ONE: (id: string) => `/classes/${id}`,
  },
  PAYMENTS: {
    BASE: '/payments',
  },
  DASHBOARD: {
    OVERVIEW: '/dashboard/overview',
  },
  REPORTS: {
    OUTSTANDING: '/reports/outstanding',
    COLLECTIONS: '/reports/collections',
  },
} as const;
