export const REPO_URL = "https://github.com/usenotra/bias-mcp";
export const EVALS_URL = "https://github.com/usenotra/bias-mcp/tree/main/evals";
export const SITE_REPO_URL = "https://github.com/usenotra/bias";
export const NOTRA_URL = "https://www.usenotra.com";
export const NOTRA_LOGO_URL = "https://www.usenotra.com/logo-dark.svg";

export const SITE_TITLE = "Bias, web search that tells your agent who is behind every page";
export const SITE_DESCRIPTION =
  "An MCP server for web search and fetch on top of Exa, Firecrawl and Context.dev that scores every page it reads for commercial and political bias.";

export const BIAS_EXAMPLE = `"bias": {
  "applicable": true,
  "score": 0.92,
  "level": "very_high",
  "types": ["self_promotion", "competitor_disparagement"],
  "publisher": "Lumora",
  "favors": ["Lumora CRM"],
  "reason": "Lumora sells a CRM and published this ranking of CRMs, which puts Lumora first and lists a drawback for every competitor.",
  "sources": [
    {
      "url": "https://lumora.example/blog/best-crm-for-startups",
      "evidence": "For almost every startup, Lumora CRM is the clear winner."
    },
    {
      "url": "https://lumora.example/about",
      "evidence": "Lumora builds Lumora CRM, a customer relationship management platform for small teams."
    }
  ]
}`;

export const INSTALL_COMMAND = `git clone ${REPO_URL}
cd bias-mcp && pnpm install && pnpm build`;

export const MCP_CONFIG = `{
  "mcpServers": {
    "bias": {
      "command": "node",
      "args": ["/path/to/bias-mcp/dist/index.js"],
      "env": {
        "FIRECRAWL_API_KEY": "...",
        "NEON_AI_GATEWAY_BASE_URL": "...",
        "NEON_AI_GATEWAY_TOKEN": "..."
      }
    }
  }
}`;

export const STEPS = [
  "The server searches for the publisher's owner, parent company, funding and political ties. It keeps the result for that domain, so the next page from the same site skips the search.",
  "Claude Haiku 5.5 reads the page, the research results and the reader's intent if you pass one. It runs through the AI SDK and returns a score, a reason and a list of sources as structured JSON.",
  "The server removes any source URL that was not in the material the model received, so every source in the answer points to material the model read.",
  "Documentation, specs and changelogs come back with applicable set to false and a null score, because a reference page has no conclusion to push.",
];

export const CASES = [
  {
    title: "Commercial bias",
    body: "A software vendor that publishes a list of the best tools in its own category and ranks itself first gets a score close to 1, with the ranking quoted as evidence.",
  },
  {
    title: "Political bias",
    body: "A news site funded by a political party gets a high score when it covers that party's opponents. The reason names the funder and links to the page where the research found it.",
  },
];

export const PROVIDERS = [
  { name: "Exa", url: "https://exa.ai", logo: "/logos/exa.svg", className: "h-5.5" },
  { name: "Firecrawl", url: "https://www.firecrawl.dev", logo: "/logos/firecrawl.svg", className: "h-6" },
  { name: "Context.dev", url: "https://www.context.dev", logo: "/logos/context.svg", className: "h-8" },
];

export const GATEWAYS = [
  {
    name: "Neon AI Gateway",
    url: "https://neon.com/docs/ai-gateway",
    domain: "neon.com",
    env: ["NEON_AI_GATEWAY_BASE_URL", "NEON_AI_GATEWAY_TOKEN"],
    note: "Both values come from the AI Gateway tab of a Neon branch, or from neon env pull.",
  },
  {
    name: "OpenRouter",
    url: "https://openrouter.ai",
    domain: "openrouter.ai",
    env: ["OPENROUTER_API_KEY"],
    note: "Bias uses OpenRouter when the two Neon values are not both set.",
  },
  {
    name: "Vercel AI Gateway",
    url: "https://vercel.com/ai-gateway",
    domain: "vercel.com",
    env: ["AI_GATEWAY_API_KEY"],
    note: "Bias uses Vercel AI Gateway when neither Neon nor OpenRouter is set.",
  },
];

export const QUOTE = {
  parts: [
    { text: "A few weeks ago at SF Tech Week, I was talking to" },
    { link: { name: "Kaylee", url: "https://www.kaylee.dev", domain: "kaylee.dev" } },
    { text: " from" },
    { link: { name: "Inth", url: "https://inth.com", domain: "inth.com" } },
    {
      text: ", a consent platform. I told her how weird it is that web fetch tools don't come with a bias score and that I think they should. Kaylee agreed and explained her use case, which is checking how AI answers rank competitors for a prompt. The companies in the top 10 lists behind those answers often wrote the lists themselves, and each one ranks itself first. Turning this into an MCP server was her idea too, so full credit to her. So I built it!",
    },
  ],
  author: { name: "Dominik Koch", role: "CEO", company: "@Notra", url: NOTRA_URL, avatar: "/dominik.jpg" },
};
