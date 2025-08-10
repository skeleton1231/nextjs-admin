import { createAdminClient } from "@/lib/supabase/admin";
import { ADMIN_USER_SELECT, type UserSortableKey } from "./config";

export type FetchAdminUsersParams = {
  page: number;
  pageSize: number;
  sort: UserSortableKey;
  order: "asc" | "desc";
  search?: string;
  from: number;
  to: number;
};

export async function fetchAdminUsers(params: FetchAdminUsersParams) {
  const { sort, order, search, from, to } = params;
  const supabase = createAdminClient();

  let query = supabase
    .from("users")
    .select(ADMIN_USER_SELECT, { count: "exact" })
    .order(sort, { ascending: order === "asc" });

  if (search) {
    query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`);
  }

  const { data, error, count } = await query.range(from, to);
  return { data, error, count } as const;
}


