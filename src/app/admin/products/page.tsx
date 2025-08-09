"use client";

import { useMemo, useState } from "react";
import { useAdminProducts } from "@/services/admin/products";
import {
  DEFAULT_PRODUCT_SORT,
  PRODUCT_FILTERS,
  PRODUCT_COLUMNS,
  type ProductSortableKey,
  type AdminProduct,
} from "@/services/admin/products/config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<ProductSortableKey>(DEFAULT_PRODUCT_SORT);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [category, setCategory] = useState("");
  const [locale, setLocale] = useState("");

  const query = useMemo(
    () => ({ page, pageSize, search, sort, order, category, locale }),
    [page, pageSize, search, sort, order, category, locale]
  );

  const { data, isLoading } = useAdminProducts(query);

  function renderCell(key: ProductSortableKey, p: AdminProduct) {
    if (key === "price") return `${p.price} ${p.currency}`;
    if (key === "created_at") return p.created_at?.slice(0, 19).replace("T", " ") ?? "-";
    const v = p[key as keyof typeof p];
    return v ?? (key === "review_count" ? 0 : "-");
  }

  function onSort(col: ProductSortableKey) {
    if (sort === col) setOrder(order === "asc" ? "desc" : "asc");
    else {
      setSort(col);
      setOrder("asc");
    }
  }

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h1 className="text-xl font-semibold">产品管理</h1>
          <div className="flex items-center gap-2">
            {PRODUCT_FILTERS.map((f) => (
              <input
                key={f.key}
                value={
                  f.key === "search"
                    ? search
                    : f.key === "category"
                      ? category
                      : locale
                }
                onChange={(e) => {
                  setPage(1);
                  const value = e.target.value;
                  if (f.key === "search") setSearch(value);
                  else if (f.key === "category") setCategory(value);
                  else setLocale(value);
                }}
                placeholder={f.placeholder}
                className={`h-9 ${f.key === "search" ? "w-64" : "w-36"} rounded-md border px-3 text-sm`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table className="table-fixed">
          <TableHeader className="z-20 bg-background">
            <TableRow>
              {PRODUCT_COLUMNS.map((c) => (
                <TableHead
                  key={c.key}
                  className="cursor-pointer select-none"
                  onClick={() => onSort(c.key as ProductSortableKey)}
                >
                  {c.label}
                  {sort === c.key ? (order === "asc" ? " ▲" : " ▼") : null}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={`skeleton-${rowIndex}`}>
                  {PRODUCT_COLUMNS.map((c) => (
                    <TableCell key={c.key} className="px-3 py-2">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : !data?.items?.length ? (
              <TableRow>
                <TableCell colSpan={8} className="px-3 py-6 text-center text-muted-foreground">
                  无数据
                </TableCell>
              </TableRow>
            ) : (
              data.items.map((p) => (
                <TableRow key={p.id}>
                  {PRODUCT_COLUMNS.map((c) => (
                    <TableCell key={c.key} className="px-3 py-2">
                      {renderCell(c.key as ProductSortableKey, p)}
                    </TableCell>
                  ))}
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


