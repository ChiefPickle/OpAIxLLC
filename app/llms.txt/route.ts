import { LLMS_TXT } from "@/lib/agent/catalog";
import { MACHINE_HEADERS } from "@/lib/agent/site";

export function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      ...MACHINE_HEADERS,
    },
  });
}
