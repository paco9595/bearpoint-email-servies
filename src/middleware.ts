import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const reqUrl = new URL(req.url);
  const res = NextResponse.next();

  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append("Access-Control-Allow-Origin", "*"); // replace this your actual origin
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT"
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  const supabase = createMiddlewareClient({ req, res });
  console.log(reqUrl.pathname);
  const unAuthPage = ["/sign-in", "/sign-up"].includes(reqUrl.pathname);
  if (reqUrl.pathname === "/") return res;

  console.log("test ", reqUrl.pathname === "/");
  const {
    data: {  user },
  } = await supabase.auth.getUser();

  if (unAuthPage && user) {
    return NextResponse.redirect(`http://${reqUrl.host}/dashboard`);
  }
  if (!user && !unAuthPage) {
    return NextResponse.redirect(`http://${reqUrl.host}/sign-in`);
  }
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
