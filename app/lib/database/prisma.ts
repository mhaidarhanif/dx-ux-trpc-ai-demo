import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@/generated/prisma/client";

/**
 * Enable custom adapter, ONLY if not using Prisma Accelerate
 * Then make sure to ONLY use normal `prisma generate`
 */
// import { PrismaPg } from "@prisma/adapter-pg";
// const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["query"],
  }).$extends(withAccelerate());
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Access NODE_ENV directly without Zod
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
