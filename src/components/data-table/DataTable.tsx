"use client";

import {
	type ColumnDef,
	type SortingState,
	type OnChangeFn,
	getCoreRowModel,
	useReactTable,
	flexRender,
	type RowSelectionState,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";

type DataTableProps<TData> = {
	data: TData[];
	columns: ColumnDef<TData, unknown>[];
	sorting: SortingState;
	onSortingChange: OnChangeFn<SortingState>;
	isLoading?: boolean;
	skeletonRowCount?: number;
	className?: string;
	headerClassName?: string;
	// Selection (optional)
	enableRowSelection?: boolean;
	rowSelection?: RowSelectionState;
	onRowSelectionChange?: OnChangeFn<RowSelectionState>;
	getRowId?: (originalRow: TData, index: number, parent?: unknown) => string;
};

export function DataTable<TData>(props: DataTableProps<TData>) {
	const {
		data,
		columns,
		sorting,
		onSortingChange,
		isLoading,
		skeletonRowCount = 5,
		className,
		headerClassName,
		enableRowSelection,
		rowSelection,
		onRowSelectionChange,
		getRowId,
	} = props;

	// Inject selection column when enabled
	const selectionColumn: ColumnDef<TData, unknown> | null = enableRowSelection
		? {
			id: "__select",
			header: ({ table }) => {
				const rows = table.getRowModel().rows;
				const total = rows.length;
				const selectedCount = rows.filter((r) => r.getIsSelected()).length;
				const allSelected = total > 0 && selectedCount === total;
				const partiallySelected = selectedCount > 0 && selectedCount < total;
				return (
					<div className="px-1">
						<Checkbox
							checked={allSelected}
							indeterminate={partiallySelected}
							onChange={(e) => {
								const checked = e.currentTarget.checked;
								rows.forEach((r) => r.toggleSelected(checked));
							}}
							aria-label="选择本页所有行"
						/>
					</div>
				);
			},
			cell: ({ row }) => (
				<div className="px-1">
					<Checkbox
						checked={row.getIsSelected()}
						indeterminate={row.getIsSomeSelected()}
						onChange={(e) => row.toggleSelected(e.currentTarget.checked)}
						onClick={(e) => e.stopPropagation()}
						aria-label="选择行"
					/>
				</div>
			),
			enableSorting: false,
			size: 32,
		}
		: null;

	const computedColumns = selectionColumn
		? ([selectionColumn, ...columns] as ColumnDef<TData, unknown>[])
		: columns;

	const table = useReactTable({
		data,
		columns: computedColumns,
		getCoreRowModel: getCoreRowModel(),
		manualSorting: true,
		enableSortingRemoval: false,
		enableMultiSort: false,
		enableRowSelection: !!enableRowSelection,
		state: enableRowSelection
			? { sorting, rowSelection: rowSelection ?? {} }
			: { sorting },
		onSortingChange,
		...(enableRowSelection
			? { onRowSelectionChange, getRowId }
			: {}),
	});

	const hasRows = table.getRowModel().rows.length > 0;

	return (
		<Table className={className ?? "table-fixed"}>
			<TableHeader className={headerClassName ?? "z-20 bg-background"}>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							const canSort = header.column.getCanSort();
							const sortingHandler = header.column.getToggleSortingHandler();
							return (
								<TableHead
									key={header.id}
									className={canSort ? "cursor-pointer select-none" : "select-none"}
									onClick={canSort ? sortingHandler : undefined}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
									{canSort && header.column.getIsSorted()
										? header.column.getIsSorted() === "asc"
											? " ▲"
											: " ▼"
										: null}
								</TableHead>
							);
						})}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{isLoading && !hasRows ? (
					Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
						<TableRow key={`skeleton-${rowIndex}`}>
							{table.getAllLeafColumns().map((col) => (
								<TableCell key={col.id} className="px-3 py-2">
									<Skeleton className="h-4 w-full" />
								</TableCell>
							))}
						</TableRow>
					))
				) : !hasRows ? (
					<TableRow>
						<TableCell
							colSpan={table.getAllLeafColumns().length}
							className="px-3 py-6 text-center text-muted-foreground"
						>
							无数据
						</TableCell>
					</TableRow>
				) : (
					table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							data-state={
								enableRowSelection && row.getIsSelected() ? "selected" : undefined
							}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id} className="px-3 py-2">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
