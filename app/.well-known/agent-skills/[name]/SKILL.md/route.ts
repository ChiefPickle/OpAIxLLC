import { skillMarkdown } from "@/lib/agent/skills";
import { MACHINE_HEADERS } from "@/lib/agent/site";

export function GET(
  _request: Request,
  { params }: { params: { name: string } },
) {
  const body = skillMarkdown(params.name);
  if (!body) {
    return new Response("# Not found\n\nThat skill is not published.\n", {
      status: 404,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        ...MACHINE_HEADERS,
      },
    });
  }

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      ...MACHINE_HEADERS,
    },
  });
}
