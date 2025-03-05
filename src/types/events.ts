export interface ApiEvent {
  id: number;
  title: string;
  description: string;
  start: string;
  end: string;
  cancelled: boolean;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
    type: "category" | "location" | "misc";
    parent?: string;
  }>;
}

export interface Event extends ApiEvent {
  facts: {
    immediate: Boolean;
    sameDay: Boolean;
    ended: Boolean;
    extendingQuery: "none" | "start" | "end" | "both";
  };
  strings: {
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    duration: string;
  };
}

export type FetchEventsResponse = ApiEvent[];
