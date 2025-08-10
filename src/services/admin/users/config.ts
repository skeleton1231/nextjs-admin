import { Tables } from "@/lib/supabase/database.types";

type UsersRow = Tables<"users">;

export type AdminUser = Pick<
  UsersRow,
  "id" | "email" | "full_name" | "created_at" | "country" | "avatar_url"
>;

export type UserSortableKey = keyof Pick<
  AdminUser,
  "email" | "full_name" | "created_at" | "country"
>;

export const DEFAULT_USER_SORT: UserSortableKey = "created_at";

export const USER_COLUMNS: ReadonlyArray<{
  key: UserSortableKey;
  label: string;
}> = [
  { key: "email", label: "邮箱" },
  { key: "full_name", label: "姓名" },
  { key: "country", label: "国家" },
  { key: "created_at", label: "创建时间" },
] as const;

export const ADMIN_USER_SELECT = (
  [
    "id",
    "email",
    "full_name",
    "created_at",
    "country",
    "avatar_url",
  ] as const
).join(", ");


