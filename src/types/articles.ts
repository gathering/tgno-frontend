import type { Image } from "./images";
import type { MinimalApiPage, PaginatedResponse } from "./utils";

export interface Contributor {
  id: number;
  name: string;
  contribution_type: string;
  image?: string;
}

export interface Article extends MinimalApiPage {
  id: number;
  meta: {
    type: string;
    detail_url: string;
    html_url: string;
    slug: string;
    first_published_at: string;
    seo_title: string;
    search_description: string;
    locale?: "en" | "no";
  };
  title: string;
  intro: string;
  body: string;
  contributors: Contributor[];
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  main_image?: Image;
}

export interface FetchArticlesProps {
  api_url: string;
  limit?: number;
  offset?: number;
  tags?: string[];
}

export interface FetchArticlesResponse extends PaginatedResponse<Article> {}
