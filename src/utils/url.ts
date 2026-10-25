import { UTM_PARAMS } from "@/constants/site";

export function trackedUrl(url: string): string {
  const tracked = new URL(url);
  for (const [key, value] of Object.entries(UTM_PARAMS)) tracked.searchParams.set(key, value);
  return tracked.toString();
}
