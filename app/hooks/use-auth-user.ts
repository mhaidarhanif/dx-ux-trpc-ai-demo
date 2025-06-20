import type { User } from "better-auth/types";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type AuthUser = {
  isAuthenticated: boolean;
  user?: User | null;
};

const authUserAtom = atomWithStorage<AuthUser>("authUser", {
  isAuthenticated: false,
  user: null,
});

export function useAuthUser() {
  return useAtom(authUserAtom);
}
