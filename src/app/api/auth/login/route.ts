import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");
  if (!email || !password) {
    return NextResponse.json({ error: "email/password required" }, { status: 400 });
  }

  const response = NextResponse.redirect(new URL("/admin", request.url));
  const supabase = await createClient(response);

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return NextResponse.json({ error: error.message }, { status: 401 });
  return response;
}


