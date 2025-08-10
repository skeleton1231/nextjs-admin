import { Tables } from "@/lib/supabase/database.types";
import { formatPrice } from "@/lib/price";

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
	| "image_url"
	| "affiliate_url"
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

export const PRODUCT_FIELD_LABELS = {
	name: "名称",
	slug: "Slug",
	category: "分类",
	sub_category: "子分类",
	price: "价格",
	currency: "币种",
	locale: "语言",
	image_url: "图片URL",
	affiliate_url: "推广链接",
	rating: "评分",
	review_count: "评论数",
	created_at: "创建时间",
} as const;

export const PRODUCT_COLUMNS: ReadonlyArray<{
	key: ProductSortableKey;
	label: string;
}> = [
	{ key: "name", label: PRODUCT_FIELD_LABELS.name },
	{ key: "slug", label: PRODUCT_FIELD_LABELS.slug },
	{ key: "category", label: PRODUCT_FIELD_LABELS.category },
	{ key: "price", label: PRODUCT_FIELD_LABELS.price },
	{ key: "rating", label: PRODUCT_FIELD_LABELS.rating },
	{ key: "review_count", label: PRODUCT_FIELD_LABELS.review_count },
	{ key: "locale", label: PRODUCT_FIELD_LABELS.locale },
	{ key: "created_at", label: PRODUCT_FIELD_LABELS.created_at },
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
		"image_url",
		"affiliate_url",
		"created_at",
	] as const
).join(", ");

export function formatProductCell(
	key: ProductSortableKey,
	row: AdminProduct,
	rawValue: unknown,
): string {
	if (key === "price") return formatPrice(row.price, row.currency);
	if (key === "created_at") {
		const v = typeof rawValue === "string" ? rawValue : undefined;
		return v ? v.slice(0, 19).replace("T", " ") : "-";
	}
	if (key === "review_count") {
		const v = rawValue as number | null | undefined;
		return String(v ?? 0);
	}
	const value = rawValue as unknown;
	if (value == null) return "-";
	return String(value);
}
