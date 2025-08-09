import { createAdminClient } from "@/lib/supabase/admin";
import { ADMIN_PRODUCT_SELECT, type ProductSortableKey } from "./config";

export type FetchAdminProductsParams = {
  page: number;
  pageSize: number;
  sort: ProductSortableKey;
  order: "asc" | "desc";
  search?: string;
  category?: string;
  locale?: string;
  from: number;
  to: number;
};

export async function fetchAdminProducts(params: FetchAdminProductsParams) {
  const { sort, order, search, category, locale, from, to } = params;
  const supabase = createAdminClient();

  let query = supabase
    .from("all_products")
    .select(ADMIN_PRODUCT_SELECT, { count: "exact" })
    .order(sort, { ascending: order === "asc" });

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,slug.ilike.%${search}%,category.ilike.%${search}%,sub_category.ilike.%${search}%`
    );
  }

  if (category) query = query.eq("category", category);
  if (locale) query = query.eq("locale", locale);

  const { data, error, count } = await query.range(from, to);
  return { data, error, count } as const;
}


