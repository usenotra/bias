# bias.usenotra.com

This repository holds the landing page for Bias, the MCP server that runs web search and fetch through Exa, Firecrawl and Context.dev and scores every fetched page for bias. The site is built with Astro and the [Notra UI](https://ui.usenotra.com) components, and it runs on Cloudflare Workers at [bias.usenotra.com](https://bias.usenotra.com).

## Develop

```bash
pnpm install
pnpm dev
```

## Deploy

```bash
pnpm run deploy
```

The deploy script builds the site and runs `wrangler deploy`, which uploads `dist` as static assets and binds the Worker to the `bias.usenotra.com` custom domain.
