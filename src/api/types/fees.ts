export interface FeeCategory {
  id: string;
  name: string;
}

export interface FeeSummary {
  totalInvoicedKobo: number;
  collectedKobo: number;
  outstandingKobo: number;
  fees: number;
  invoices: number;
}

export interface StudentInvoiceBreakdown {
  id: string;
  studentId: string;
  studentName: string;
  admissionNo?: string;
  classId: string;
  className?: string;
  amountKobo: number;
  amountPaidKobo: number;
  outstandingKobo: number;
  status: 'Paid' | 'Partial' | 'Due' | string;
  dueDateUtc: string;
  dedicatedAccount?: string;
}

export interface FeeDetailsResponse {
  fee: Fee;
  invoices: StudentInvoiceBreakdown[];
}

export interface Fee {
  id: string;
  name: string;
  classId: string;
  className?: string;
  feeCategoryId: string;
  categoryName?: string;
  session: string;
  term: string;
  amountKobo: number;
  dueDateUtc: string;
  invoicedKobo: number;
  collectedKobo: number;
  outstandingKobo: number;
  students: number;
  status: 'Active' | 'Draft' | 'Closed';
  invoices?: StudentInvoiceBreakdown[];
}

export interface CreateFeePayload {
  name: string;
  feeCategoryId: string;
  session: string;
  classId: string;
  term: string;
  amountKobo: number;
  dueDateUtc: string;
}

export interface CreateFeeCategoryPayload {
  name: string;
}
