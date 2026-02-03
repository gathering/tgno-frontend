import type { Image } from "./images";
import type { MinimalApiPage, PaginatedResponse } from "./utils";

export interface FaqSnippet {
  title: string;
  body?: string;
  url: string;
}

export interface InfoPageSnippet {
  title: string;
  url: string;
  show_in_menus?: boolean;
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
  main_image?: Image;
}

export interface FaqPage extends MinimalApiPage {
  title: string;
  body?: string;
}

export interface FetchInfoPageChildrenResponse extends PaginatedResponse<
  FaqPage | InfoPage
> {}
