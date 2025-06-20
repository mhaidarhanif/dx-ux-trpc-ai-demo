import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { authClient } from "@/lib/better-auth-client";

export function useOneTap() {
  const navigate = useNavigate();

  useEffect(() => {
    void authClient.oneTap({
      cancelOnTapOutside: true,
      fetchOptions: {
        onSuccess: () => {
          navigate("/dashboard");
        },
      },
      onPromptNotification: (notification) => {
        toast(
          "Prompt was dismissed or skipped. Consider displaying an alternative sign-in option.",
          notification
        );
      },
    });
  }, [navigate]);
}
