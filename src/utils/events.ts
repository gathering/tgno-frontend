import type { Event, FetchEventsResponse } from "../types";
import { typedFetch } from "./fetching";

const TAG_TYPE_PRIO = {
  location: 0,
  category: 1,
  misc: 2,
};

export const fetchEvents = async ({
  start: reqStart,
  end: reqEnd,
  tags,
  api_url,
}: {
  start?: string;
  end?: string;
  tags?: string[];
  api_url: string;
}): Promise<Event[]> => {
  const url = new URL(`${api_url}api/v2/program/events`);
  if (reqStart && reqEnd) {
    url.searchParams.set("start", reqStart);
    url.searchParams.set("end", reqEnd);
  }
  if (tags?.length) {
    url.searchParams.set("tags", tags.join(","));
  }

  const response = await typedFetch<FetchEventsResponse>(url.toString());
  const data = await response.json();
  const pad = (number: number) => String(number).padStart(2, "0");

  return data.map((event) => {
    const startObj = new Date(event.start);
    const endObj = new Date(event.end);
    const reqStartObj = reqStart ? new Date(reqStart) : null;
    const reqEndObj = reqEnd ? new Date(reqEnd) : null;

    const newEvent: Event = {
      ...event,
      tags: event.tags
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => TAG_TYPE_PRIO[a.type] - TAG_TYPE_PRIO[b.type])
        .map((tag) => ({
          ...tag,
          secondary: tag.type !== "location",
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
};
