export type AssignmentStatusCode = 'SUBMITTED' | 'OVERDUE' | 'PENDING';

export interface AssignmentStatusInfo {
  code: AssignmentStatusCode;
  label: 'Đã nộp' | 'Quá hạn' | 'Chưa nộp';
  isLate: boolean;
  lateLabel?: 'Nộp trễ';
}

export interface RawAssignment {
  id: string;
  studentId: string;
  title: string;
  dueDate: string;       // ISO 8601 with timezone (e.g. 2026-11-13T23:59:00+07:00)
  submittedAt: string | null; // ISO 8601 with timezone or null
}

export interface AssignmentViewItem extends RawAssignment {
  statusInfo: AssignmentStatusInfo;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  class: string;
}

