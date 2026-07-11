// ── Auth payload & response types ──────────────────────────────────────────

export interface RegisterPayload {
  schoolName: string;
  officialEmail: string;
  phone: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  officialEmail: string;
  phone: string;
  status: string;
  settlementConfigured: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * 202 response from POST /auth/login: password accepted, OTP emailed.
 */
export interface LoginChallengeResponse {
  officialEmail: string;
  expiresAtUtc: string;
  otpRequired: boolean;
  message: string;
}

export interface VerifyOtpPayload {
  email: string;
  code: string;
}

/**
 * 200 response from POST /auth/login/verify.
 */
export interface LoginResponse {
  id: string;
  name: string;
  officialEmail: string;
  status: string;
}

export interface SchoolInfo {
  id: string;
  name: string;
  officialEmail: string;
  phone: string;
  status: string;
  settlementBankName: string | null;
  settlementAccountNumber: string | null;
  settlementAccountName: string | null;
  settlementConfigured: boolean;
  joinCode?: string | null;
}

/** GET /api/v1/banks */
export interface Bank {
  name: string;
  code: string;
}

/** PUT /api/v1/schools/settlement */
export interface UpdateSettlementPayload {
  bankName: string;
  bankCode: string;
  accountNumber: string;
}

export interface UserMeResponse {
  userId: string;
  email: string;
  role: string;
  school: SchoolInfo;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}
