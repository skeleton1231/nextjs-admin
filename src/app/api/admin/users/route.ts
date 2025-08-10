import { NextResponse } from "next/server";
import {
	getPaginationRange,
	parsePaginationParams,
} from "@/services/pagination";
import { type UserSortableKey } from "@/services/admin/users/config";
import { fetchAdminUsers } from "@/services/admin/users/server";

// List users with optional search/sort/pagination
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const { page, pageSize, sort, order } = parsePaginationParams(searchParams, {
		defaultSort: "created_at",
		defaultOrder: "desc",
	});
	const search = searchParams.get("search")?.trim();
	const sortable = new Set<UserSortableKey>([
		"email",
		"full_name",
		"created_at",
		"country",
	]);
	const sortColumn: UserSortableKey = sortable.has(sort as UserSortableKey)
		? (sort as UserSortableKey)
		: "created_at";

	const { from, to } = getPaginationRange(page, pageSize);

	const { data, error, count } = await fetchAdminUsers({
		page,
		pageSize,
		sort: sortColumn,
		order,
		search: search ?? undefined,
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
