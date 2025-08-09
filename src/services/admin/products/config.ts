import { Tables } from "@/lib/supabase/database.types";

type AllProductsRow = Tables<"all_products">;

export type AdminProduct = Pick<
  AllProductsRow,
  | "id"
  | "name"
  | "slug"
  | "category"
  | "sub_category"
  | "price"
  | "currency"
  | "rating"
  | "review_count"
  | "locale"
  | "created_at"
>;

export type ProductSortableKey = keyof Pick<
  AdminProduct,
  | "name"
  | "slug"
  | "category"
  | "price"
  | "rating"
  | "review_count"
  | "locale"
  | "created_at"
>;

export const DEFAULT_PRODUCT_SORT: ProductSortableKey = "created_at";

export type ProductFilterKey = "search" | "category" | "locale";

export const PRODUCT_FILTERS: ReadonlyArray<{
  key: ProductFilterKey;
  placeholder: string;
}> = [
  { key: "search", placeholder: "搜索名称/分类/Slug" },
  { key: "category", placeholder: "分类" },
  { key: "locale", placeholder: "语言 (如 zh-CN)" },
] as const;

export const PRODUCT_COLUMNS: ReadonlyArray<{
  key: ProductSortableKey;
  label: string;
}> = [
  { key: "name", label: "名称" },
  { key: "slug", label: "Slug" },
  { key: "category", label: "分类" },
  { key: "price", label: "价格" },
  { key: "rating", label: "评分" },
  { key: "review_count", label: "评论数" },
  { key: "locale", label: "语言" },
  { key: "created_at", label: "创建时间" },
] as const;

export const ADMIN_PRODUCT_SELECT = (
  [
    "id",
    "name",
    "slug",
    "category",
    "sub_category",
    "price",
    "currency",
    "rating",
    "review_count",
    "locale",
    "created_at",
  ] as const
).join(", ");


