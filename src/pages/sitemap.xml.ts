import { execSync } from "node:child_process";
import type { APIRoute } from "astro";

function lastEdited(): string {
  try {
    return execSync("git log -1 --format=%cI -- src public", { encoding: "utf8" }).trim() || new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
}

export const GET: APIRoute = ({ site }) => {
  const lastmod = lastEdited();
  const pages = ["/"].map((path) => new URL(path, site).toString());
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((loc) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>1.0</priority>\n  </url>`).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
