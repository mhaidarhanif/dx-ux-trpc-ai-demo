import { useNavigation } from "react-router";

export function useIsLoading(): boolean {
  const navigation = useNavigation();
  return navigation.state === "loading";
}
