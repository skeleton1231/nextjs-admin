import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Simple protection using a static admin token header.
// Set ADMIN_API_TOKEN in your env and send X-Admin-Token from your admin UI/CLI.
function assertAdminAuth(request: Request) {
  const token = process.env.ADMIN_API_TOKEN;
  const header = request.headers.get("x-admin-token");
  if (!token || header !== token) {
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  if (!assertAdminAuth(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { email, password, role = "admin" } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: "email/password required" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role },
    app_metadata: { roles: [role] },
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ user: data.user });
}


