import { SiGithub } from "@icons-pack/react-simple-icons";
import { href, Link } from "react-router";
import { Anchor } from "@/components/shared/anchor";
import { Flex } from "@/components/shared/flex";
import { Button } from "@/components/ui/button";
import { ContentIntro } from "@/components/ui/content";
import { caller } from "@/server/trpc-caller";
import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  const api = await caller(request);
  const hello = await api.greeting.sayHello("Visitor");
  return { hello };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { hello } = loaderData;

  return (
    <>
      <HomeHero hello={hello} />
    </>
  );
}

function HomeHero({ hello }: { hello: string }) {
  return (
    <section className="container max-w-xl">
      <article className="prose-config">
        <ContentIntro>
          <p>
            <span>{hello}</span>.
          </p>
          <p>
            Welcome to{" "}
            <Anchor href="https://github.com/dogokit/dogokit-corgi">
              Dogokit Corgi
            </Anchor>
            . A full stack web app kit with React Router v7 Framework, tRPC,
            Better Auth, Prisma, Tailwind CSS, shadcn/ui, and more.
          </p>
        </ContentIntro>

        <p>
          This template is one of implementation details of{" "}
          <Anchor href="https://github.com/dogokit/dogokit-akita">
            Dogokit Akita
          </Anchor>
          . Designed to help you quickly get started with your own web
          application. With a lot of configuration and boilerplate code already
          set up.
        </p>
      </article>

      <Flex>
        <Button asChild>
          <Anchor
            href={
              "https://github.com/new?template_name=dogokit-corgi&template_owner=dogokit"
            }
          >
            <SiGithub />
            <span>Use this template</span>
          </Anchor>
        </Button>
        <Button asChild>
          <Link to={href("/about")}>Go to About</Link>
        </Button>
      </Flex>
    </section>
  );
}
