import { NextResponse } from "next/server";
import { type ProductSortableKey } from "@/services/admin/products/config";
import {
	getPaginationRange,
	parsePaginationParams,
} from "@/services/pagination";
import { fetchAdminProducts } from "@/services/admin/products/server";

// List products with optional search/sort/filter pagination
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const { page, pageSize, sort, order } = parsePaginationParams(searchParams, {
		defaultSort: "created_at",
		defaultOrder: "desc",
	});
	const search = searchParams.get("search")?.trim();
	const category = searchParams.get("category") ?? undefined;
	const locale = searchParams.get("locale") ?? undefined;

	const sortable = new Set<ProductSortableKey>([
		"created_at",
		"price",
		"rating",
		"review_count",
		"name",
		"category",
		"slug",
		"locale",
	]);
	const sortColumn: ProductSortableKey = sortable.has(
		sort as ProductSortableKey,
	)
		? (sort as ProductSortableKey)
		: "created_at";

	const { from, to } = getPaginationRange(page, pageSize);

	const { data, error, count } = await fetchAdminProducts({
		page,
		pageSize,
		sort: sortColumn,
		order,
		search: search ?? undefined,
		category,
		locale,
		from,
		to,
	});

	if (error)
		return NextResponse.json({ error: error.message }, { status: 400 });

	return NextResponse.json({
		items: data ?? [],
		total: count ?? 0,
		page,
		pageSize,
	});
}
