import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod/v4";

export const PhoneNumberSchema = z.string().refine((value) => {
  try {
    return isValidPhoneNumber(value);
  } catch {
    return false;
  }
}, "Invalid phone number");

export type PhoneNumber = z.infer<typeof PhoneNumberSchema>;
