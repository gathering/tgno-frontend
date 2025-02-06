import type { MinimalApiPage } from "./utils";

export interface InfoPage extends MinimalApiPage {
  meta: {
    url: string;
  } & MinimalApiPage["meta"];
}
export interface FaqPage extends MinimalApiPage {
  meta: {
    url: string;
  } & MinimalApiPage["meta"];
}
export interface FaqEntry extends MinimalApiPage {}
