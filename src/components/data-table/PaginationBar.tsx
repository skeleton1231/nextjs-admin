"use client";

type Props = {
  page: number;
  pageSize: number;
  total?: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
};

export function PaginationBar({ page, pageSize, total, onPrev, onNext, className }: Props) {
  const totalPages = total && total > 0 ? Math.ceil(total / pageSize) : 1;
  const disablePrev = page <= 1;
  const disableNext = !!total && page * pageSize >= total;

  return (
    <div className={className ?? "flex items-center justify-end gap-2"}>
      <button
        className="h-9 rounded-md border px-3 text-sm disabled:opacity-50"
        disabled={disablePrev}
        onClick={onPrev}
      >
        上一页
      </button>
      <span className="text-sm">第 {page} 页 / 共 {totalPages} 页</span>
      <button
        className="h-9 rounded-md border px-3 text-sm disabled:opacity-50"
        disabled={disableNext}
        onClick={onNext}
      >
        下一页
      </button>
    </div>
  );
}


