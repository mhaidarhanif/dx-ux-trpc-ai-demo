import type { User } from "@/generated/prisma/client";

type SeedUser = Pick<User, "name" | "username" | "email" | "emailVerified"> & {
  password: string;
};

export const dataSeedUsers: SeedUser[] = [
  {
    name: "Example",
    username: "example",
    email: "example@example.com",
    emailVerified: true,
    password: "exampleexampleexample",
  },
];
