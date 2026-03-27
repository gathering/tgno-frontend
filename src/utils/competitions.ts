import NodeCache from "node-cache";
import { typedFetch } from "./fetching";

interface Prize {
  name?: string;
  price?: number | string;
}

type PrizeCategory = Array<Prize>;

export type CreativeCategory =
  | "photo"
  | "video"
  | "graphics"
  | "music"
  | "misc"
  | "physical"
  | "programming";

export interface RuleSet {
  title: string;
  rules: string;
}

export interface CompetitionPage {
  title: string;
  slug: string;
  description?: string;
  category?: {
    name: CreativeCategory;
  };
  rule_sets: Array<RuleSet>;
  prizes: Array<PrizeCategory>;
}

export interface CompetitionOverviewPage {
  title: string;
  slug: string;
  description?: string;
  competitions: Array<CompetitionPage>;
}

// Cache with 5 minute TTL (300 seconds), consistent with navigation cache and events cache
const cache = new NodeCache({ stdTTL: 300 });

export const fetchCompetitionPageBySlug = async ({
  api_url,
  path,
}: {
  api_url: string;
  path?: string;
}): Promise<CompetitionPage | undefined> => {
  let page =
    cache.get<CompetitionPage>(`competition-page-${path}`) || undefined;

  if (!page) {
    const response = await typedFetch<CompetitionPage>(
      `${api_url}api/v2/competitions/find?html_path=${path}`,
      {
        redirect: "follow",
      },
    );

    page = await response.json().catch((_e) => {
      return undefined;
    });

    page = page && response.ok ? page : undefined;
    cache.set(`competition-page-${path}`, page);
  }

  return page;
};

export const getCompetitionsOverview = async ({
  api_url,
  path,
}: {
  api_url: string;
  path: string;
}): Promise<CompetitionOverviewPage | undefined> => {
  let page =
    cache.get<CompetitionOverviewPage>(`competition-overview-page-${path}`) ||
    undefined;

  if (!page) {
    console.debug(`Fetching competition overview page for path: ${path}`);
    const response = await typedFetch<CompetitionOverviewPage>(
      `${api_url}api/v2/competitions/find?html_path=${path}&type=konkurranse.CompetitionCategoryPage`,
      {
        redirect: "follow",
      },
    );
    page = await response.json().catch((_e) => {
      return undefined;
    });

    page = page && response.ok ? page : undefined;
    cache.set(`competition-overview-page-${path}`, page);
  }

  return page;
};

export const getTailwindColorByCategory = (category: CreativeCategory) => {
  const colors: Record<CreativeCategory, string> = {
    photo: "bg-red-500",
    video: "bg-green-500",
    graphics: "bg-sky-500",
    music: "bg-yellow-500",
    misc: "bg-purple-500",
    physical: "bg-indigo-500",
    programming: "bg-pink-500",
  };

  return colors[category] || colors.misc;
};
