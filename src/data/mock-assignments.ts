import { RawAssignment, StudentProfile } from '../types/assignment';

export const SIMULATED_CURRENT_TIME = '2026-11-11T09:00:00+07:00';

export const MOCK_STUDENTS: Record<string, StudentProfile> = {
  S01: {
    id: 'S01',
    name: 'Nguyễn Văn A (Học viên S01)',
    email: 'student.s01@ieltsmaster.edu.vn',
    class: 'IELTS Foundation - K26',
  },
  S02: {
    id: 'S02',
    name: 'Trần Thị B (Học viên S02)',
    email: 'student.s02@ieltsmaster.edu.vn',
    class: 'IELTS Foundation - K26',
  },
};

/**
 * Bảng dữ liệu mock từ đề bài (gồm cả S01 và S02)
 */
export const MOCK_ASSIGNMENTS: RawAssignment[] = [
  {
    id: 'A01',
    studentId: 'S01',
    title: 'Foundation U1 – Reading',
    dueDate: '2026-11-13T23:59:00+07:00',
    submittedAt: null,
  },
  {
    id: 'A02',
    studentId: 'S01',
    title: 'Foundation U2 – Listening',
    dueDate: '2026-11-09T23:59:00+07:00',
    submittedAt: null,
  },
  {
    id: 'A03',
    studentId: 'S01',
    title: 'Foundation U3 – Writing',
    dueDate: '2026-11-10T23:59:00+07:00',
    submittedAt: '2026-11-10T20:00:00+07:00',
  },
  {
    id: 'A04',
    studentId: 'S01',
    title: 'Foundation U4 – Speaking',
    dueDate: '2026-11-08T23:59:00+07:00',
    submittedAt: '2026-11-10T12:00:00+07:00',
  },
  {
    id: 'B01',
    studentId: 'S02',
    title: 'Foundation U1 – Reading',
    dueDate: '2026-11-13T23:59:00+07:00',
    submittedAt: null,
  },
];
