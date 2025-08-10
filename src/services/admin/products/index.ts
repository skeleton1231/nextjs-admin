import useSWR from "swr";
import { API_ADMIN_PRODUCTS } from "@/services/urls";
import { jsonFetcher } from "@/services/fetcher";
import { Paginated, buildQuery } from "@/services/pagination";
import type { AdminProduct, ProductSortableKey } from "@/services/admin/products/config";

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
  return useSWR<Paginated<AdminProduct>>(key, jsonFetcher, { keepPreviousData: true });
}

export { PRODUCT_FILTERS, PRODUCT_COLUMNS, DEFAULT_PRODUCT_SORT, ADMIN_PRODUCT_SELECT } from "@/services/admin/products/config";

export type { AdminProduct, ProductSortableKey } from "@/services/admin/products/config";


