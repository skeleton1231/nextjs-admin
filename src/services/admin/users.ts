import useSWR from "swr";
import { API_ADMIN_USERS } from "@/services/urls";
import { jsonFetcher } from "@/services/fetcher";
import { Tables } from "@/lib/supabase/database.types";
import { Paginated, buildQuery } from "@/services/pagination";

type UsersRow = Tables<"users">;

export type AdminUser = Pick<
  UsersRow,
  "id" | "email" | "full_name" | "created_at" | "country" | "avatar_url"
>;

export type UserSortableKey = "email" | "full_name" | "created_at" | "country";

export type UserQuery = {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: UserSortableKey;
  order?: "asc" | "desc";
};

export function useAdminUsers(query: UserQuery) {
  const key = `${API_ADMIN_USERS}${buildQuery(query as Record<string, unknown>)}`;
  return useSWR<Paginated<AdminUser>>(key, jsonFetcher);
}


