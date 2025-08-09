import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, getResponse } = createMiddlewareClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const isAuthPage =
  //   request.nextUrl.pathname.startsWith("/login") ||
  //   request.nextUrl.pathname.startsWith("/auth");
  const isProtected = request.nextUrl.pathname.startsWith("/admin");

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return getResponse();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};


