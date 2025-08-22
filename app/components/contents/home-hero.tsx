import { SplitText } from "@/components/texts/split-text";

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
    </section>
  );
}
