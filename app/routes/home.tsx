import { href, Link } from "react-router";

import { Anchor } from "@/components/shared/anchor";
import { Examples } from "@/components/shared/examples";
import { Flex } from "@/components/shared/flex";
import { LogoBrand } from "@/components/shared/logo-brand";
import { Button } from "@/components/ui/button";
import { ContentIntroParagraph } from "@/components/ui/content";
import { caller } from "@/server/trpc-caller";
import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  const api = await caller(request);
  const examples = await api.greeting.getExamples();
  return { examples };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { examples } = loaderData;

  return (
    <>
      <section className="container max-w-xl">
        <LogoBrand />

        <article className="prose-config">
          <ContentIntroParagraph>
            <Anchor href="https://github.com/dogokit/dogokit-corgi">Dogokit Corgi</Anchor> is a full stack web app kit.
            The quick implementation details of{" "}
            <Anchor href="https://github.com/dogokit/dogokit-akita">Dogokit Akita</Anchor>
          </ContentIntroParagraph>

          <p>
            Using React React Router Framework, tRPC, Prisma, Better Auth, Zod, Conform, Tailwind CSS, shadcn/ui, and{" "}
            <Anchor href="https://github.com/dogokit/dogokit-corgi">much more</Anchor>.
          </p>
        </article>

        <Flex>
          <Button asChild>
            <Anchor href={"https://github.com/new?template_name=dogokit-corgi&template_owner=dogokit"}>
              Use this template
            </Anchor>
          </Button>
          <Button asChild>
            <Link to={href("/about")}>Go to About</Link>
          </Button>
        </Flex>
      </section>

      <Examples examples={examples} />
    </>
  );
}
