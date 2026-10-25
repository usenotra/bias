"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { ClaudeCodeHeader } from "@/components/claude-code/components/claude-code-header";
import { ClaudeCodeMessage } from "@/components/claude-code/components/claude-code-message";
import { ClaudeCodeSpinner, ClaudeCodeTurnSummary } from "@/components/claude-code/components/claude-code-status";
import { ClaudeCodeTerminal } from "@/components/claude-code/components/claude-code-terminal";
import { ClaudeCodeToolCall } from "@/components/claude-code/components/claude-code-tool-call";
import { renderClaudeCodeInline } from "@/components/claude-code/lib/claude-code-inline";
import {
  DEMO_ANSWER,
  DEMO_HEADER,
  DEMO_PROMPT,
  DEMO_SUMMARY,
  DEMO_TIMING,
  DEMO_TOOL_CALLS,
} from "@/constants/demo";

const ANSWER_WORDS = DEMO_ANSWER.split(/(?<= )/);

interface Playback {
  promptChars: number;
  toolsShown: number;
  toolsDone: number;
  answerWords: number;
  done: boolean;
}

const START: Playback = { promptChars: 0, toolsShown: 0, toolsDone: 0, answerWords: 0, done: false };

const FINAL: Playback = {
  promptChars: DEMO_PROMPT.length,
  toolsShown: DEMO_TOOL_CALLS.length,
  toolsDone: DEMO_TOOL_CALLS.length,
  answerWords: ANSWER_WORDS.length,
  done: true,
};

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

function usePlayback(start: boolean, reduced: boolean) {
  const [playback, setPlayback] = useState(START);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setPlayback(FINAL);
      return;
    }
    let cancelled = false;
    const step = (update: Partial<Playback>) => {
      if (!cancelled) setPlayback((current) => ({ ...current, ...update }));
    };

    const run = async () => {
      for (let chars = 1; chars <= DEMO_PROMPT.length && !cancelled; chars++) {
        step({ promptChars: chars });
        await wait(DEMO_TIMING.typeMs);
      }
      await wait(DEMO_TIMING.submitMs);
      for (let index = 1; index <= DEMO_TOOL_CALLS.length && !cancelled; index++) {
        step({ toolsShown: index });
        await wait(DEMO_TIMING.toolRunMs);
        step({ toolsDone: index });
        await wait(DEMO_TIMING.betweenToolsMs);
      }
      await wait(DEMO_TIMING.beforeAnswerMs);
      for (let words = 1; words <= ANSWER_WORDS.length && !cancelled; words++) {
        step({ answerWords: words });
        await wait(DEMO_TIMING.wordMs);
      }
      step({ done: true });
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [start, reduced]);

  return playback;
}

function Reveal({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <motion.div
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 4 }}
      aria-hidden={!show}
      className={show ? undefined : "pointer-events-none"}
      initial={false}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Streamed({ text, shown }: { text: string; shown: number }) {
  return (
    <>
      {renderClaudeCodeInline(text.slice(0, shown))}
      <span className="invisible">{renderClaudeCodeInline(text.slice(shown))}</span>
    </>
  );
}

export default function BiasDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion() ?? false;
  const playback = usePlayback(inView, reduced);
  const submitted = playback.promptChars === DEMO_PROMPT.length && playback.toolsShown > 0;
  const answerChars = ANSWER_WORDS.slice(0, playback.answerWords).join("").length;

  return (
    <div ref={ref}>
      <ClaudeCodeTerminal className="text-left" title="claude · ~/app">
        <ClaudeCodeHeader {...DEMO_HEADER} />
        <Reveal show={playback.promptChars > 0}>
          <ClaudeCodeMessage from="user">
            <Streamed shown={playback.promptChars} text={DEMO_PROMPT} />
          </ClaudeCodeMessage>
        </Reveal>
        {DEMO_TOOL_CALLS.map((call, index) => (
          <Reveal key={call.id} show={playback.toolsShown > index}>
            <ClaudeCodeToolCall
              arg={call.arg}
              defaultOpen={call.id === "fetch-list"}
              result={playback.toolsDone > index ? call.result : "Running…"}
              status={playback.toolsDone > index ? call.status : "pending"}
              tool={call.tool}
            >
              {call.detail && (playback.toolsDone > index ? call.detail : <span className="invisible">{call.detail}</span>)}
            </ClaudeCodeToolCall>
          </Reveal>
        ))}
        <Reveal show={playback.answerWords > 0}>
          <ClaudeCodeMessage>
            <Streamed shown={answerChars} text={DEMO_ANSWER} />
          </ClaudeCodeMessage>
        </Reveal>
        {playback.done ? (
          <ClaudeCodeTurnSummary {...DEMO_SUMMARY} />
        ) : (
          <Reveal show={submitted}>
            <ClaudeCodeSpinner verb="Weighing" />
          </Reveal>
        )}
      </ClaudeCodeTerminal>
    </div>
  );
}
