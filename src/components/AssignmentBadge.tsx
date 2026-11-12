import React from 'react';
import { AssignmentStatusInfo } from '@/types/assignment';

interface AssignmentBadgeProps {
  statusInfo: AssignmentStatusInfo;
}

export const AssignmentBadge: React.FC<AssignmentBadgeProps> = ({ statusInfo }) => {
  const { code, label, isLate, lateLabel } = statusInfo;

  // Cấu hình style badge cho từng trạng thái
  const getBadgeStyle = () => {
    switch (code) {
      case 'SUBMITTED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
      case 'OVERDUE':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800';
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700';
    }
  };

  const getDotColor = () => {
    switch (code) {
      case 'SUBMITTED':
        return 'bg-emerald-500';
      case 'OVERDUE':
        return 'bg-rose-500';
      case 'PENDING':
        return 'bg-amber-500';
      default:
        return 'bg-zinc-400';
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getBadgeStyle()}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${getDotColor()}`} />
        {label}
      </span>

      {isLate && lateLabel && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-300 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800">
          ⚠️ {lateLabel}
        </span>
      )}
    </div>
  );
};

