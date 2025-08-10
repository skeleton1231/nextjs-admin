"use client";

import {
  type ColumnDef,
  type SortingState,
  type OnChangeFn,
  getCoreRowModel,
  useReactTable,
  flexRender,
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

type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  isLoading?: boolean;
  skeletonRowCount?: number;
  className?: string;
  headerClassName?: string;
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
  } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    enableSortingRemoval: false,
    enableMultiSort: false,
    state: { sorting },
    onSortingChange,
  });

  const hasRows = table.getRowModel().rows.length > 0;

  return (
    <Table className={className ?? "table-fixed"}>
      <TableHeader className={headerClassName ?? "z-20 bg-background"}>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className="cursor-pointer select-none"
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getIsSorted()
                  ? header.column.getIsSorted() === "asc"
                    ? " ▲"
                    : " ▼"
                  : null}
              </TableHead>
            ))}
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
            <TableCell colSpan={table.getAllLeafColumns().length} className="px-3 py-6 text-center text-muted-foreground">
              无数据
            </TableCell>
          </TableRow>
        ) : (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
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


