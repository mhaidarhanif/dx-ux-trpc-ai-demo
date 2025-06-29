import { SplitText } from "@/components/blocks/text-animations/split-text";
import { Anchor } from "@/components/shared/anchor";
import { ButtonAnchor } from "@/components/shared/button-anchor";
import { Flex } from "@/components/shared/flex";
import { ContentIntro } from "@/components/ui/content";
import { Icons } from "@/lib/icons";

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
          application. With a lot of components, configuration, and boilerplate
          code already set up. Feel free to use, modify, and remove any parts
          you don't need.
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
        >
          <Icons.Code />
          <span>Use Template</span>
        </ButtonAnchor>
      </Flex>
    </section>
  );
}
