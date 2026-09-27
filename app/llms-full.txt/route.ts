import { llmsFullTxt } from "@/lib/agent/catalog";
import { MACHINE_HEADERS } from "@/lib/agent/site";

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      ...MACHINE_HEADERS,
    },
  });
}
