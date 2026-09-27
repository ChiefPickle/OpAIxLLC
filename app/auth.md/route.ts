import { AUTH_MD } from "@/lib/agent/catalog";
import { MACHINE_HEADERS } from "@/lib/agent/site";

export function GET() {
  return new Response(AUTH_MD, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      ...MACHINE_HEADERS,
    },
  });
}
