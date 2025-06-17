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
    <div className="flex items-center justify-center ">
      <section className="p-10">
        <Button onClick={() => signOut()}>Sign Out</Button>
      </section>
    </div>
  );
}
