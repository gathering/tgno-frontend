import type { Image } from "./images";

export interface Article {
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
  contributors: Array<{
    id: number;
    name: string;
    contribution_type: string;
    image?: string;
  }>;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  main_image?: Image;
}
