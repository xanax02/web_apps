import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export default async function (req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // '/dashboard' route handling
  if (req.nextUrl.pathname.startsWith("/dashboard") && !session)
    return NextResponse.redirect(new URL("/login", req.url));

  // email signup error
  const emailLinkError = "Email link is invalid or has expired";
  if (
    req.nextUrl.searchParams.get("error_description") === emailLinkError &&
    req.nextUrl.pathname !== "/signup"
  ) {
    return NextResponse.redirect(
      new URL(
        `/signup?error_description=${req.nextUrl.searchParams.get(
          "error_description"
        )}`,
        req.url
      )
    );
  }

  if (["/login", "/signup"].includes(req.nextUrl.pathname) && session)
    return NextResponse.redirect(new URL("/dashboard", req.url));

  return res;
}
