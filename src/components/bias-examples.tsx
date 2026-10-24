import { Building2, Landmark } from "lucide-react";
import { useState } from "react";
import {
  IconTabs,
  IconTabsContent,
  IconTabsList,
  IconTabsTrigger,
} from "@/components/icon-tabs/components/icon-tabs";
import { EXAMPLES, EXAMPLE_TABS } from "@/constants/examples";
import { cn } from "@/lib/utils";
import type { BiasExample, ExampleCategory } from "@/types/example";
import { formatRange, rangeTone } from "@/utils/example";

const TAB_ICONS: Record<ExampleCategory, typeof Building2> = {
  saas: Building2,
  political: Landmark,
};

function ScoreRange({ example }: { example: BiasExample }) {
  if (!example.applicable) {
    return <p className="text-muted-foreground font-mono text-xs">score: null</p>;
  }
  return (
    <div className="flex items-center gap-3">
      <div className="bg-muted relative h-1.5 flex-1 overflow-hidden rounded-full">
        <div
          className={cn("absolute inset-y-0 rounded-full", rangeTone(example.minScore))}
          style={{
            left: `${example.minScore * 100}%`,
            width: `${Math.max(2, (example.maxScore - example.minScore) * 100)}%`,
          }}
        />
      </div>
      <p className="text-muted-foreground shrink-0 font-mono text-xs tabular-nums">{formatRange(example)}</p>
    </div>
  );
}

function ExampleCard({ example }: { example: BiasExample }) {
  return (
    <article className="bg-background flex flex-col gap-4 rounded-2xl border p-5 shadow-xs">
      <div>
        <p className="text-muted-foreground font-mono text-xs">{example.domain}</p>
        <h3 className="mt-1.5 font-medium text-pretty">{example.title}</h3>
      </div>
      <ScoreRange example={example} />
      <p className="text-muted-foreground text-sm text-pretty">{example.reason}</p>
      {example.types.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1.5">
          {example.types.map((type) => (
            <span className="bg-muted rounded-md px-2 py-0.5 font-mono text-xs" key={type}>
              {type}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export default function BiasExamples() {
  const [tab, setTab] = useState<ExampleCategory>("saas");

  return (
    <IconTabs onValueChange={(value) => setTab(value as ExampleCategory)} value={tab}>
      <IconTabsList className="mx-auto" value={tab}>
        {EXAMPLE_TABS.map(({ value, label }) => {
          const Icon = TAB_ICONS[value];
          return (
            <IconTabsTrigger icon={<Icon className="size-4" />} key={value} value={value}>
              {label}
            </IconTabsTrigger>
          );
        })}
      </IconTabsList>
      {EXAMPLE_TABS.map(({ value }) => (
        <IconTabsContent className="mt-8" key={value} value={value}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXAMPLES.filter((e) => e.category === value).map((example) => (
              <ExampleCard example={example} key={example.id} />
            ))}
          </div>
        </IconTabsContent>
      ))}
    </IconTabs>
  );
}
