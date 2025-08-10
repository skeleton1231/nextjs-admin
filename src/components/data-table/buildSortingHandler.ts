import type { SortingState } from "@tanstack/react-table";

export function buildSortingHandler<TSortKey extends string>(
  currentSorting: SortingState,
  opts: {
    setSortKey: (key: TSortKey) => void;
    setSortOrder: (order: "asc" | "desc") => void;
    defaultSortKey: TSortKey;
    defaultOrder?: "asc" | "desc";
    onResetPage?: () => void;
  }
) {
  const { setSortKey, setSortOrder, defaultSortKey, defaultOrder = "desc", onResetPage } = opts;

  return (updater: SortingState | ((old: SortingState) => SortingState)) => {
    const next = typeof updater === "function" ? (updater as (old: SortingState) => SortingState)(currentSorting) : updater;
    const first = next?.[0];
    if (onResetPage) onResetPage();
    if (first) {
      setSortKey(first.id as TSortKey);
      setSortOrder(first.desc ? "desc" : "asc");
    } else {
      setSortKey(defaultSortKey);
      setSortOrder(defaultOrder);
    }
  };
}


