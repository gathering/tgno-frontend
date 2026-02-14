import NodeCache from "node-cache";
import type { Event, FetchEventsResponse, Tag } from "../types";
import { typedFetch } from "./fetching";

/**
 * Experimental cache, ideally we would be able to cache heavily in frontend or
 * edge layer, and purge on backend changes. Most of the time event data will
 * be completely static (similar to articles)
 *
 * TODO: To get this completely correct `facts.ended` should be calculated
 * outside of cached values, for now it will remain a bit off
 */
const cache = new NodeCache({ stdTTL: 300 });

const TAG_TYPE_PRIO = {
  location: 0,
  category: 1,
  meta: 2,
};

type DateOptionWithoutDate = {
  name: string;
  slug: string;
  active?: boolean;
  url?: string;
  color?: string;
  type: "date";
};
type DateOptionWithDate = DateOptionWithoutDate & {
  start: string;
  end: string;
};
export type DateOption = DateOptionWithDate | DateOptionWithoutDate;

export type TagWithMeta = {
  active?: boolean;
  url?: string;
  color?: string;
} & Omit<Tag, "id" | "parent">;

export interface EventQueryProperties {
  date: DateOption;
  tags: string[];
}

export const isDateOption = (entity: unknown): entity is DateOption =>
  (entity as DateOption).type === "date" ||
  !!(entity as DateOptionWithDate).start ||
  !!(entity as DateOptionWithDate).end;

export const isTag = (tag: unknown): tag is TagWithMeta =>
  !isDateOption(tag) && !!(tag as TagWithMeta).type;

export const tagsOfTypes =
  (types: Array<"location" | "category" | "meta">) =>
  (tag?: Partial<TagWithMeta>) =>
    isTag(tag) && types.includes(tag.type || "meta");

export const DEFAULT_DATE_OPTION = {
  slug: "all",
  name: "Alle dager",
  type: "date" as const,
};

export interface Filter {
  date: DateOption;
  locations: string[];
  categories: string[];
}

export interface Navigation {
  dates: DateOption[];
  locations: TagWithMeta[];
  categories: TagWithMeta[];
}

type UrlCreator = (
  entity: TagWithMeta | DateOption,
  currentFilter: Filter,
) => URL;

export class Calendar {
  query: {
    event: number | null;
    date: string | null;
    locations: string[];
    categories: string[];
  } = {
    event: null,
    date: null,
    locations: [],
    categories: [],
  };

  _navigationConfig?: Navigation;
  _navigation?: Navigation;
  _filter?: Filter;
  _events?: Event[];
  _focusedEvent?: Event;

  today: Date;
  todaySlug: string;
  createUrl?: UrlCreator;

  constructor(query: typeof this.query, urlCreator?: UrlCreator) {
    this.query = {
      ...query,
      locations: query.locations.filter(Boolean),
      categories: query.categories.filter(Boolean),
    };
    this.today = new Date();
    this.todaySlug = `${this.today.getFullYear()}-${String(this.today.getMonth() + 1).padStart(2, "0")}-${String(this.today.getDate()).padStart(2, "0")}`;
    this.createUrl = urlCreator;
  }

  getEvents = async () => {
    if (!this._events) {
      const filter = this.getFilter();
      this._events = (
        await fetchEvents({
          date: filter.date,
          tags: [...filter.locations, ...filter.categories],
          api_url: import.meta.env.API_URL,
        })
      ).filter((event) => ["none", "end"].includes(event.facts.extendingQuery));
    }
    return this._events;
  };

  getFocusedEvent = async () => {
    if (!this._focusedEvent && this.query.event && this.query.event > 0) {
      return (await this.getEvents()).find(({ id }) => id === this.query.event);
    }
    return this._focusedEvent;
  };

  getFilter = (): Filter => {
    return (
      this._filter ?? {
        date:
          // Try to use date-slug from url if present
          this.getNavigationConfig().dates.find(
            (f) => f.slug === this.query.date,
          ) ||
          // otherwise try to use today's date
          this.getNavigationConfig().dates.find(
            (f) => f.slug === this.todaySlug,
          ) ||
          // and if that fails use the first filter
          this.getNavigationConfig().dates[0],
        locations: this.query.locations
          // Only allow filtering on locations explicitly listed in navigation
          .filter((location) =>
            this.getNavigationConfig().locations.some(
              (l) => l.slug === location,
            ),
          ),
        categories: this.query.categories,
      }
    );
  };

  isActiveTag = (slug: string) => {
    const filter = this.getFilter();
    return [...filter.categories, ...filter.locations].includes(slug);
  };

  // Shortcut to get tag from navigation, which is what determines allowed filters, active states, etc
  getDecoratedTag = (slugOrTag: string | Tag): TagWithMeta | undefined => {
    const slug = typeof slugOrTag === "string" ? slugOrTag : slugOrTag?.slug;
    const navigationConfig = this.getNavigationConfig();
    return [...navigationConfig.locations, ...navigationConfig.categories].find(
      (navTag) => navTag.slug === slug,
    );
  };

  getNavigation = () => {
    if (!this._navigation) {
      const filter = this.getFilter();
      const tagWithMeta = (tag: TagWithMeta): TagWithMeta => {
        return {
          ...tag,
          ...(this.createUrl
            ? { url: this.createUrl(tag, this.getFilter()).toString() }
            : {}),
          // Only highlight if we actually filter on tag
          active:
            filter.locations.includes(tag.slug) ||
            filter.categories.includes(tag.slug),
        };
      };
      const navigation = this.getNavigationConfig();
      // Add active states to navigation based on current url/filter
      navigation.locations = navigation.locations.map(tagWithMeta);
      navigation.categories = navigation.categories.map(tagWithMeta);
      navigation.dates = navigation.dates.map((date) => ({
        ...date,
        ...(this.createUrl
          ? { url: this.createUrl(date, this.getFilter()).toString() }
          : {}),
        active: filter.date?.slug === date.slug,
      }));
      this._navigation = navigation;
    }

    return this._navigation;
  };

  getNavigationConfig = () => {
    // In the future we could probably fetch this from the API if we really wanted to
    return (this._navigationConfig ??= {
      dates: [
        DEFAULT_DATE_OPTION,
        ...[1, 2, 3, 4, 5].map((date) => {
          // TODO: Adjust timezone to +1 when filtering for dates outside of summer time
          const start = `2026-04-0${date} 00:00+02:00`;
          const end = `2026-04-0${date + 1} 02:00+02:00`;
          return {
            slug: `2026-04-0${date}`,
            name: new Date(start).toLocaleDateString("no-NO", {
              weekday: "long",
              day: "numeric",
            }),
            start,
            end,
            type: "date" as const,
          };
        }),
      ],
      categories: [
        {
          slug: "esport",
          name: "Esport",
          type: "category",
          color: "orange",
        },
        {
          slug: "kreativia",
          name: "Kreativia",
          type: "category",
          color: "blue",
        },
        {
          slug: "konsert",
          name: "Konsert",
          type: "category",
          color: "purple",
        },
        {
          slug: "info",
          name: "Info",
          type: "meta",
          color: "yellow",
        },
      ],
      locations: [
        //{
        //  slug: "hovedscenen",
        //  name: "Hovedscenen",
        //  type: "location",
        //  color: "purple",
        //},
        //{
        //  slug: "kreativiascenen",
        //  name: "Kreativiascenen",
        //  type: "location",
        //  color: "blue",
        //},
        //{
        //  slug: "esportscenen",
        //  name: "Esportscenen",
        //  type: "location",
        //  color: "orange",
        //},
        //{
        //  slug: "lounge",
        //  name: "Lounge",
        //  type: "location",
        //  color: "green",
        //},
      ],
    });
  };
}

export const fetchEvents = async ({
  date,
  tags,
  api_url,
}: EventQueryProperties & {
  api_url: string;
}): Promise<Event[]> => {
  const hasDates = (date: DateOption): date is DateOptionWithDate =>
    !!(date as DateOptionWithDate).start && !!(date as DateOptionWithDate).end;

  const url = new URL(`${api_url}api/v2/program/events`);
  if (hasDates(date)) {
    url.searchParams.set("start", date.start);
    url.searchParams.set("end", date.end);
  }
  if (tags?.length) {
    url.searchParams.set("tags", tags.join(","));
  }

  const cacheKey = `${url.toString()}|events`;
  let events = cache.get<Event[]>(cacheKey);

  if (events) {
    return events;
  }

  const response = await typedFetch<FetchEventsResponse>(url.toString());
  const data = await response.json();
  const pad = (number: number) => String(number).padStart(2, "0");

  events = data.map((event) => {
    const startObj = new Date(event.start);
    const endObj = new Date(event.end);
    const reqStartObj = hasDates(date) ? new Date(date.start) : null;
    const reqEndObj = hasDates(date) ? new Date(date.end) : null;

    const newEvent: Event = {
      ...event,
      tags: event.tags
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => TAG_TYPE_PRIO[a.type] - TAG_TYPE_PRIO[b.type])
        .map((tag) => ({
          ...tag,
          hidden: tag.slug === "meta",
        })),
      facts: {
        immediate: event.start === event.end,
        sameDay: startObj.getDate() === endObj.getDate(),
        ended: Date.now() > endObj.getTime(),
        extendingQuery: "none",
      },
      strings: {
        startTime: `${pad(startObj.getHours())}:${pad(startObj.getMinutes())}`,
        endTime: `${pad(endObj.getHours())}:${pad(endObj.getMinutes())}`,
        startDate: startObj.toLocaleDateString("no-NO", {
          day: "numeric",
          weekday: "long",
        }),
        startDateLong: startObj.toLocaleDateString("no-NO", {
          day: "numeric",
          weekday: "long",
          month: "long",
          year: "numeric",
        }),
        endDate: endObj.toLocaleDateString("no-NO", {
          day: "numeric",
          weekday: "long",
        }),
        duration: `${pad(startObj.getHours())}:${pad(startObj.getMinutes())} - ${pad(endObj.getHours())}:${pad(endObj.getMinutes())}`,
      },
    };

    if (newEvent.facts.immediate) {
      newEvent.strings.duration = `${newEvent.strings.startTime}`;
    }

    if (reqStartObj && reqEndObj) {
      if (endObj.getTime() > reqEndObj.getTime()) {
        newEvent.facts.extendingQuery = "end";
      }
      if (startObj.getTime() < reqStartObj.getTime()) {
        if (newEvent.facts.extendingQuery === "end") {
          newEvent.facts.extendingQuery = "both";
        } else {
          newEvent.facts.extendingQuery = "start";
        }
      }
    }

    return newEvent;
  });

  cache.set(cacheKey, events);

  return events;
};
