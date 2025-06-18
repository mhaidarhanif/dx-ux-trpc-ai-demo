import { Anchor } from "@/components/shared/anchor";
import {
  ContentHeadingPage,
  ContentIntroParagraph,
} from "@/components/ui/content";

export default function AboutRoute() {
  return (
    <>
      <section className="container max-w-xl">
        <ContentHeadingPage>About</ContentHeadingPage>

        <article className="prose-config">
          <ContentIntroParagraph>
            This is just an example. Please enjoy...!
          </ContentIntroParagraph>
          <p>
            Made by{" "}
            <Anchor href="https://github.com/mhaidarhanif">
              M Haidar Hanif
            </Anchor>
          </p>
        </article>
      </section>
    </>
  );
}
