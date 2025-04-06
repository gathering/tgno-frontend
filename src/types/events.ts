export interface Tag {
  id: number;
  name: string;
  slug: string;
  type: "category" | "location" | "misc";
  parent?: string;
}
export interface ApiEvent {
  id: number;
  title: string;
  description: string;
  start: string;
  end: string;
  cancelled: boolean;
  related_url: string | null;
  related_page: string | null;
  tags: Tag[];
}

export interface Event extends ApiEvent {
  tags: Tag[];
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
