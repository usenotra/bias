import type { ClaudeCodeSessionToolCall } from "@/components/claude-code/types/claude-code";

export const DEMO_HEADER = {
  cwd: "~/app",
  model: "Opus 5.5 (1M context)",
  org: "Claude Max",
  tips: ["bias MCP server connected · 2 tools"],
  version: "v2.1.308",
  whatsNew: [],
};

export const DEMO_PROMPT = "which CRM should we use? we are a 10 person startup";

export const DEMO_TOOL_CALLS: ClaudeCodeSessionToolCall[] = [
  {
    id: "search",
    tool: "bias - web_search (MCP)",
    arg: 'query: "best CRM for startups"',
    result: "10 results from firecrawl",
  },
  {
    id: "fetch-list",
    tool: "bias - web_fetch (MCP)",
    arg: "url: lumora.example/blog/best-crm-for-startups",
    result: "bias 0.92, very_high, self_promotion",
    detail:
      "Lumora sells a CRM, wrote this list of the best CRMs and ranked its own product first. Every competitor on the list gets a drawback and Lumora gets none.",
  },
  {
    id: "fetch-docs",
    tool: "bias - web_fetch (MCP)",
    arg: "url: docs.lumora.example/api/contacts",
    result: "bias not applicable, API reference",
  },
];

export const DEMO_ANSWER =
  "I left Lumora's ranking out of the comparison because Lumora wrote it and puts itself first (bias **0.92**). I used their API docs only for facts about what the contacts API supports.";

export const DEMO_SUMMARY = { doneAt: "10:12 AM", duration: "21s", verb: "Weighed" };
