import { href, redirect } from "react-router";
import { parseFormTimer } from "@/lib/form/parse";
import { createTimer } from "@/lib/system/timer";
import { getNameParts } from "@/lib/text/convert";
import { auth } from "@/modules/auth/better-auth";
import {
  AuthSignInSchema,
  AuthSignUpSchema,
  AuthSocialSchema,
} from "@/modules/auth/schema";
import { caller } from "@/modules/trpc/trpc-caller";

export type AuthResponse = {
  code: string;
  message: string;
};

export type AuthResponseError = {
  status: string;
  statusCode: number;
  headers: Headers;
  body: AuthResponse;
};

export type AuthResponseSignOut = {
  success: string;
};

export type AuthResponseOAuth = {
  url: string;
  redirect: boolean;
};

/**
 * Auth Loaders
 */

export type AuthSession = Awaited<ReturnType<typeof getSession>>;

export function getSession(request: Request) {
  return auth.api.getSession({ headers: request.headers });
}

export async function requireSession(request: Request) {
  const session = await getSession(request);
  const trpc = await caller(request);
  if (!session?.user.id) {
    return {
      isAuthenticated: false,
      user: null,
      trpc,
    };
  }

  return {
    isAuthenticated: true,
    user: session.user,
    trpc,
  };
}
// Redirect to /signin if not authenticated
export async function requireSessionRedirectSignIn(request: Request) {
  const { isAuthenticated, user } = await requireSession(request);
  if (!isAuthenticated) return redirect(href("/signin"));
  if (!user) return redirect(href("/signin"));
  return { isAuthenticated, user };
}

// Redirect to /dashboard if authenticated
export async function requireSessionRedirectDashboard(request: Request) {
  const { isAuthenticated, user } = await requireSession(request);
  if (isAuthenticated) return redirect(href("/dashboard"));
  if (user) return redirect(href("/dashboard"));
  return { isAuthenticated, user };
}

export async function requireUserData(request: Request) {
  const trpc = await caller(request);
  const session = await getSession(request);
  if (!session?.user.id) {
    return {
      isAuthenticated: false,
      session: null,
      user: null,
      trpc,
    };
  }

  const user = await trpc.auth.getUser();
  return {
    isAuthenticated: true,
    session,
    user,
    trpc,
  };
}

// Redirect to /signin if not authenticated
export async function requireUserRedirectSignIn(request: Request) {
  const { isAuthenticated, user } = await requireUserData(request);
  if (!isAuthenticated) return redirect(href("/signin"));
  if (!user) return redirect(href("/signin"));
  return { isAuthenticated, user };
}

/**
 * Auth Actions
 */

export async function actionSignUp(request: Request) {
  const { submission, timer } = await parseFormTimer(request, AuthSignUpSchema);
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
    const authResponse: AuthResponse = await response.json();

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
    const authError = error as AuthResponseError;
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

export async function actionSignIn(request: Request) {
  const { submission, timer } = await parseFormTimer(request, AuthSignInSchema);
  if (submission.status !== "success") return submission.reply();

  const response = await auth.api.signInEmail({
    asResponse: true,
    headers: request.headers,
    body: submission.value,
  });

  const authResponse: AuthResponse = await response.json();

  if (!response.ok) {
    return submission.reply({
      formErrors: [authResponse.message || "Failed to sign in or authenticate"],
    });
  }

  await timer.delay();
  return redirect(href("/dashboard"), { headers: response.headers });
}

export async function actionSignOut(request: Request) {
  const timer = createTimer();

  const authResponse = await auth.api.signOut({
    headers: request.headers,
  });

  await timer.delay();
  if (!authResponse.success) return null;

  return redirect(href("/signin"));
}

export async function actionSignInSocial(request: Request) {
  const { submission, timer } = await parseFormTimer(request, AuthSocialSchema);
  if (submission.status !== "success") return submission.reply();

  const response = await auth.api.signInSocial({
    asResponse: true,
    headers: request.headers,
    body: {
      provider: submission.value.provider,
      callbackURL: "/dashboard",
    },
  });
  const authResponse: AuthResponseOAuth = await response.json();

  if (!response.ok) {
    return submission.reply({
      formErrors: [`Failed to continue with ${submission.value.provider}`],
    });
  }

  await timer.delay();
  if (!(authResponse.redirect && authResponse.url)) return null;

  return redirect(authResponse.url);
}
