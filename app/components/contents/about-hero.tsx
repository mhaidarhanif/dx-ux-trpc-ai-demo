import { Anchor } from "@/components/shared/anchor";
import { FigureImage } from "@/components/shared/figure-image";
import { ContentHeading, ContentIntro } from "@/components/ui/content";

export function AboutHero() {
  return (
    <section className="container max-w-xl">
      <ContentHeading>About</ContentHeading>

      <article className="prose-config">
        <ContentIntro>
          <p>
            Dogokit Corgi is a web app template using React Router v7 Framework,
            tRPC, Prisma, Better Auth, Tailwind CSS, shadcn, and more.
          </p>
        </ContentIntro>
        <p>
          This template is created by{" "}
          <Anchor href="https://github.com/mhaidarhanif">M Haidar Hanif</Anchor>
          . Designed for very short setup time, but long-term scalability. It's
          the implementation details of{" "}
          <Anchor href="https://github.com/dogokit/dogokit-akita">
            Dogokit Akita
          </Anchor>
          , a full stack app development kit.
        </p>

        <p>Codename "Corgi" is inspired by the Welsh Corgi breed.</p>
        <FigureImage
          alt="Pembroke Welsh Corgi standing outdoors in the fall"
          caption="Pembroke Welsh Corgi standing outdoors in the fall"
          creditHref="https://akc.org"
          creditLabel="American Kennel Club"
          src="https://akc.org/wp-content/uploads/2017/11/Pembroke-Welsh-Corgi-standing-outdoors-in-the-fall.jpg"
        />

        <h2>References</h2>
        <ul>
          <li>
            <Anchor href="https://ui.shadcn.com">shadcn/ui</Anchor>
          </li>
          <li>
            <Anchor href="https://originui.com">OriginUI</Anchor>
          </li>
          <li>
            <Anchor href="https://kibo-ui.com">Kibo UI</Anchor>
          </li>
          <li>
            <Anchor href="https://shadcn-registries.vercel.app">
              shadcn Registries
            </Anchor>
          </li>
          <li>
            <Anchor href="https://registry.directory">
              registry.directory
            </Anchor>
          </li>
          <li>
            <Anchor href="https://demo.better-auth.com">
              Better Auth Demo
            </Anchor>
          </li>
          <li>
            <Anchor href="https://github.com/ayoubphy/react-router-trpc-prisma-better-auth">
              <code>ayoubphy/react-router-trpc-prisma-better-auth</code>
            </Anchor>
          </li>
        </ul>

        <h2>Relations</h2>
        <ul>
          <li>
            <Anchor href="https://github.com/allnimal">🐾Allnimal</Anchor>
          </li>
          <li>
            <Anchor href="https://github.com/bearmentor">🐻Bearmentor</Anchor>
          </li>
          <li>
            <Anchor href="https://github.com/catamyst">🐱Catamyst</Anchor>
          </li>
          <li>
            <Anchor href="https://github.com/dogokit">🐶Dogokit</Anchor>
          </li>
          <li>
            <Anchor href="https://github.com/allnimal">🐘Elevanty</Anchor>
          </li>
        </ul>
      </article>
    </section>
  );
}
