import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/database.types";

export async function createClient(response?: NextResponse) {
	const cookieStore = await cookies();
	return createServerClient<Database>(
		process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					if (response) {
						cookiesToSet.forEach(({ name, value, options }) =>
							response.cookies.set(name, value, options),
						);
					} else {
						cookiesToSet.forEach(({ name, value, options }) =>
							cookieStore.set(name, value, options),
						);
					}
				},
			},
		},
	);
}
