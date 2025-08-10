"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      onClick={() => router.back()}
    >
      <div
        className="relative w-[90vw] max-w-3xl rounded bg-background p-4 shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute right-2 top-2">
          <button
            type="button"
            className="rounded bg-black/60 px-2 py-1 text-xs text-white"
            onClick={() => router.back()}
          >
            关闭
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}


