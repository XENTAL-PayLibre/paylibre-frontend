export interface OutstandingReportItem {
  studentId: string;
  studentName: string;
  admissionNo: string;
  className: string;
  outstandingKobo: number;
}

export interface CollectionsReportItem {
  classId: string;
  className: string;
  invoicedKobo: number;
  collectedKobo: number;
  outstandingKobo: number;
}
