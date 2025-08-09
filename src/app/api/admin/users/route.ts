import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPaginationRange, parsePaginationParams } from "@/services/pagination";

// List users with optional search/sort/pagination
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { page, pageSize, sort, order } = parsePaginationParams(searchParams, {
    defaultSort: "created_at",
    defaultOrder: "desc",
  });
  const supabaseOrder = order === "asc" ? { ascending: true } : { ascending: false };
  const search = searchParams.get("search")?.trim();

  const supabase = await createClient();

  let query = supabase
    .from("users")
    .select("id, email, full_name, created_at, country, avatar_url", { count: "exact" });

  if (search) {
    // email ilike or full_name ilike
    query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`);
  }

  // sort: only allow known columns
  const sortable = new Set(["email", "full_name", "created_at", "country"]);
  const sortColumn = sortable.has(sort) ? sort : "created_at";

  const { from, to } = getPaginationRange(page, pageSize);

  const { data, error, count } = await query
    .order(sortColumn as "email" | "full_name" | "created_at" | "country", supabaseOrder)
    .range(from, to);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ items: data ?? [], total: count ?? 0, page, pageSize });
}


