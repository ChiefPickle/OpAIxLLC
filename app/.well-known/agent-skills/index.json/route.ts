import { skillIndex } from "@/lib/agent/skills";
import { MACHINE_HEADERS } from "@/lib/agent/site";

export function GET() {
  return Response.json(skillIndex(), {
    headers: {
      "Content-Type": "application/json",
      ...MACHINE_HEADERS,
    },
  });
}
