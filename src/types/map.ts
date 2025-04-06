export interface MapItem extends PartialMapItem {
  pos: [number, number];
}

export interface PartialMapItem {
  slug?: string;
  name: string;
  icon: string;
  width: number;
  height: number;
  presentation?: {
    type: "stage" | "stand" | "unknown";
    interactive?: boolean;
    calendarQuery?: string[];
    padding?: number;
  };
}
