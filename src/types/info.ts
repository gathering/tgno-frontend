import type { MinimalApiPage } from "./utils";

export interface FaqSnippet {
  title: string;
  body?: string;
  url: string;
}

export interface InfoPageSnippet {
  title: string;
  url: string;
}

export interface InfoPage extends MinimalApiPage {
  meta: {
    url: string;
  } & MinimalApiPage["meta"];
  title: string;
  body?: string;
  intro?: string;
  pages?: InfoPageSnippet[];
  faq?: FaqSnippet[];
}

export interface FaqPage extends MinimalApiPage {
  title: string;
  body?: string;
}
