import { markdownFor, markdownTokens } from "@/lib/agent/markdown";
import { MACHINE_HEADERS } from "@/lib/agent/site";

export const dynamic = "force-dynamic";

function markdownResponse(body: string, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(markdownTokens(body)),
      ...MACHINE_HEADERS,
    },
  });
}

export function GET(
  _request: Request,
  { params }: { params: { path?: string[] } },
) {
  const pathname =
    params.path && params.path.length > 0 ? `/${params.path.join("/")}` : "/";
  const body = markdownFor(pathname);
  if (!body) {
    return markdownResponse(
      "# Not found\n\nThis page has no Markdown version.\n",
      404,
    );
  }
  return markdownResponse(body);
}
