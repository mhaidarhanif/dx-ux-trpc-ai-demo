import { z } from "zod/v4";

export const CountryDataSchema = z.object({
  alpha2: z.string(),
  alpha3: z.string(),
  countryCallingCodes: z.array(z.string()),
  currencies: z.array(z.string()),
  emoji: z.string().optional(),
  ioc: z.string(),
  languages: z.array(z.string()),
  name: z.string(),
  status: z.string(),
});

export type CountryData = z.infer<typeof CountryDataSchema>;
