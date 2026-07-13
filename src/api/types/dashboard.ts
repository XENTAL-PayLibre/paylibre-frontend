export interface RevenueSeriesItem {
  month: string;
  amountKobo: number;
}

export interface RecentPaymentItem {
  studentId: string;
  studentName: string;
  admissionNo: string;
  amountKobo: number;
  occurredAtUtc: string;
}

export interface DashboardOverviewResponse {
  totalStudents: number;
  invoicedKobo: number;
  collectedKobo: number;
  outstandingKobo: number;
  collectionRatePct: number;
  fees: number;
  payments: number;
  paidInvoices: number;
  overdueInvoices: number;
  revenueSeries: RevenueSeriesItem[];
  recent: RecentPaymentItem[];
}
