import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  const supabase = await createClient(response);
  await supabase.auth.signOut();
  return response;
}


