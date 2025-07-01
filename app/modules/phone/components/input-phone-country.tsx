/**
 * Phone Input
 *
 * https://shadcn-country-dropdown.vercel.app/phone-input
 */

import { lookup } from "country-data-list";
import parsePhoneNumber from "libphonenumber-js";
import { forwardRef, useEffect, useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { Icons } from "@/lib/icons";
import { devlog } from "@/lib/logger";
import { cn } from "@/lib/utils";
import type { CountryData } from "@/modules/country/country-schema";

interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onCountryChange?: (data: CountryData | undefined) => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  defaultCountry?: string;
  className?: string;
  inline?: boolean;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      onCountryChange,
      onChange,
      value,
      placeholder,
      defaultCountry,
      inline = false,
      ...props
    },
    ref
  ) => {
    const [_countryData, setCountryData] = useState<CountryData | undefined>();
    const [displayFlag, setDisplayFlag] = useState<string>("");
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
      if (defaultCountry) {
        const newCountryData = lookup.countries({
          alpha2: defaultCountry.toLowerCase(),
        })[0];
        setCountryData(newCountryData);
        setDisplayFlag(defaultCountry.toLowerCase());

        if (
          !hasInitialized &&
          newCountryData?.countryCallingCodes?.[0] &&
          !value
        ) {
          const syntheticEvent = {
            target: {
              value: newCountryData.countryCallingCodes[0],
            },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange?.(syntheticEvent);
          setHasInitialized(true);
        }
      }
    }, [defaultCountry, onChange, value, hasInitialized]);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      // Ensure the value starts with "+"
      if (!newValue.startsWith("+")) {
        // Replace "00" at the start with "+" if present
        if (newValue.startsWith("00")) {
          newValue = `+${newValue.slice(2)}`;
        } else {
          // Otherwise just add "+" at the start
          newValue = `+${newValue}`;
        }
      }

      try {
        const parsed = parsePhoneNumber(newValue);

        devlog.info("Phone number details:", {
          isPossible: parsed?.isPossible(),
          isValid: parsed?.isValid(),
          country: parsed?.country,
          nationalNumber: parsed?.nationalNumber,
          formatNational: parsed?.formatNational(),
          formatInternational: parsed?.formatInternational(),
          getType: parsed?.getType(),
          countryCallingCode: parsed?.countryCallingCode,
          getURI: parsed?.getURI(),
          parsed,
        });

        if (parsed?.country) {
          // Update flag first
          const countryCode = parsed.country;

          devlog.info("Setting flag to:", countryCode.toLowerCase());

          // Force immediate update
          setDisplayFlag(""); // Clear first
          setTimeout(() => {
            setDisplayFlag(countryCode.toLowerCase()); // Then set new value
          }, 0);

          // Update other state
          const countryInfo = lookup.countries({ alpha2: countryCode })[0];
          setCountryData(countryInfo);
          onCountryChange?.(countryInfo);

          // Update input value
          const syntheticEvent = {
            ...e,
            target: {
              ...e.target,
              value: parsed.number,
            },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange?.(syntheticEvent);
        } else {
          onChange?.(e);
          setDisplayFlag("");
          setCountryData(undefined);
          onCountryChange?.(undefined);
        }
      } catch (error) {
        devlog.error("Error parsing phone number:", error);
        onChange?.(e);
        setDisplayFlag("");
        setCountryData(undefined);
        onCountryChange?.(undefined);
      }
    };

    const inputClasses = cn(
      "relative flex h-9 items-center gap-2 rounded-md border border-input bg-transparent pl-3 text-base shadow-sm transition-colors [interpolate-size:allow-keywords] disabled:cursor-not-allowed disabled:opacity-50 has-[input:focus]:outline-none has-[input:focus]:ring-1 has-[input:focus]:ring-ring md:text-sm",
      inline && "w-full rounded-l-none",
      className
    );

    return (
      <div className={inputClasses}>
        {!inline && (
          <div className="h-4 w-4 shrink-0 rounded-full">
            {displayFlag ? (
              <CircleFlag countryCode={displayFlag} height={16} />
            ) : (
              <Icons.Globe size={16} />
            )}
          </div>
        )}
        <input
          autoComplete="tel"
          className={cn(
            "flex h-9 w-full border-none bg-transparent p-0 py-1 text-base leading-none outline-none transition-colors [interpolate-size:allow-keywords] placeholder:text-muted-foreground md:text-sm",
            className
          )}
          name="phone"
          onChange={handlePhoneChange}
          placeholder={placeholder || "Enter number"}
          ref={ref}
          type="tel"
          value={value}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
