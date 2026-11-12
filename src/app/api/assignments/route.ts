import { NextResponse } from 'next/server';
import { getServerSessionStudent, getStudentAssignments } from '@/lib/assignment-service';

/**
 * GET /api/assignments
 * API trả về danh sách bài tập của học viên đang đăng nhập.
 *
 * Lưu ý bảo mật:
 * - KHÔNG nhận studentId từ searchParams / query string (tránh Insecure Direct Object References - IDOR).
 * - Danh tính học viên được phân giải an toàn từ Server Session (giả lập S01).
 */
export async function GET() {
  try {
    const currentStudent = await getServerSessionStudent();
    const assignments = await getStudentAssignments(currentStudent.id);

    return NextResponse.json({
      success: true,
      student: currentStudent,
      assignments,
      total: assignments.length,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

