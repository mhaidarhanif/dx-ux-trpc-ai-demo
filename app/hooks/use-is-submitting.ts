import { useNavigation } from "react-router";

export function useIsSubmitting() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return isSubmitting;
}
