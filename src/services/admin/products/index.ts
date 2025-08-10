import useSWR from "swr";
import { useSWRConfig } from "swr";
import { API_ADMIN_PRODUCTS, apiAdminProduct } from "@/services/urls";
import { jsonFetcher } from "@/services/fetcher";
import { buildQuery, Paginated } from "@/services/pagination";
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
	const key = `${API_ADMIN_PRODUCTS}${
		buildQuery(query as Record<string, unknown>)
	}`;
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
	ADMIN_PRODUCT_SELECT,
	DEFAULT_PRODUCT_SORT,
	PRODUCT_COLUMNS,
	PRODUCT_FILTERS,
} from "@/services/admin/products/config";

export type {
	AdminProduct,
	ProductSortableKey,
} from "@/services/admin/products/config";

// Update a single product row inside all cached product list responses without full refetch
export function useUpdateProductInAllProductLists() {
	const { mutate, cache } = useSWRConfig();
	return async function updateProductRowInLists(updated: AdminProduct) {
		const keys: string[] = [];
		// Iterate all SWR cache keys and find product LIST endpoints (exclude detail like /:id)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const cacheAny: any = cache as any;
		const iter: Iterable<unknown> = cacheAny?.keys?.() ?? [];
		for (const key of iter) {
			if (typeof key !== "string") continue;
			if (!key.startsWith(API_ADMIN_PRODUCTS)) continue;
			const suffix = key.slice(API_ADMIN_PRODUCTS.length);
			// list keys are either exactly the prefix or have a query string starting with '?'
			const isListKey = suffix === "" || suffix.startsWith("?");
			if (isListKey) keys.push(key);
		}

		await Promise.all(
			keys.map((key) =>
				mutate<import("@/services/pagination").Paginated<AdminProduct>>(
					key,
					(previous) => {
						if (!previous) return previous;
						const items = (previous as { items?: AdminProduct[] }).items;
						if (!Array.isArray(items)) return previous;
						const index = items.findIndex(
							(p) => String(p.id) === String(updated.id),
						);
						if (index === -1) return previous;
						const newItems = items.slice();
						newItems[index] = { ...newItems[index], ...updated };
						return {
							...(previous as object),
							items: newItems,
						} as typeof previous;
					},
					{ revalidate: false },
				)
			),
		);
	};
}
