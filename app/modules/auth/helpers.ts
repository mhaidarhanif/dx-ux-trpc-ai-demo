import { parseWithZod } from "@conform-to/zod/v4";
import { href, redirect } from "react-router";
import { createTimer } from "@/lib/system/timer";
import { getNameParts } from "@/lib/text/convert";
import { auth } from "@/modules/auth/better-auth";
import { AuthSignInSchema, AuthSignUpSchema } from "@/modules/auth/schema";
import { caller } from "@/modules/trpc/trpc-caller";

export type BetterAuthResponse = {
  code: string;
  message: string;
};

export type BetterAuthResponseError = {
  status: string;
  statusCode: number;
  headers: Headers;
  body: BetterAuthResponse;
};

export type BetterAuthResponseSignOut = {
  success: string;
};

export type BetterAuthResponseOAuth = {
  url: string;
  redirect: boolean;
};

/**
 * Require User Session
 */

export async function requireSession(request: Request) {
  return await auth.api.getSession({ headers: request.headers });
}

export async function requireAuthSession(request: Request) {
  const session = await requireSession(request);
  if (!session?.user.id) return { isAuthenticated: false, user: null };
  return { isAuthenticated: true, user: session.user };
}

export async function requireAuthUserData(request: Request) {
  const trpc = await caller(request);
  const session = await requireSession(request);
  if (!session?.user.id) return { trpc, isAuthenticated: false, user: null };

  const user = await trpc.auth.getUserComplete();
  const isAuthenticated = user !== null;
  return { trpc, isAuthenticated, user };
}

// Redirect to /signin if not authenticated
export async function requireAuthRedirectSignIn(request: Request) {
  const { isAuthenticated, user } = await requireAuthUserData(request);
  if (!isAuthenticated) return redirect(href("/signin"));
  if (!user) return redirect(href("/signin"));
  return { isAuthenticated, user };
}

// Redirect to /dashboard if authenticated
export async function requireAuthRedirectDashboard(request: Request) {
  const { isAuthenticated, user } = await requireAuthUserData(request);
  if (isAuthenticated) return redirect(href("/dashboard"));
  if (user) return redirect(href("/dashboard"));
  return { isAuthenticated, user };
}

/**
 * Actions for Auth
 */

export async function actionSignIn(request: Request) {
  const timer = createTimer();

  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: AuthSignInSchema });
  if (submission.status !== "success") return submission.reply();

  const response = await auth.api.signInEmail({
    asResponse: true,
    headers: request.headers,
    body: submission.value,
  });

  const authResponse: BetterAuthResponse = await response.json();

  if (!response.ok) {
    return submission.reply({
      formErrors: [authResponse.message || "Failed to sign in or authenticate"],
    });
  }

  await timer.delay();
  return redirect(href("/dashboard"), { headers: response.headers });
}

export async function actionSignUp(request: Request) {
  const timer = createTimer();

  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: AuthSignUpSchema });
  if (submission.status !== "success") return submission.reply();

  const { firstName, lastName } = getNameParts(submission.value.name);

  try {
    const response = await auth.api.signUpEmail({
      asResponse: true,
      headers: request.headers,
      body: {
        ...submission.value,
        firstName,
        lastName,
      },
    });
    const authResponse: BetterAuthResponse = await response.json();

    if (!response.ok) {
      return submission.reply({
        formErrors: [
          authResponse.message || "Failed to sign up or create new account",
        ],
      });
    }

    await timer.delay();
    return redirect(href("/dashboard"), { headers: response.headers });
  } catch (error) {
    const authError = error as BetterAuthResponseError;
    if (
      authError.body.code === "USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER"
    ) {
      return submission.reply({
        fieldErrors: {
          username: [authError.body.message || "Username is already taken"],
        },
      });
    }
    return submission.reply({
      formErrors: [
        authError.body.message || "Failed to sign up or create new account",
      ],
    });
  }
}
