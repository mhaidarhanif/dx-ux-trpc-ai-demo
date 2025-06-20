import clsx from "clsx";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";

import { Layout } from "@/components/shared/layout";
import { ContentHeading } from "@/components/ui/content";
import { TRPCReactProvider } from "@/lib/trpc-client";
import { themeSessionResolver } from "@/themes.server";
import type { Route } from "./+types/root";

import "@/app.css";
import { siteConfig } from "./config/site";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,100..900,100,1&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: Route.MetaFunction = () => {
  return [
    { title: siteConfig.name },
    { name: "description", content: siteConfig.description },
    { property: "og:title", content: siteConfig.name },
    { property: "og:description", content: siteConfig.name },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return { theme: getTheme() };
}

export default function RootRoute({ loaderData }: Route.ComponentProps) {
  return (
    <ThemeProvider
      specifiedTheme={loaderData.theme}
      themeAction="/action/set-theme"
    >
      <HTMLDocumentThemed>
        <Outlet />
      </HTMLDocumentThemed>
    </ThemeProvider>
  );
}

export function HTMLDocumentThemed({
  children,
}: {
  children: React.ReactNode;
}) {
  const loaderData = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(loaderData.theme)} />
        <Links />
      </head>

      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HTMLDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>{children}</body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <HTMLDocumentThemed>
        <Layout>
          <h1>
            {error.status} {error.statusText}
          </h1>
          <p>{error.data}</p>
        </Layout>
      </HTMLDocumentThemed>
    );
  } else if (error instanceof Error) {
    return (
      <HTMLDocument>
        <div className="space-y-4 p-4">
          <ContentHeading>Error</ContentHeading>
          <p>{error.message}</p>
          <p>The stack trace:</p>
          <pre className="text-xs">{error.stack}</pre>
        </div>
      </HTMLDocument>
    );
  } else {
    return (
      <HTMLDocument>
        <h1>Unknown Error</h1>
      </HTMLDocument>
    );
  }
}
