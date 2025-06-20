import { useNavigation } from "react-router";

export function useIsLoading() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return isLoading;
}
