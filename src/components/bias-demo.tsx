import { ClaudeCodeHeader } from "@/components/claude-code/components/claude-code-header";
import { ClaudeCodeMessage } from "@/components/claude-code/components/claude-code-message";
import { ClaudeCodeTurnSummary } from "@/components/claude-code/components/claude-code-status";
import { ClaudeCodeTerminal } from "@/components/claude-code/components/claude-code-terminal";
import { ClaudeCodeToolCall } from "@/components/claude-code/components/claude-code-tool-call";
import {
  DEMO_ANSWER,
  DEMO_HEADER,
  DEMO_PROMPT,
  DEMO_SUMMARY,
  DEMO_TOOL_CALLS,
} from "@/constants/demo";

export default function BiasDemo() {
  return (
    <ClaudeCodeTerminal className="text-left" title="claude · ~/app">
      <ClaudeCodeHeader {...DEMO_HEADER} />
      <ClaudeCodeMessage from="user">{DEMO_PROMPT}</ClaudeCodeMessage>
      {DEMO_TOOL_CALLS.map((call) => (
        <ClaudeCodeToolCall
          arg={call.arg}
          defaultOpen={call.id === "fetch-list"}
          key={call.id}
          result={call.result}
          status={call.status}
          tool={call.tool}
        >
          {call.detail}
        </ClaudeCodeToolCall>
      ))}
      <ClaudeCodeMessage>{DEMO_ANSWER}</ClaudeCodeMessage>
      <ClaudeCodeTurnSummary {...DEMO_SUMMARY} />
    </ClaudeCodeTerminal>
  );
}
