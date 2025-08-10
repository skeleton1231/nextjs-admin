import { NextResponse } from "next/server";
import { fetchAdminProductById, updateAdminProduct } from "@/services/admin/products/server";

// GET /api/admin/products/:id
export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const { data, error } = await fetchAdminProductById(id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// PATCH /api/admin/products/:id
export async function PATCH(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await request.json();
  const { data, error } = await updateAdminProduct(id, body);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}


