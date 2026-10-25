import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const pages = ["/"].map((path) => new URL(path, site).toString());
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((loc) => `  <url><loc>${loc}</loc></url>`).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
