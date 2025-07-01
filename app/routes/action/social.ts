import { actionSignInSocial } from "@/modules/auth/helpers";
import type { Route } from "./+types/social";

export function action({ request }: Route.ActionArgs) {
  return actionSignInSocial(request);
}
