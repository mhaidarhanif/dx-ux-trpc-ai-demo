import { PrismaClient } from "@/generated/prisma/client";
import { dataExamples } from "./data/examples";

const prisma = new PrismaClient();

async function main() {
  for (const example of dataExamples) {
    const upsertedExample = await prisma.example.upsert({
      where: { slug: example.slug },
      update: {
        name: example.name,
        items: { connect: { slug: `item-${example.slug}` } },
      },
      create: {
        slug: example.slug,
        name: example.name,
        items: {
          create: {
            slug: `item-${example.slug}`,
            name: `Item of ${example.name}`,
          },
        },
      },
    });

    console.info(`${upsertedExample.name} and item`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
