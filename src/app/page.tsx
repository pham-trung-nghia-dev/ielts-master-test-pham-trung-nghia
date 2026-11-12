import { getServerSessionStudent, getStudentAssignments } from '@/lib/assignment-service';
import { Header } from '@/components/Header';
import { AssignmentList } from '@/components/AssignmentList';

export default async function AssignmentsPage() {
  // Lấy dữ liệu an toàn từ server-side session
  const student = await getServerSessionStudent();
  const assignments = await getStudentAssignments(student.id);

  return (
    <div className="min-h-screen bg-zinc-50/70 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Header hệ thống & Thông tin phiên đăng nhập */}
      <Header student={student} />

      {/* Main Container */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Page Title */}
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Bài tập của tôi
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Theo dõi tiến độ, thời hạn nộp bài và trạng thái đánh giá các bài tập IELTS.
            </p>
          </div>
        </div>

        {/* Danh sách bài tập */}
        <AssignmentList assignments={assignments} />

        {/* Security & Verification Notice */}
        <footer className="mt-10 rounded-xl border border-zinc-200 bg-white p-5 text-xs text-zinc-500 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          <div className="font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
            🔒 Cơ chế Bảo mật & Kiểm soát Truy cập Dữ liệu:
          </div>
          <p className="leading-relaxed">
            Hệ thống xác định học viên thông qua Server-Side Context/Session (<code className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">{student.id}</code>).
            Mọi truy vấn dữ liệu được lọc độc lập ở tầng backend, tuyệt đối không chấp nhận tham số <code className="font-mono">studentId</code> từ URL client, đảm bảo cách ly dữ liệu giữa các học viên và không làm lộ bài tập của học viên khác.
          </p>
        </footer>
      </main>
    </div>
  );
}
