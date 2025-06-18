export function convertToCurrency(amount: number | null | undefined) {
  if (!amount) return "0";

  return new Intl.NumberFormat("en-US", {}).format(amount);
}
