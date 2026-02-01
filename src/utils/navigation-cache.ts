import NodeCache from "node-cache";
import type { NavItem } from "../types";
import { fetchInfoPageByPath } from "../utils";

// Cache with 5 minute TTL (300 seconds), consistent with events cache
const cache = new NodeCache({ stdTTL: 300 });

const CACHE_KEY = "navigation-items";

export async function getCachedNavigationItems(
  apiUrl: string,
): Promise<NavItem[]> {
  // Check if cached data exists
  const cachedItems = cache.get<NavItem[]>(CACHE_KEY);
  if (cachedItems) {
    console.debug("Using cached navigation items");
    return cachedItems;
  }

  console.debug("Fetching fresh navigation items");

  // Base navigation structure
  const items: NavItem[] = [
    {
      title: "Aktuelt",
      path: "/news",
    },
    {
      title: "Om TG",
      path: "/about",
      items: [
        { title: "Bli utstiller", path: "/about/expo" },
        { title: "Bli sponsor", path: "/about/sponsor" },
      ],
    },
    {
      title: "Praktisk",
      path: "/practical",
      items: [
        { title: "Arrangementsregler", path: "/event/rules" },
        { title: "Konstruksjonsregler", path: "/event/construction-rules" },
      ],
    },
    {
      title: "Billetter",
      path: "/tickets",
      items: [
        { title: "Vilkår", path: "/tickets/terms-and-conditions" },
        { title: "Arrangementsregler", path: "/event/rules" },
        { title: "Konstruksjonsregler", path: "/event/construction-rules" },
      ],
    },
    {
      title: "Konkurranser",
      items: [
        { title: "Kreative", path: "/competitions/creative" },
        { title: "Esport", path: "/competitions/esport" },
      ],
    },
    { title: "Kontakt oss", path: "/contact" },
  ];

  // Fetch dynamic items from API
  try {
    const { pages } = await fetchInfoPageByPath({
      path: "/practical",
      apiUrl,
    });

    if (pages) {
      items
        .find((item) => item.title === "Praktisk")
        ?.items?.unshift(
          ...pages
            .filter(({ show_in_menus }) => !!show_in_menus)
            .map(({ title, url }) => ({
              title,
              path: url,
            })),
        );
    }
  } catch (error) {
    console.error("Failed to fetch dynamic navigation items:", error);
    // Continue with base items if API call fails
  }

  // Store in cache
  cache.set(CACHE_KEY, items);

  return items;
}

// Optional: Function to manually clear the cache
export function clearNavigationCache(): void {
  cache.del(CACHE_KEY);
  console.debug("Navigation cache cleared");
}
