"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { OnChangeFn, SortingState } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buildSortingHandler } from "@/components/data-table/buildSortingHandler";

export type ListOrder = "asc" | "desc";

export type UseListStateOptions<
  TSortKey extends string,
  TFilterKey extends string,
> = {
  defaultSort: TSortKey;
  defaultOrder?: ListOrder;
  defaultPage?: number;
  defaultPageSize?: number;
  filterKeys?: readonly TFilterKey[];
  syncToUrl?: boolean;
};

export type UseListStateReturn<
  TSortKey extends string,
  TFilterKey extends string,
> = {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  sort: TSortKey;
  setSort: (key: TSortKey) => void;
  order: ListOrder;
  setOrder: (order: ListOrder) => void;
  filters: Record<TFilterKey, string>;
  setFilter: (key: TFilterKey, value: string) => void;
  resetPage: () => void;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  query:
    & { page: number; pageSize: number; sort: TSortKey; order: ListOrder }
    & Partial<
      Record<TFilterKey, string>
    >;
};

function readInitialParams<TSortKey extends string, TFilterKey extends string>(
  searchParams: URLSearchParams,
  opts: UseListStateOptions<TSortKey, TFilterKey>,
) {
  const defaultPage = opts.defaultPage ?? 1;
  const defaultPageSize = opts.defaultPageSize ?? 20;
  const defaultOrder = (opts.defaultOrder ?? "desc") as ListOrder;

  const page = Math.max(
    1,
    Number(searchParams.get("page") ?? String(defaultPage)),
  );
  const pageSize = Math.max(
    1,
    Number(searchParams.get("pageSize") ?? String(defaultPageSize)),
  );
  const sort = (searchParams.get("sort") ?? opts.defaultSort) as TSortKey;
  const order =
    (searchParams.get("order")?.toLowerCase() === "asc"
      ? "asc"
      : defaultOrder) as ListOrder;

  const filters = {} as Record<TFilterKey, string>;
  (opts.filterKeys ?? ([] as unknown as TFilterKey[])).forEach((k) => {
    const v = searchParams.get(k) ?? "";
    filters[k] = v;
  });

  return { page, pageSize, sort, order, filters };
}

function toQueryObject<TSortKey extends string, TFilterKey extends string>(
  state: {
    page: number;
    pageSize: number;
    sort: TSortKey;
    order: ListOrder;
    filters: Record<TFilterKey, string>;
  },
) {
  return {
    page: state.page,
    pageSize: state.pageSize,
    sort: state.sort,
    order: state.order,
    ...state.filters,
  } as const;
}

export function useListState<
  TSortKey extends string,
  TFilterKey extends string = never,
>(
  opts: UseListStateOptions<TSortKey, TFilterKey>,
): UseListStateReturn<TSortKey, TFilterKey> {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize from URL when sync enabled; otherwise use defaults
  const initial = useMemo(() => {
    if (opts.syncToUrl) {
      return readInitialParams<TSortKey, TFilterKey>(searchParams, opts);
    }
    return {
      page: opts.defaultPage ?? 1,
      pageSize: opts.defaultPageSize ?? 20,
      sort: opts.defaultSort,
      order: (opts.defaultOrder ?? "desc") as ListOrder,
      filters: Object.fromEntries(
        (opts.filterKeys ?? []).map((k) => [k, ""]),
      ) as Record<TFilterKey, string>,
    };
  }, [opts, searchParams]);

  const [page, setPage] = useState<number>(initial.page);
  const [pageSize, setPageSize] = useState<number>(initial.pageSize);
  const [sort, setSort] = useState<TSortKey>(initial.sort);
  const [order, setOrder] = useState<ListOrder>(initial.order);
  const [filters, setFilters] = useState<Record<TFilterKey, string>>(
    initial.filters,
  );

  const resetPage = useCallback(() => setPage(1), []);

  const setFilter = useCallback((key: TFilterKey, value: string) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      return next;
    });
    setPage(1);
  }, []);

  const sorting: SortingState = useMemo(
    () => [{ id: String(sort), desc: order === "desc" }],
    [sort, order],
  );

  const onSortingChange: OnChangeFn<SortingState> = useMemo(
    () =>
      buildSortingHandler<TSortKey>(sorting, {
        onResetPage: resetPage,
        setSortKey: setSort,
        setSortOrder: setOrder,
        defaultSortKey: opts.defaultSort,
        defaultOrder: opts.defaultOrder ?? "desc",
      }),
    [sorting, resetPage, opts.defaultSort, opts.defaultOrder],
  );

  const query = useMemo(
    () => toQueryObject({ page, pageSize, sort, order, filters }),
    [page, pageSize, sort, order, filters],
  );

  // Sync to URL on change (replace to avoid history spam)
  useEffect(() => {
    if (!opts.syncToUrl) return;
    // Clone current params to preserve unrelated keys
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("page", String(page));
    nextParams.set("pageSize", String(pageSize));
    nextParams.set("sort", String(sort));
    nextParams.set("order", order);
    // Apply filters (delete when empty)
    (opts.filterKeys ?? []).forEach((k) => {
      const key = String(k);
      const v = filters[k as TFilterKey];
      if (v !== undefined && v !== null && v !== "") {
        nextParams.set(key, String(v));
      } else nextParams.delete(key);
    });

    // Compare normalized strings to avoid redundant replace
    const toCanonical = (params: URLSearchParams) =>
      Array.from(params.entries())
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([k, v]) => `${k}=${v}`)
        .join("&");

    const currentCanonical = toCanonical(
      searchParams as unknown as URLSearchParams,
    );
    const nextCanonical = toCanonical(nextParams);
    if (currentCanonical === nextCanonical) return;

    const qs = nextParams.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`);
  }, [
    opts.syncToUrl,
    opts.filterKeys,
    page,
    pageSize,
    sort,
    order,
    filters,
    pathname,
    router,
    searchParams,
  ]);

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    sort,
    setSort,
    order,
    setOrder,
    filters,
    setFilter,
    resetPage,
    sorting,
    onSortingChange,
    query: query as UseListStateReturn<TSortKey, TFilterKey>["query"],
  };
}
