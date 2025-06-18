import { PrismaClient } from "@/server/generated/prisma";

const prisma = new PrismaClient();

const dataExamples = Array.from({ length: 26 }, (_, i) => ({
  slug: String.fromCharCode(97 + i),
  name: String.fromCharCode(65 + i),
}));

async function main() {
  for (const dataExample of dataExamples) {
    const example = await prisma.example.upsert({
      where: { slug: dataExample.slug },
      update: dataExample,
      create: dataExample,
    });

    console.log(`Example: ${example.name}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
