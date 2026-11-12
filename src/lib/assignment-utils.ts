import { AssignmentStatusInfo } from '../types/assignment';
import { SIMULATED_CURRENT_TIME } from '../data/mock-assignments';

/**
 * Tính trạng thái của bài tập dựa trên hạn nộp, thời gian nộp và mốc thời gian tham chiếu
 * Quy tắc:
 * - Đã nộp:
 *    + submittedAt <= dueDate: "Đã nộp", isLate = false
 *    + submittedAt > dueDate:  "Đã nộp", isLate = true, lateLabel = "Nộp trễ"
 * - Chưa nộp:
 *    + referenceTime > dueDate:  "Quá hạn", isLate = false
 *    + referenceTime <= dueDate: "Chưa nộp", isLate = false
 *
 * @param dueDateStr ISO string hạn nộp
 * @param submittedAtStr ISO string thời gian nộp hoặc null
 * @param referenceTimeStr ISO string thời điểm tham chiếu (mặc định: SIMULATED_CURRENT_TIME)
 */
export function calculateAssignmentStatus(
  dueDateStr: string,
  submittedAtStr: string | null,
  referenceTimeStr: string = SIMULATED_CURRENT_TIME
): AssignmentStatusInfo {
  const dueDate = new Date(dueDateStr).getTime();
  const refTime = new Date(referenceTimeStr).getTime();

  if (submittedAtStr) {
    const submittedAt = new Date(submittedAtStr).getTime();
    const isLate = submittedAt > dueDate;

    return {
      code: 'SUBMITTED',
      label: 'Đã nộp',
      isLate,
      lateLabel: isLate ? 'Nộp trễ' : undefined,
    };
  }

  if (refTime > dueDate) {
    return {
      code: 'OVERDUE',
      label: 'Quá hạn',
      isLate: false,
    };
  }

  return {
    code: 'PENDING',
    label: 'Chưa nộp',
    isLate: false,
  };
}

/**
 * Format chuỗi ISO sang dạng hiển thị trực quan theo giờ GMT+7
 * Ví dụ: "2026-11-13T23:59:00+07:00" -> "23:59 - 13/11/2026"
 */
export function formatDateTimeVN(isoString: string | null): string {
  if (!isoString) return '—';

  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: false,
  });

  return formatter.format(date);
}
