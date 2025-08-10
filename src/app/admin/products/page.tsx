"use client";

import { useMemo, useState } from "react";
import { useAdminProducts, useAdminProduct } from "@/services/admin/products";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductDetailInfo from "@/app/admin/products/_components/ProductDetailInfo";
import ProductEditForm from "@/app/admin/products/_components/ProductEditForm";

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
  const [detailId, setDetailId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  const query = useMemo(
    () => ({ page, pageSize, search, sort, order, category, locale }),
    [page, pageSize, search, sort, order, category, locale]
  );

  const { data, isLoading } = useAdminProducts(query);

  const sorting: SortingState = useMemo(
    () => [{ id: sort, desc: order === "desc" }],
    [sort, order]
  );

  // Local edit modal disabled; use intercepting routes instead

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
          return row.name;
        }
        const value = ctx.getValue() as unknown;
        if (value == null && c.key === "review_count") return 0;
        return value ?? "-";
      },
      enableSorting: true,
    } satisfies ColumnDef<AdminProduct, unknown>));

    const actionColumn: ColumnDef<AdminProduct, unknown> = {
      id: "actions",
      header: "操作",
      cell: (ctx) => {
        const row = ctx.row.original as AdminProduct;
        return (
          <div className="flex gap-2">
            <button type="button" className="text-blue-600 hover:underline" onClick={() => setDetailId(String(row.id))}>
              详情
            </button>
            <button type="button" className="text-blue-600 hover:underline" onClick={() => setEditId(String(row.id))}>
              编辑
            </button>
            {row.affiliate_url && (
              <a href={row.affiliate_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                外链
              </a>
            )}
          </div>
        );
      },
      enableSorting: false,
    };

    return [imageColumn, ...mapped, actionColumn];
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
      {/* 图片预览 */}
      <Dialog open={!!previewUrl} onOpenChange={(open) => (!open ? setPreviewUrl(null) : null)}>
        <DialogContent className="w-[80vw] max-w-4xl h-[80vh]">
          {previewUrl && (
            <div className="absolute inset-0">
              <Image src={previewUrl} alt="product preview" fill sizes="80vw" className="object-contain" priority />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 详情弹窗 */}
      <Dialog open={!!detailId} onOpenChange={(open) => (!open ? setDetailId(null) : null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>产品详情</DialogTitle>
          </DialogHeader>
          {detailId && <DetailDialogBody id={detailId} />}
        </DialogContent>
      </Dialog>

      {/* 编辑弹窗 */}
      <Dialog open={!!editId} onOpenChange={(open) => (!open ? setEditId(null) : null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑产品</DialogTitle>
          </DialogHeader>
          {editId && (
            <ProductEditForm
              id={editId}
              onSuccess={() => setEditId(null)}
              onCancel={() => setEditId(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}


function DetailDialogBody({ id }: { id: string }) {
  const { data, isLoading } = useAdminProduct(id);
  if (isLoading) return <div className="p-2 text-sm text-muted-foreground">加载中...</div>;
  if (!data) return <div className="p-2 text-sm text-muted-foreground">未找到该产品</div>;
  return <ProductDetailInfo product={data} />;
}


