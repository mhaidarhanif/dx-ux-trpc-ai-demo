import type { Route } from "./+types/forgot-password";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Forgot Password" }];
};

export default function ForgotPasswordRoute() {
  return (
    <div>
      <h1>Forgot Password</h1>
    </div>
  );
}
