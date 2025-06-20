import { SiGithub } from "@icons-pack/react-simple-icons";
import { Anchor } from "@/components/shared/anchor";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function GitHubLink() {
  return (
    <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
      <Anchor href={siteConfig.links.github}>
        <SiGithub />
      </Anchor>
    </Button>
  );
}
