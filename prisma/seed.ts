import { PrismaClient } from "@/generated/prisma/client";
import { dataExamples } from "./data/examples";

const prisma = new PrismaClient();

async function main() {
  for (const example of dataExamples) {
    await prisma.$transaction(async (tx) => {
      const newExample = await tx.example.upsert({
        where: { slug: example.slug },
        update: { name: example.name },
        create: { slug: example.slug, name: example.name },
      });

      await Promise.all(
        example.items.map((item) =>
          tx.exampleItem.upsert({
            where: { slug: item.slug },
            update: { name: item.name, exampleId: newExample.id },
            create: { slug: item.slug, name: item.name, exampleId: newExample.id },
          })
        )
      );
    });
    console.info(`${example.name} and items upserted`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
