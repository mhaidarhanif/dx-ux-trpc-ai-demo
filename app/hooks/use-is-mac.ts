import { useEffect, useState } from "react";

export function useIsMac(): boolean {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"));
  }, []);

  return isMac;
}
