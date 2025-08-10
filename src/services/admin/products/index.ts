import useSWR from "swr";
import { API_ADMIN_PRODUCTS, apiAdminProduct } from "@/services/urls";
import { jsonFetcher } from "@/services/fetcher";
import { Paginated, buildQuery } from "@/services/pagination";
import type {
	AdminProduct,
	ProductSortableKey,
} from "@/services/admin/products/config";
import useSWRMutation from "swr/mutation";
import type { AdminProductUpdateInput } from "@/services/admin/products/server";

export type ProductQuery = {
	page?: number;
	pageSize?: number;
	search?: string;
	sort?: ProductSortableKey;
	order?: "asc" | "desc";
	category?: string;
	locale?: string;
};

export function useAdminProducts(query: ProductQuery) {
	const key = `${API_ADMIN_PRODUCTS}${buildQuery(query as Record<string, unknown>)}`;
	return useSWR<Paginated<AdminProduct>>(key, jsonFetcher, {
		keepPreviousData: true,
	});
}

export function useAdminProduct(id?: string) {
	const key = id ? apiAdminProduct(id) : null;
	return useSWR<AdminProduct>(key, jsonFetcher);
}

async function patcher(url: string, { arg }: { arg: AdminProductUpdateInput }) {
	const res = await fetch(url, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(arg),
	});
	if (!res.ok) throw new Error("Failed to update product");
	return res.json();
}

export function useUpdateAdminProduct(id?: string) {
	const key = id ? apiAdminProduct(id) : "";
	return useSWRMutation<AdminProduct, Error, string, AdminProductUpdateInput>(
		key,
		patcher,
	);
}

export {
	PRODUCT_FILTERS,
	PRODUCT_COLUMNS,
	DEFAULT_PRODUCT_SORT,
	ADMIN_PRODUCT_SELECT,
} from "@/services/admin/products/config";

export type {
	AdminProduct,
	ProductSortableKey,
} from "@/services/admin/products/config";
