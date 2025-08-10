export type Paginated<T> = {
	items: T[];
	total: number;
	page: number;
	pageSize: number;
	error?: string;
};

export type PaginationQueryBase = {
	page?: number;
	pageSize?: number;
	sort?: string;
	order?: "asc" | "desc";
};

export function buildQuery(params: Record<string, unknown>) {
	const q = new URLSearchParams();
	Object.entries(params).forEach(([k, v]) => {
		if (v !== undefined && v !== null && v !== "") q.set(k, String(v));
	});
	const s = q.toString();
	return s ? `?${s}` : "";
}

export function getPaginationRange(page: number, pageSize: number) {
	const from = Math.max(0, (page - 1) * pageSize);
	const to = from + pageSize - 1;
	return { from, to };
}

export function parsePaginationParams(
	searchParams: URLSearchParams,
	opts?: {
		defaultPage?: number;
		defaultPageSize?: number;
		maxPageSize?: number;
		defaultSort?: string;
		defaultOrder?: "asc" | "desc";
	},
) {
	const defaultPage = opts?.defaultPage ?? 1;
	const defaultPageSize = opts?.defaultPageSize ?? 20;
	const maxPageSize = opts?.maxPageSize ?? 100;
	const defaultSort = opts?.defaultSort ?? "created_at";
	const defaultOrder = opts?.defaultOrder ?? "desc";

	const page = Math.max(
		1,
		Number(searchParams.get("page") ?? String(defaultPage)),
	);
	const pageSize = Math.min(
		Math.max(
			1,
			Number(searchParams.get("pageSize") ?? String(defaultPageSize)),
		),
		maxPageSize,
	);
	const sort = (searchParams.get("sort") ?? defaultSort).trim();
	const order: "asc" | "desc" =
		(searchParams.get("order") ?? defaultOrder).toLowerCase() === "asc"
			? "asc"
			: "desc";

	return { page, pageSize, sort, order };
}
