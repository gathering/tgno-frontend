import type {
  Article,
  FetchArticlesProps,
  FetchArticlesResponse,
} from "../types";
import { typedFetch } from "./fetching";

export const fetchArticles = async ({
  api_url,
  tags = [],
  limit = 6,
  offset = 0,
}: FetchArticlesProps) => {
  const url = new URL(`${api_url}api/v2/news/`);
  url.searchParams.set("fields", "title,tags,first_published_at,main_image");
  url.searchParams.set("limit", limit.toString(10));
  url.searchParams.set("offset", offset.toString(10));
  url.searchParams.set("order", "-first_published_at");

  if (tags?.length) {
    url.searchParams.set("tags", tags.join(","));
  }

  const response = await typedFetch<FetchArticlesResponse>(url.toString());
  return await response.json();
};

export const fetchArticleIdBySlug = async ({
  slug,
  api_url,
}: {
  slug: string;
  api_url: string;
}): Promise<number | null> => {
  const response = await fetch(`${api_url}api/v2/news/?&slug=${slug}`);
  const data = await response.json();
  const articles: Article[] = data.items;
  if (articles.length > 0) {
    return articles[0].id;
  } else {
    return null;
  }
};

export const fetchArticleById = async ({
  id,
  api_url,
}: {
  id: number;
  api_url: string;
}): Promise<Article> => {
  const response = await fetch(`${api_url}api/v2/news/${id}/?fields=locale`);
  const data = await response.json();
  return data;
};
