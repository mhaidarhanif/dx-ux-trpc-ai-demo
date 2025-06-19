import type { Route } from "./+types/forgot-password";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Forgot Password - Dogokit Corgi" }];
};

export default function ForgotPasswordRoute() {
  return (
    <div>
      <h1>Forgot Password</h1>
    </div>
  );
}
