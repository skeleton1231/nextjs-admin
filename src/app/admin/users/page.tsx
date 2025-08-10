"use client";

import { useMemo, useState } from "react";
import {
  useAdminUsers,
  UserSortableKey,
  USER_COLUMNS,
  type AdminUser,
} from "@/services/admin/users";
import { type ColumnDef, type SortingState } from "@tanstack/react-table";
import { DataTable, PaginationBar } from "@/components/data-table";
import { buildSortingHandler } from "@/components/data-table/buildSortingHandler";
// Table UI is provided by DataTable internally

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<UserSortableKey>("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const query = useMemo(
    () => ({ page, pageSize, search, sort, order }),
    [page, pageSize, search, sort, order]
  );

  const { data, isLoading } = useAdminUsers(query);

  const sorting: SortingState = useMemo(
    () => [{ id: sort, desc: order === "desc" }],
    [sort, order]
  );

  const columns: ColumnDef<AdminUser, unknown>[] = useMemo(() => {
    return USER_COLUMNS.map((c) => ({
      id: c.key,
      accessorKey: c.key as string,
      header: c.label,
      cell: (ctx) => {
        const value = ctx.getValue<unknown>();
        if (c.key === "created_at") {
          const v = ctx.getValue<string | undefined>();
          return v ? v.slice(0, 19).replace("T", " ") : "-";
        }
        return value ?? "-";
      },
      enableSorting: true,
    }));
  }, []);

  const onSortingChange = buildSortingHandler<UserSortableKey>(sorting, {
    onResetPage: () => setPage(1),
    setSortKey: (k) => setSort(k as UserSortableKey),
    setSortOrder: setOrder,
    defaultSortKey: "created_at" as UserSortableKey,
    defaultOrder: "desc",
  });

  return (
    <div className="space-y-4">
      <div className="z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">用户管理</h1>
          <div className="flex items-center gap-2">
            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="搜索邮箱/姓名"
              className="h-9 w-64 rounded-md border px-3 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <DataTable
          data={data?.items ?? []}
          columns={columns}
          sorting={sorting}
          onSortingChange={onSortingChange}
          isLoading={isLoading}
          headerClassName="[top:var(--admin-filters-height)] z-20 bg-background"
        />
      </div>

      <PaginationBar
        page={data?.page ?? page}
        pageSize={data?.pageSize ?? pageSize}
        total={data?.total}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => p + 1)}
      />
    </div>
  );
}


