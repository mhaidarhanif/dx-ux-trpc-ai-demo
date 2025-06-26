/** biome-ignore-all lint/nursery/noAwaitInLoop: "Prisma seed only" */

import { type Prisma, PrismaClient } from "@/generated/prisma/client";
import { devlog } from "@/lib/logger";
import { hashPassword } from "@/lib/password";
import { dataExamples } from "./data/examples";
import { dataSeedUsers } from "./data/users";

const prisma = new PrismaClient();

async function main() {
  await seedExamples();
  await seedUsers();
}

export async function seedExamples() {
  devlog.info("\n 🟢 Seeding examples... \n");

  for (const example of dataExamples) {
    const upsertedExample = await prisma.example.upsert({
      where: { slug: example.slug },
      update: {
        name: example.name,
        items: {
          connect: Array.from({ length: 3 }, (_, i) => ({
            slug: `item-${example.slug}-${i + 1}`,
          })),
        },
      },
      create: {
        slug: example.slug,
        name: example.name,
        items: {
          create: Array.from({ length: 3 }, (_, i) => ({
            slug: `item-${example.slug}-${i + 1}`,
            name: `Item ${example.name} ${i + 1}`,
          })),
        },
      },
    });

    devlog.info(`🗒️ Example: ${upsertedExample.name}`);
  }
}

export async function seedUsers() {
  devlog.info("\n 🟢 Seeding users... \n");

  for (const dataUser of dataSeedUsers) {
    const { password, ...user } = dataUser;

    const upsertedUser = await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });

    const upsertedAccount = await prisma.account.upsert({
      where: { accountId: upsertedUser.id },
      update: {},
      create: {
        userId: upsertedUser.id,
        providerId: "credential",
        accountId: upsertedUser.id,
        password: await hashPassword(password),
      },
    });

    devlog.info(`👤 User: ${upsertedUser.name} / ${upsertedUser.username} / ${upsertedUser.email}
   Account: ${upsertedAccount.providerId}: ${upsertedAccount.accountId}`);
  }
}

main()
  .then(async () => {
    devlog.info("\n 🏁 Seeding complete");
    await prisma.$disconnect();
  })
  .catch(async (error: Prisma.PrismaClientKnownRequestError) => {
    devlog.error(error);
    devlog.error("\n 🔴 [ERROR] Seeding failed");
    await prisma.$disconnect();
    process.exit(1);
  });
