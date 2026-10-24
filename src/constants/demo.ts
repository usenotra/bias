import type { ClaudeCodeSessionToolCall } from "@/components/claude-code/types/claude-code";

export const DEMO_HEADER = {
  cwd: "~/app",
  model: "Opus 5.5 (1M context)",
  org: "Claude Max",
  tips: ["bias MCP server connected · 2 tools"],
  version: "v2.1.308",
  whatsNew: [],
};

export const DEMO_PROMPT = "which payments provider should we use for our SaaS?";

export const DEMO_TOOL_CALLS: ClaudeCodeSessionToolCall[] = [
  {
    id: "search",
    tool: "bias - web_search (MCP)",
    arg: 'query: "best payments provider for SaaS"',
    result: "10 results from exa, firecrawl and context",
  },
  {
    id: "fetch-list",
    tool: "bias - web_fetch (MCP)",
    arg: "url: northwind.example/blog/top-5-payment-providers",
    result: "bias 0.95, very_high, self_promotion",
    detail:
      "Northwind Payments publishes this list and ranks its own product first. The page reads like a neutral comparison, but the publisher research shows Northwind sells the product it recommends.",
  },
  {
    id: "fetch-docs",
    tool: "bias - web_fetch (MCP)",
    arg: "url: docs.northwind.example/billing",
    result: "bias not applicable, product documentation",
  },
];

export const DEMO_ANSWER =
  "I left the Northwind ranking out of the comparison because Northwind wrote it and puts itself in first place (bias **0.95**). Their docs page is documentation, so I used it only for facts about how their subscription billing works.";

export const DEMO_SUMMARY = { doneAt: "10:12 AM", duration: "21s", verb: "Weighed" };
