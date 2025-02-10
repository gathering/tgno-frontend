import type {
  FaqPage,
  FetchInfoPageChildrenResponse,
  InfoPage,
} from "../types";
import { typedFetch } from "./fetching";

export const fetchInfoPageByPath = async ({
  apiUrl,
  path,
}: {
  apiUrl: string;
  path?: string;
}): Promise<InfoPage | undefined> => {
  const response = await typedFetch<InfoPage>(
    `${apiUrl}api/v2/info/find?html_path=${path}`,
    {
      redirect: "follow",
    },
  );
  const page = await response.json();

  return !page || !response.ok ? undefined : page;
};
