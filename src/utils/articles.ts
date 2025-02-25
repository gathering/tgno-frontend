import type {
  Article,
  Contributor,
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
  url.searchParams.set(
    "fields",
    "title,tags,first_published_at,custom_published_at,main_image",
  );
  url.searchParams.set("limit", limit.toString(10));
  url.searchParams.set("offset", offset.toString(10));

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

const I18N: Record<string, Record<string, string>> = {
  no: {
    photography: "Fotografi",
    photo: "Foto",
    text: "Tekst",
    video: "Video",
    audio: "Audio",
    illustration: "Illustrasjon",
    animation: "Animasjon",
    code: "Kode",
    design: "Design",
  },
};

export const localizeContributor = (
  contributor: Contributor,
  targetLocale = "no",
): Contributor => ({
  ...contributor,
  contribution_type:
    I18N[targetLocale]?.[contributor.contribution_type.toLowerCase()] ||
    contributor.contribution_type,
});

export const noLocalizeContributor = (contributor: Contributor) =>
  localizeContributor(contributor, "no");
