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

// TODO: cache results to avoid unnecessary fetches when navigating between pages
export const fetchCompetitionPageBySlug = async ({
  api_url,
  path,
}: {
  api_url: string;
  path?: string;
}): Promise<CompetitionPage | undefined> => {
  const response = await typedFetch<CompetitionPage>(
    `${api_url}api/v2/competitions/find?html_path=${path}`,
    {
      redirect: "follow",
    },
  );

  const page = await response.json().catch((e) => {
    return undefined;
  });

  return !page || !response.ok ? undefined : page;
};

export const getCompetitionsOverview = async ({
  api_url,
  path,
}: {
  api_url: string;
  path: string;
}): Promise<CompetitionOverviewPage | undefined> => {
  // TODO: limit to overview pages only
  const response = await typedFetch<CompetitionOverviewPage>(
    `${api_url}api/v2/competitions/find?html_path=${path}&type=konkurranse.CompetitionCategoryPage`,
    {
      redirect: "follow",
    },
  );

  const page = await response.json().catch((e) => {
    return undefined;
  });

  return !page || !response.ok ? undefined : page;
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
