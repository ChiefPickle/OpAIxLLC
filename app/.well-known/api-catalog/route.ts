import { apiCatalog } from "@/lib/agent/catalog";
import { MACHINE_HEADERS } from "@/lib/agent/site";

export function GET() {
  return Response.json(apiCatalog(), {
    headers: {
      "Content-Type": "application/linkset+json",
      ...MACHINE_HEADERS,
    },
  });
}
