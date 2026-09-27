import { NextResponse, type NextRequest } from "next/server";

import { hasMarkdown } from "@/lib/agent/markdown";
import {
  LINK_HEADER,
  shouldAttachDiscovery,
  wantsMarkdown,
} from "@/lib/agent/site";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.includes(".") && !pathname.endsWith("/index.md")) {
    return NextResponse.next();
  }

  const accept = request.headers.get("accept") ?? "";
  const markdown =
    wantsMarkdown(accept) && hasMarkdown(pathname)
      ? NextResponse.rewrite(new URL(`/agent-md${pathname === "/" ? "" : pathname}`, request.url))
      : NextResponse.next();

  markdown.headers.append("Vary", "Accept");
  if (shouldAttachDiscovery(pathname)) {
    markdown.headers.set("Link", LINK_HEADER);
  }
  if (
    (pathname === "/home" || pathname.startsWith("/home/")) &&
    !wantsMarkdown(accept)
  ) {
    markdown.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return markdown;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
