import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const organization = req.url.split("/")[req.url.split("/").length - 1];
  const url = new URL(req.url);
  url.pathname = "/api/organization/";
  url.searchParams.set("organization", organization);
  const res = await fetch(url);
  const { repos } = await res.json();

  const redirect = new URL(req.url);
  redirect.pathname = "/wishlist";
  repos?.forEach((repo: string) => {
    redirect.searchParams.append("repo", repo);
  });

  return NextResponse.redirect(redirect);
}

export const config = {
  matcher: "/wishlist/:path/",
};
