export interface VirtualAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface Student {
  id: string;
  admissionNo: string;
  fullName: string;
  class: string;
  classId?: string;
  nuban?: string;
  bankName?: string;
  hasVirtualAccount?: boolean;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  academicSession?: string;
  status: 'Paid' | 'Partial' | 'Due';
  virtualAccount?: VirtualAccount;
}

export interface CreateStudentPayload {
  admissionNo: string;
  fullName: string;
  classId: string;
  session: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
}

export interface UpdateStudentPayload {
  admissionNo: string;
  fullName: string;
  classId: string;
  session: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
}

export interface ImportStudentsResponse {
  created: number;
  failed: number;
  errors: { row: number; message: string }[];
}
