import { parseWithZod } from "@conform-to/zod/v4";
import type { ZodType } from "zod/v4";
import { createTimer } from "@/lib/system/timer";

// biome-ignore lint/suspicious/noExplicitAny: "This is fine"
export async function parseForm<T extends ZodType<any, any, any>>(
  request: Request,
  schema: T
) {
  const timer = createTimer();
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });
  return { timer, submission };
}
