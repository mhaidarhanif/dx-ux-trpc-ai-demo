/** biome-ignore-all lint/suspicious/noExplicitAny: "This is fine" */
import type { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import type { ZodType } from "zod/v4";
import { createTimer } from "@/lib/system/timer";

export type LastResult = SubmissionResult<string[]> | null | undefined;

export async function parseForm(
  request: Request,
  schema: ZodType<any, any, any>
) {
  const formData = await request.formData();
  return parseWithZod(formData, { schema });
}

export async function parseFormTimer(
  request: Request,
  schema: ZodType<any, any, any>
) {
  const timer = createTimer();
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });
  return { submission, timer };
}
