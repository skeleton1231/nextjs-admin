"use client";

import { useEffect, useMemo, useState } from "react";
import { useAdminProduct, useUpdateAdminProduct } from "@/services/admin/products";
import { PRODUCT_FIELD_LABELS, type AdminProduct } from "@/services/admin/products/config";
import type { AdminProductUpdateInput } from "@/services/admin/products/server";
import { centsFromDisplay, displayFromCents } from "@/lib/price";

type Props = {
	id: string;
	onSuccess?: () => void;
	onCancel?: () => void;
};

const FORM_KEYS = [
	"name",
	"slug",
	"category",
	"sub_category",
	"price",
	"currency",
	"locale",
	"image_url",
	"affiliate_url",
] as const;

type FormKey = (typeof FORM_KEYS)[number];
type FormState = Record<FormKey, string>;

export default function ProductEditForm({ id, onSuccess, onCancel }: Props) {
	const { data, isLoading, mutate } = useAdminProduct(id);
	const { trigger, isMutating } = useUpdateAdminProduct(id);

	const emptyForm = useMemo(
		() =>
			FORM_KEYS.reduce<Record<FormKey, string>>((acc, key) => {
				acc[key] = "";
				return acc;
			}, {} as Record<FormKey, string>),
		[],
	);

	const [form, setForm] = useState<FormState>(emptyForm);

	useEffect(() => {
		if (!data) return;
		setForm(
			FORM_KEYS.reduce<Record<FormKey, string>>((acc, key) => {
				if (key === "price") {
					acc[key] = displayFromCents(data.price);
				} else {
					const v = data[key as keyof AdminProduct];
					acc[key] = typeof v === "string" ? v : "";
				}
				return acc;
			}, { ...emptyForm }),
		);
	}, [data, emptyForm]);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		const payload = FORM_KEYS.reduce<Record<string, unknown>>((acc, key) => {
			const value = form[key];
			if (key === "price") {
				acc[key] = centsFromDisplay(value);
			} else {
				acc[key] = value || undefined;
			}
			return acc;
		}, {});

		await trigger(payload as AdminProductUpdateInput);
		await mutate();
		onSuccess?.();
	}

	if (isLoading) return <div className="p-4">加载中...</div>;
	if (!data) return <div className="p-4">未找到该产品</div>;

	return (
		<form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
			{FORM_KEYS.map((key) => (
				<label key={key} className="space-y-1">
					<div className="text-sm text-muted-foreground">
						{PRODUCT_FIELD_LABELS[key]}
					</div>
					<input
						className="h-9 w-full rounded border px-3 text-sm"
						value={form[key]}
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
				<button
					type="button"
					onClick={onCancel}
					className="rounded border px-3 py-1 text-sm hover:bg-muted"
				>
					取消
				</button>
			</div>
		</form>
	);
}
