import { href, Link } from "react-router";
import { Examples } from "@/components/data/examples";
import { Flex } from "@/components/layout/flex";
import { Anchor } from "@/components/logic/anchor";
import { Button } from "@/components/ui/button";
import {
  ContentHeadingPage,
  ContentIntroParagraph,
} from "@/components/ui/content";
import { caller } from "@/lib/trpc/server";
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
        <ContentHeadingPage className="mb-10">
          🐶Dogokit Corgi
        </ContentHeadingPage>
        <article className="prose-config">
          <ContentIntroParagraph>
            <Anchor href="https://github.com/dogokit/dogokit-corgi">
              Dogokit Corgi
            </Anchor>{" "}
            is a full stack web app kit. The quick implementation details of{" "}
            <Anchor href="https://github.com/dogokit/dogokit-akita">
              Dogokit Akita
            </Anchor>
          </ContentIntroParagraph>

          <p>
            Using React React Router Framework, tRPC, Prisma, Better Auth, Zod,
            Conform, Tailwind CSS, shadcn/ui, and{" "}
            <Anchor href="https://github.com/dogokit/dogokit-corgi">
              much more
            </Anchor>
            .
          </p>
        </article>

        <Flex>
          <Button asChild>
            <Anchor
              href={
                "https://github.com/new?template_name=dogokit-corgi&template_owner=dogokit"
              }
            >
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
