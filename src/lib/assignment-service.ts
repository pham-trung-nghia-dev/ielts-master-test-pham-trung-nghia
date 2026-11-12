import { MOCK_ASSIGNMENTS, MOCK_STUDENTS, SIMULATED_CURRENT_TIME } from '../data/mock-assignments';
import { AssignmentViewItem, StudentProfile } from '../types/assignment';
import { calculateAssignmentStatus } from './assignment-utils';

/**
 * Giả lập xác thực người dùng tại server (Mock Server-Side Session / Token Resolver)
 * Tuyệt đối không nhận studentId từ URL Query params hay Client body để tránh IDOR / rò rỉ dữ liệu chéo.
 */
export async function getServerSessionStudent(): Promise<StudentProfile> {
  // Giả lập đọc session từ cookie/JWT tại Server context
  // Trong bài test này, học viên đăng nhập mặc định được xác định an toàn là S01
  const studentId = 'S01';
  const profile = MOCK_STUDENTS[studentId];

  if (!profile) {
    throw new Error('Unauthorized: Student session not found');
  }

  return profile;
}

/**
 * Service lấy danh sách bài tập cho học viên đang đăng nhập.
 * Dữ liệu được cô lập nghiêm ngặt: chỉ query các bài tập có studentId trùng với session server.
 *
 * @param studentId Mã học viên được phân giải từ Server Session (mặc định S01)
 * @param referenceTime Mốc thời gian tham chiếu tính trạng thái
 */
export async function getStudentAssignments(
  studentId: string,
  referenceTime: string = SIMULATED_CURRENT_TIME
): Promise<AssignmentViewItem[]> {
  // 1. Lọc tại tầng dữ liệu theo đúng studentId được cấp quyền
  const studentRecords = MOCK_ASSIGNMENTS.filter(
    (item) => item.studentId === studentId
  );

  // 2. Gán trạng thái tính toán dựa trên mốc thời gian tham chiếu
  const viewItems: AssignmentViewItem[] = studentRecords.map((item) => ({
    ...item,
    statusInfo: calculateAssignmentStatus(item.dueDate, item.submittedAt, referenceTime),
  }));

  return viewItems;
}
