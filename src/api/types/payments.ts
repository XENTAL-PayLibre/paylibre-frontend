export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  admissionNo: string;
  amountKobo: number;
  netCreditKobo: number;
  payerName: string;
  occurredAtUtc: string;
}
