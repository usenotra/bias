export type ExampleCategory = "saas" | "political";

export interface BiasExample {
  id: string;
  category: ExampleCategory;
  domain: string;
  title: string;
  applicable: boolean;
  minScore: number;
  maxScore: number;
  types: string[];
  reason: string;
}
