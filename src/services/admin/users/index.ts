import useSWR from "swr";
import { API_ADMIN_USERS } from "@/services/urls";
import { jsonFetcher } from "@/services/fetcher";
import { Paginated, buildQuery } from "@/services/pagination";
import type { AdminUser, UserSortableKey } from "@/services/admin/users/config";

export type UserQuery = {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: UserSortableKey;
  order?: "asc" | "desc";
};

export function useAdminUsers(query: UserQuery) {
  const key = `${API_ADMIN_USERS}${buildQuery(query as Record<string, unknown>)}`;
  return useSWR<Paginated<AdminUser>>(key, jsonFetcher, { keepPreviousData: true });
}

export { USER_COLUMNS, DEFAULT_USER_SORT, ADMIN_USER_SELECT } from "@/services/admin/users/config";

export type { AdminUser, UserSortableKey } from "@/services/admin/users/config";


