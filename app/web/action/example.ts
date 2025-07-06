import { devlog } from "@/lib/system/logger";
import type { Route } from "./+types/example";

export const action = ({ request }: Route.ActionArgs) => {
  devlog.info({ request });

  return null;
};
