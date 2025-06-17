import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { authClient } from "@/utils/auth/client";

export default function SignOutRoute() {
  const navigate = useNavigate();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/signin");
        },
      },
    });
  };

  return (
    <div className="px-6 sm:px-0 max-w-sm min-h-screen mx-auto flex items-center justify-center">
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
