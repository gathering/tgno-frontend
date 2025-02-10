export interface MinimalApiPage {
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
}

export interface PaginatedResponse<T> {
  meta: {
    total_count: number;
  };
  items: T[];
}
