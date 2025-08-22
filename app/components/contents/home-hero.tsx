import { ButtonAnchor } from "@/components/buttons/button-anchor";
import { Anchor } from "@/components/shared/anchor";
import { Flex } from "@/components/shared/flex";
import { SplitText } from "@/components/texts/split-text";
import { ContentIntro } from "@/components/ui/content";
import { Icons } from "@/lib/icons";
import { envClient } from "@/modules/env/env";

export function HomeHero({ helloText }: { helloText: string }) {
  return (
    <section className="container max-w-xl">
      <SplitText
        className="py-2 font-semibold text-2xl sm:text-4xl"
        delay={10}
        duration={2}
        ease="elastic.out(1, 0.3)"
        splitType="chars"
        text={helloText}
      />

      <article className="prose-config">
        <ContentIntro>
          <p>
            Welcome to{" "}
            <Anchor href="https://github.com/dogokit/dogokit-corgi">
              {envClient.VITE_APP_NAME}
            </Anchor>
          </p>
        </ContentIntro>

        <p>
          A full stack web app kit with React Router v7 Framework, tRPC, Better
          Auth, Prisma, Tailwind CSS, shadcn/ui, and more.
        </p>
      </article>

      <Flex className="gap-4">
        <ButtonAnchor href="https://github.com/dogokit/dogokit-corgi" size="lg">
          <Icons.Star />
          <span>Star on GitHub</span>
        </ButtonAnchor>
        <ButtonAnchor
          href="https://github.com/new?template_name=dogokit-corgi&template_owner=dogokit"
          size="lg"
          variant="secondary"
        >
          <Icons.Code />
          <span>Use Template</span>
        </ButtonAnchor>
      </Flex>
    </section>
  );
}
