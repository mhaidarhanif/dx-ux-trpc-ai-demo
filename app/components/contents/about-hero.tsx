import { Anchor } from "@/components/shared/anchor";
import { ContentHeading, ContentIntro } from "@/components/ui/content";

export function AboutHero() {
  return (
    <section className="container max-w-xl">
      <ContentHeading>About</ContentHeading>

      <article className="prose-config">
        <ContentIntro>
          <p>
            Made by{" "}
            <Anchor href="https://github.com/mhaidarhanif">
              M Haidar Hanif
            </Anchor>
          </p>
        </ContentIntro>
        <p>This is the about page. Please enjoy...!</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
          assumenda minima eius autem cupiditate debitis illo ea, commodi ullam
          alias similique porro! Facere quod itaque tempora suscipit dignissimos
          qui doloribus.
        </p>
      </article>
    </section>
  );
}
