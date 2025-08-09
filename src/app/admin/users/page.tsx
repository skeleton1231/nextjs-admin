"use client";

import { useMemo, useState } from "react";
import { useAdminUsers, UserSortableKey } from "@/services/admin/users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  function onSort(col: UserSortableKey) {
    if (sort === col) setOrder(order === "asc" ? "desc" : "asc");
    else {
      setSort(col);
      setOrder("asc");
    }
  }

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3">
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
        <Table className="table-fixed">
          <TableHeader className="sticky [top:var(--admin-filters-height)] z-20 bg-background">
            <TableRow>
              {[
                { key: "email", label: "邮箱" },
                { key: "full_name", label: "姓名" },
                { key: "country", label: "国家" },
                { key: "created_at", label: "创建时间" },
              ].map((c) => (
                <TableHead
                  key={c.key}
                  className="cursor-pointer select-none"
                  onClick={() => onSort(c.key as UserSortableKey)}
                >
                  {c.label}
                  {sort === c.key ? (order === "asc" ? " ▲" : " ▼") : null}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="px-3 py-3">
                  加载中…
                </TableCell>
              </TableRow>
            ) : !data?.items?.length ? (
              <TableRow>
                <TableCell colSpan={4} className="px-3 py-6 text-center text-muted-foreground">
                  无数据
                </TableCell>
              </TableRow>
            ) : (
              data.items.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="px-3 py-2">{u.email}</TableCell>
                  <TableCell className="px-3 py-2">{u.full_name}</TableCell>
                  <TableCell className="px-3 py-2">{u.country}</TableCell>
                  <TableCell className="px-3 py-2">{u.created_at?.slice(0, 19).replace("T", " ")}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          className="h-9 rounded-md border px-3 text-sm disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          上一页
        </button>
        <span className="text-sm">
          第 {data?.page ?? page} 页 / 共 {Math.ceil((data?.total ?? 0) / (data?.pageSize ?? pageSize))} 页
        </span>
        <button
          className="h-9 rounded-md border px-3 text-sm disabled:opacity-50"
          disabled={!!data && (data.page * data.pageSize >= data.total)}
          onClick={() => setPage((p) => p + 1)}
        >
          下一页
        </button>
      </div>
    </div>
  );
}


