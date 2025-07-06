import { actionSignInSocial } from "@/modules/auth/helpers";
import type { Route } from "./+types/social";

export const action = ({ request }: Route.ActionArgs) =>
  actionSignInSocial(request);
