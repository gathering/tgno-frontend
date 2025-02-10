import type { FaqPage, InfoPage } from "../types";

export const fetchInfoPageByPath = async ({
  apiUrl,
  path,
}: {
  apiUrl: string;
  path?: string;
}): Promise<InfoPage & { children: InfoPage[] }> => {
  const response = await fetch(`${apiUrl}api/v2/info/find?html_path=${path}`, {
    redirect: "follow",
  });
  const page = await response.json();
  if (!page || !response.ok) {
    throw new Error(`Page "${path}" not found`);
  }

  const children =
    (await fetchInfoPageChildren({
      apiUrl,
      parentId: page.id,
    })) || [];

  return {
    ...page,
    children,
  };
};

export const fetchInfoPageChildren = async ({
  apiUrl,
  parentId,
}: {
  apiUrl: string;
  parentId: number;
}): Promise<Array<InfoPage | FaqPage>> => {
  const response = await fetch(
    `${apiUrl}api/v2/info/?child_of=${parentId}&fields=*`,
  );
  const data = await response.json();
  return data.items || [];
};
