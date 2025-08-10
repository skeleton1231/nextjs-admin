"use client";

import { Suspense, useMemo, useState } from "react";
import {
	useAdminUsers,
	UserSortableKey,
	USER_COLUMNS,
	type AdminUser,
} from "@/services/admin/users";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable, PaginationBar } from "@/components/data-table";
import { useListState } from "@/components/data-table/useListState";
// Table UI is provided by DataTable internally

export default function AdminUsersPage() {
	const { page, setPage, pageSize, sorting, onSortingChange, query, filters, setFilter } =
		useListState<UserSortableKey, "search">({
			defaultSort: "created_at",
			defaultOrder: "desc",
			defaultPage: 1,
			defaultPageSize: 20,
			filterKeys: ["search"] as const,
			syncToUrl: true,
		});

	const { data, isLoading } = useAdminUsers(query);

	const columns: ColumnDef<AdminUser, unknown>[] = useMemo(() => {
		return USER_COLUMNS.map((c) => ({
			id: c.key,
			accessorKey: c.key as string,
			header: c.label,
			cell: (ctx) => {
				const value = ctx.getValue<unknown>();
				if (c.key === "created_at") {
					const v = ctx.getValue<string | undefined>();
					return v ? v.slice(0, 19).replace("T", " ") : "-";
				}
				return value ?? "-";
			},
			enableSorting: true,
		}));
	}, []);

	// sorting change is provided by useListState

	return (
		<Suspense fallback={null}>
			<div className="space-y-4">
				<div className="z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3">
					<div className="flex items-center justify-between">
						<h1 className="text-xl font-semibold">用户管理</h1>
						<div className="flex items-center gap-2">
							<input
								value={filters.search ?? ""}
								onChange={(e) => setFilter("search", e.target.value)}
								placeholder="搜索邮箱/姓名"
								className="h-9 w-64 rounded-md border px-3 text-sm"
							/>
						</div>
					</div>
				</div>

				<div className="overflow-x-auto rounded-md border">
					<DataTable
						data={data?.items ?? []}
						columns={columns}
						sorting={sorting}
						onSortingChange={onSortingChange}
						isLoading={isLoading}
						headerClassName="[top:var(--admin-filters-height)] z-20 bg-background"
					/>
				</div>

				<PaginationBar
					page={data?.page ?? page}
					pageSize={data?.pageSize ?? pageSize}
					total={data?.total}
					onPrev={() => setPage(Math.max(1, (data?.page ?? page) - 1))}
					onNext={() => setPage((data?.page ?? page) + 1)}
				/>
			</div>
		</Suspense>
	);
}
