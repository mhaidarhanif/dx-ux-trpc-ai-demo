/** biome-ignore-all lint/nursery/noAwaitInLoop: "Prisma seed only" */

import { type Prisma, PrismaClient } from "@/generated/prisma/client";
import { devlog } from "@/lib/system/logger";
import { auth } from "@/modules/auth/better-auth";
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
    const { password, ...userItem } = dataUser;

    const existingUser = await prisma.user.findUnique({
      where: { email: userItem.email },
    });
    if (existingUser) {
      devlog.info(
        `ℹ️ User exists: ${existingUser.email} ${existingUser.name} @${existingUser.username}`
      );
      continue;
    }

    try {
      const { user } = await auth.api.signUpEmail({
        body: {
          name: userItem.name,
          email: userItem.email,
          username: userItem.username,
          password,
        },
      });

      devlog.info(`👤 User: ${user.email} ${user.name}`);
    } catch (error) {
      devlog.error("⚠️ Error signing up user:", error);
      break;
    }
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
