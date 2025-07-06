import { AuthPanelForgotPassword } from "@/modules/auth/components/auth-panel";
import type { Route } from "./+types/forgot-password";

export const meta: Route.MetaFunction = () => [{ title: "Forgot Password" }];

export default function ForgotPasswordRoute() {
  return <AuthPanelForgotPassword />;
}
