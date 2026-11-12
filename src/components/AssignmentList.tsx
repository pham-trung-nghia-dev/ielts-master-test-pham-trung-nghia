import React from 'react';
import { AssignmentViewItem } from '@/types/assignment';
import { AssignmentBadge } from './AssignmentBadge';
import { formatDateTimeVN } from '@/lib/assignment-utils';

interface AssignmentListProps {
  assignments: AssignmentViewItem[];
}

export const AssignmentList: React.FC<AssignmentListProps> = ({ assignments }) => {
  // Thống kê nhanh số lượng
  const stats = {
    total: assignments.length,
    submitted: assignments.filter((a) => a.statusInfo.code === 'SUBMITTED').length,
    overdue: assignments.filter((a) => a.statusInfo.code === 'OVERDUE').length,
    pending: assignments.filter((a) => a.statusInfo.code === 'PENDING').length,
  };

  return (
    <div className="space-y-6">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Tổng số bài tập</div>
          <div className="mt-1 text-2xl font-bold text-zinc-900 dark:text-white">{stats.total}</div>
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 shadow-xs dark:border-emerald-950 dark:bg-emerald-950/20">
          <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Đã nộp</div>
          <div className="mt-1 text-2xl font-bold text-emerald-800 dark:text-emerald-300">{stats.submitted}</div>
        </div>
        <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-4 shadow-xs dark:border-rose-950 dark:bg-rose-950/20">
          <div className="text-xs font-medium text-rose-700 dark:text-rose-400">Quá hạn</div>
          <div className="mt-1 text-2xl font-bold text-rose-800 dark:text-rose-300">{stats.overdue}</div>
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4 shadow-xs dark:border-amber-950 dark:bg-amber-950/20">
          <div className="text-xs font-medium text-amber-700 dark:text-amber-400">Chưa nộp</div>
          <div className="mt-1 text-2xl font-bold text-amber-800 dark:text-amber-300">{stats.pending}</div>
        </div>
      </div>

      {/* Main Content: Table on Desktop, Cards on Mobile */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-4 py-3.5 sm:px-6 dark:border-zinc-800">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">
            Danh sách bài tập cần hoàn thành
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Hiển thị riêng cho học viên hiện tại (không lẫn dữ liệu học viên khác)
          </p>
        </div>

        {assignments.length === 0 ? (
          <div className="py-12 text-center text-sm text-zinc-500">
            Hiện không có bài tập nào được giao.
          </div>
        ) : (
          <>
            {/* Desktop Table View (Hidden on Small screens) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-zinc-200 bg-zinc-50/75 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-400">
                  <tr>
                    <th scope="col" className="py-3.5 pl-6 pr-3">Mã bài</th>
                    <th scope="col" className="px-3 py-3.5">Tên bài tập</th>
                    <th scope="col" className="px-3 py-3.5">Hạn nộp (GMT+7)</th>
                    <th scope="col" className="px-3 py-3.5">Đã nộp lúc (GMT+7)</th>
                    <th scope="col" className="py-3.5 pl-3 pr-6">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                  {assignments.map((item) => (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40"
                    >
                      <td className="py-4 pl-6 pr-3 font-mono font-semibold text-zinc-900 dark:text-zinc-200">
                        {item.id}
                      </td>
                      <td className="px-3 py-4 font-medium text-zinc-900 dark:text-white">
                        {item.title}
                      </td>
                      <td className="px-3 py-4 text-zinc-600 dark:text-zinc-300">
                        {formatDateTimeVN(item.dueDate)}
                      </td>
                      <td className="px-3 py-4 text-zinc-600 dark:text-zinc-300">
                        {formatDateTimeVN(item.submittedAt)}
                      </td>
                      <td className="py-4 pl-3 pr-6">
                        <AssignmentBadge statusInfo={item.statusInfo} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (Visible only on Small screens) */}
            <div className="divide-y divide-zinc-200 sm:hidden dark:divide-zinc-800">
              {assignments.map((item) => (
                <div key={item.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                      {item.id}
                    </span>
                    <AssignmentBadge statusInfo={item.statusInfo} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-zinc-50 p-2.5 rounded-lg dark:bg-zinc-800/40">
                    <div>
                      <span className="text-zinc-500 block">Hạn nộp:</span>
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">
                        {formatDateTimeVN(item.dueDate)}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">Đã nộp:</span>
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">
                        {formatDateTimeVN(item.submittedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

