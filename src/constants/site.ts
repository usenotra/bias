export const REPO_URL = "https://github.com/usenotra/web-mcp";
export const EVALS_URL = "https://github.com/usenotra/web-mcp/tree/main/evals";
export const SITE_REPO_URL = "https://github.com/usenotra/bias";
export const NOTRA_URL = "https://www.usenotra.com";

export const SITE_TITLE = "Bias, web search that tells your agent who is behind every page";
export const SITE_DESCRIPTION =
  "An MCP server for web search and fetch on top of Exa, Firecrawl and context.dev that scores every page it reads for commercial and political bias.";

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
cd web-mcp && npm install && npm run build`;

export const MCP_CONFIG = `{
  "mcpServers": {
    "bias": {
      "command": "node",
      "args": ["/path/to/web-mcp/dist/index.js"],
      "env": {
        "EXA_API_KEY": "...",
        "FIRECRAWL_API_KEY": "...",
        "CONTEXT_DEV_API_KEY": "...",
        "ANTHROPIC_API_KEY": "..."
      }
    }
  }
}`;

export const STEPS = [
  "The server searches for the publisher's owner, parent company, funding and political ties, and keeps the result for that domain so the next page from the same site skips the search.",
  "Claude Haiku 5.5 reads the page, the research results and the reader's intent if you pass one, and returns a score, a reason and a list of sources as structured JSON.",
  "The server removes any source URL that was not in the material the model received, so every source in the answer points to something the model actually read.",
  "Documentation, specs and changelogs come back with applicable set to false and a null score, because a reference page has no conclusion to push.",
];

export const CASES = [
  {
    title: "Commercial bias",
    body: "A software vendor that publishes a list of the best tools in its own category and ranks itself first gets a score close to 1, with the ranking quoted as evidence.",
  },
  {
    title: "Political bias",
    body: "A news site funded by a political party gets a high score when it covers that party's opponents, and the reason names the funder and links to where the research found it.",
  },
];

export const PROVIDERS = [
  { name: "Exa", url: "https://exa.ai", logo: "/logos/exa.svg", className: "h-5.5" },
  { name: "Firecrawl", url: "https://www.firecrawl.dev", logo: "/logos/firecrawl.svg", className: "h-6" },
  { name: "context.dev", url: "https://www.context.dev", logo: "/logos/context.svg", className: "h-8" },
];
