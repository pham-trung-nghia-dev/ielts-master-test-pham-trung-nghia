import React from 'react';
import { StudentProfile } from '@/types/assignment';
import { SIMULATED_CURRENT_TIME } from '@/data/mock-assignments';
import { formatDateTimeVN } from '@/lib/assignment-utils';

interface HeaderProps {
  student: StudentProfile;
}

export const Header: React.FC<HeaderProps> = ({ student }) => {
  return (
    <header className="border-b border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo & Platform Info */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white font-bold text-lg shadow-md shadow-indigo-500/20">
              IM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  IELTS MASTER
                </span>
                <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                  E-LEARNING
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Hệ thống Quản lý Học tập & Bài tập Trực tuyến
              </p>
            </div>
          </div>

          {/* User Session Profile Badge */}
          <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50/70 p-2.5 sm:px-3 sm:py-2 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 font-semibold text-xs text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
              {student.id}
            </div>
            <div className="text-xs">
              <div className="font-semibold text-zinc-800 dark:text-zinc-200">
                {student.name}
              </div>
              <div className="text-zinc-500 dark:text-zinc-400">
                Lớp: <span className="font-medium text-zinc-700 dark:text-zinc-300">{student.class}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Simulated Time Banner */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-blue-50/80 px-3.5 py-2 text-xs text-blue-900 border border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-200 dark:border-blue-900/50">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 dark:text-blue-400 font-semibold">🕒 Thời điểm giả lập:</span>
            <span className="font-mono font-bold">{formatDateTimeVN(SIMULATED_CURRENT_TIME)} (GMT+7)</span>
          </div>
          <span className="text-[11px] text-blue-700/80 dark:text-blue-300/80">
            * Dữ liệu được tính toán chính xác theo mốc tham chiếu cố định của bài đánh giá
          </span>
        </div>
      </div>
    </header>
  );
};

