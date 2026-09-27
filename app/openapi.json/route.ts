import { openApiDocument } from "@/lib/agent/catalog";
import { MACHINE_HEADERS } from "@/lib/agent/site";

export function GET() {
  return Response.json(openApiDocument, {
    headers: {
      "Content-Type": "application/json",
      ...MACHINE_HEADERS,
    },
  });
}
