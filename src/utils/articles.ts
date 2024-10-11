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
  main_image?: {
    title: string;
    alt: string;
    url: string;
    sizes: {
      thumbnail: {
        url: string;
        width: number;
        height: number;
      };
      small: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      large: {
        url: string;
        width: number;
        height: number;
      };
      extra_large: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
}

export interface FetchArticlesProps {
  api_url: string;
  limit?: number;
  offset?: number;
  tags?: string[];
}

export const fetchArticles = async ({
  api_url,
  tags = [],
  limit = 6,
  offset = 0,
}: FetchArticlesProps): Promise<Article[]> => {
  const url = new URL(`${api_url}api/v2/news/`);
  url.searchParams.set("fields", "title,tags,first_published_at,main_image");
  url.searchParams.set("limit", limit.toString(10));
  url.searchParams.set("offset", offset.toString(10));
  url.searchParams.set("order", "-first_published_at");

  if (tags?.length) {
    url.searchParams.set("tags", tags.join(","));
  }

  const response = await fetch(url.toString());
  const data = await response.json();
  const articles: Article[] = data.items;
  return articles;
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
