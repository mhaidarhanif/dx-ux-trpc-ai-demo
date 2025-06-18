import { Prisma } from "@prisma/client";

export function convertDecimalToNumber(
  value: Prisma.Decimal | null
): number | undefined {
  return value === null ? undefined : new Prisma.Decimal(value).toNumber();
}

export function convertNumberToDecimal(
  value: number | undefined
): Prisma.Decimal | null {
  return value === undefined ? null : new Prisma.Decimal(value);
}
