"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAdminProduct, useUpdateAdminProduct } from "@/services/admin/products";
import { routeAdminProduct } from "@/services/urls";

export default function AdminProductEditPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { data, isLoading } = useAdminProduct(id);
  const { trigger, isMutating } = useUpdateAdminProduct(id);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    sub_category: "",
    price: "",
    currency: "",
    locale: "",
    image_url: "",
    affiliate_url: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name ?? "",
        slug: data.slug ?? "",
        category: data.category ?? "",
        sub_category: data.sub_category ?? "",
        price: data.price != null ? String(data.price) : "",
        currency: data.currency ?? "",
        locale: data.locale ?? "",
        image_url: data.image_url ?? "",
        affiliate_url: data.affiliate_url ?? "",
      });
    }
  }, [data]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const price = form.price === "" ? undefined : Number(form.price);
    await trigger({
      name: form.name || undefined,
      slug: form.slug || undefined,
      category: form.category || undefined,
      sub_category: form.sub_category || undefined,
      price,
      currency: form.currency || undefined,
      locale: form.locale || undefined,
      image_url: form.image_url || undefined,
      affiliate_url: form.affiliate_url || undefined,
    });
  }

  if (isLoading) return <div className="p-4">加载中...</div>;
  if (!data) return <div className="p-4">未找到该产品</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">编辑产品</h1>
        <Link href={routeAdminProduct(id)} className="rounded border px-3 py-1 text-sm hover:bg-muted">
          返回详情
        </Link>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {(
          [
            ["name", "名称"],
            ["slug", "Slug"],
            ["category", "分类"],
            ["sub_category", "子分类"],
            ["price", "价格"],
            ["currency", "币种"],
            ["locale", "语言"],
            ["image_url", "图片URL"],
            ["affiliate_url", "推广链接"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="space-y-1">
            <div className="text-sm text-muted-foreground">{label}</div>
            <input
              className="h-9 w-full rounded border px-3 text-sm"
              value={(form as any)[key]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            />
          </label>
        ))}

        <div className="md:col-span-2 flex gap-2">
          <button
            type="submit"
            disabled={isMutating}
            className="rounded border px-3 py-1 text-sm hover:bg-muted disabled:opacity-50"
          >
            保存
          </button>
          <Link href={routeAdminProduct(id)} className="rounded border px-3 py-1 text-sm hover:bg-muted">
            取消
          </Link>
        </div>
      </form>
    </div>
  );
}


