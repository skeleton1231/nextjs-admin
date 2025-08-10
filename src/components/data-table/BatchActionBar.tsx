"use client";

import * as React from "react";
import type { BatchAction } from "@/types/batch";

type BatchActionBarProps<TId extends string | number> = {
  selectedIds: TId[];
  onClear: () => void;
  actions: BatchAction<TId>[];
  className?: string;
};

export function BatchActionBar<TId extends string | number>(
  props: BatchActionBarProps<TId>,
) {
  const { selectedIds, onClear, actions, className } = props;
  const [busyKey, setBusyKey] = React.useState<string | null>(null);

  if (selectedIds.length === 0) return null;

  const handleAction = async (action: BatchAction<TId>) => {
    if (action.disabled || busyKey) return;
    const { confirm } = action;
    let ok = true;
    if (confirm) {
      ok = window.confirm(
        `${confirm.title ?? "确认执行批量操作"}\n${confirm.content ?? "该操作可能不可撤销"
        }`,
      );
    }
    if (!ok) return;
    try {
      setBusyKey(action.key);
      await action.onAction(selectedIds);
      onClear();
    } finally {
      setBusyKey(null);
    }
  };

  return (
    <div
      className={
        className ??
        "sticky top-[54px] z-30 flex items-center gap-2 rounded-md border bg-background/95 p-2 text-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }
      role="region"
      aria-label="批量操作栏"
    >
      <span>
        已选中 <strong>{selectedIds.length}</strong> 项
      </span>
      <div className="flex items-center gap-2">
        {actions.map((a) => (
          <button
            key={a.key}
            type="button"
            onClick={() => handleAction(a)}
            disabled={!!a.disabled || !!busyKey}
            className="h-8 rounded-md border px-2 disabled:opacity-50"
          >
            {busyKey === a.key ? "处理中..." : a.label}
          </button>
        ))}
        <button
          type="button"
          onClick={onClear}
          className="h-8 rounded-md border px-2"
        >
          取消选择
        </button>
      </div>
    </div>
  );
}


