import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./utils/jwt-solver";

export async function middleware(req: NextRequest) {
  const reqUrl = new URL(req.url);
  const res = NextResponse.next();
  const bearerToken = req.headers.get('Authorization');
  
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
  const unAuthPage = ["/sign-in", "/sign-up"].includes(reqUrl.pathname);
  const unAuthApiRoutes = ['/api/auth/callback']
  if (reqUrl.pathname === "/") return res;
  
  if (reqUrl.pathname.startsWith('/api')) {
    if(!unAuthApiRoutes.includes(reqUrl.pathname)){
      if(!bearerToken) {
        return new NextResponse('Unauthorized', {status: 401})
      }
      const apiToken = bearerToken.split(' ')[1]
      await verifyJwtToken(apiToken).catch((err)=> {
        return new NextResponse('err', {status: 401})
      })
    }
    return res
  }
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: {  user },
  } = await supabase.auth.getUser();
  const {data: project} = await supabase.from('project').select('id');

  if (!user && !unAuthPage) {
    return NextResponse.redirect(`http://${reqUrl.host}/sign-in`);
  }
  if ((unAuthPage && user) || reqUrl.pathname.endsWith('/dashboard')) {
    return NextResponse.redirect(`http://${reqUrl.host}/dashboard/projects`);
  }
  
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
};
