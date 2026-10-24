import { MarketingButton } from "@/components/marketing-button";
import { REPO_URL } from "@/constants/site";

export default function HeroActions() {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
      <MarketingButton nativeButton={false} render={<a href={REPO_URL} />}>
        View on GitHub
      </MarketingButton>
      <MarketingButton nativeButton={false} render={<a href="#install" />} variant="light">
        Add it to your agent
      </MarketingButton>
    </div>
  );
}
