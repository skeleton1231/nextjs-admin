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
import { type ColumnDef, type SortingState, type CellContext } from "@tanstack/react-table";
import { DataTable, PaginationBar } from "@/components/data-table";
import { buildSortingHandler } from "@/components/data-table/buildSortingHandler";
import Image from "next/image";
// Table UI is provided by DataTable internally

export default function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<ProductSortableKey>(DEFAULT_PRODUCT_SORT);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [category, setCategory] = useState("");
  const [locale, setLocale] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const query = useMemo(
    () => ({ page, pageSize, search, sort, order, category, locale }),
    [page, pageSize, search, sort, order, category, locale]
  );

  const { data, isLoading } = useAdminProducts(query);

  const sorting: SortingState = useMemo(
    () => [{ id: sort, desc: order === "desc" }],
    [sort, order]
  );

  const columns: ColumnDef<AdminProduct, unknown>[] = useMemo(() => {
    const imageColumn: ColumnDef<AdminProduct, unknown> = {
      id: "image",
      accessorKey: "image_url",
      header: "图片",
      cell: (ctx) => {
        const url = ctx.getValue() as string | null | undefined;
        return url ? (
          <button
            type="button"
            onClick={() => setPreviewUrl(url)}
            className="block h-10 w-10 overflow-hidden rounded focus:outline-none focus:ring-2 focus:ring-ring cursor-zoom-in"
            aria-label="预览图片"
          >
            <Image
              src={url}
              alt="product"
              width={40}
              height={40}
              className="h-10 w-10 object-cover"
            />
          </button>
        ) : (
          <div className="h-10 w-10 rounded bg-muted" />
        );
      },
      enableSorting: false,
    };

    const mapped = PRODUCT_COLUMNS.map((c) => ({
      id: c.key,
      accessorKey: c.key as string,
      header: c.label,
      cell: (ctx: CellContext<AdminProduct, unknown>) => {
        const row = ctx.row.original as AdminProduct;
        if (c.key === "price") return `${row.price} ${row.currency}`;
        if (c.key === "created_at") {
          const v = ctx.getValue() as string | undefined;
          return v ? v.slice(0, 19).replace("T", " ") : "-";
        }
        if (c.key === "name") {
          const href = row.affiliate_url ?? undefined;
          return href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="underline">
              {row.name}
            </a>
          ) : (
            row.name
          );
        }
        const value = ctx.getValue() as unknown;
        if (value == null && c.key === "review_count") return 0;
        return value ?? "-";
      },
      enableSorting: true,
    } satisfies ColumnDef<AdminProduct, unknown>));

    return [imageColumn, ...mapped];
  }, []);

  const onSortingChange = buildSortingHandler<ProductSortableKey>(sorting, {
    onResetPage: () => setPage(1),
    setSortKey: setSort,
    setSortOrder: setOrder,
    defaultSortKey: DEFAULT_PRODUCT_SORT,
    defaultOrder: "desc",
  });

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
        <DataTable
          data={data?.items ?? []}
          columns={columns}
          sorting={sorting}
          onSortingChange={onSortingChange}
          isLoading={isLoading}
        />
      </div>

      <PaginationBar
        page={data?.page ?? page}
        pageSize={data?.pageSize ?? pageSize}
        total={data?.total}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => p + 1)}
      />
      {previewUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setPreviewUrl(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-[80vw] max-w-4xl h-[80vh] max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewUrl(null)}
              className="absolute right-2 top-2 z-10 rounded bg-black/60 px-2 py-1 text-xs text-white"
              aria-label="关闭预览"
            >
              关闭
            </button>
            <div className="absolute inset-0">
              <Image
                src={previewUrl}
                alt="product preview"
                fill
                sizes="80vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


