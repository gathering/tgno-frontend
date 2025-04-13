export interface Cords {
  x: number;
  y: number;
}

export interface MapItem extends PartialMapItem {
  pos: Cords;
}

export interface PartialMapItem {
  name: string;
  slug?: string;
  icon?: string;
  width: number;
  height: number;
  polygon?: Cords[];
  presentation?: {
    showInNavigation?: boolean;
    type: "stage" | "stand" | "food" | "placeholder" | "unknown";
    interactive?: boolean;
    calendarQuery?: string[];
    padding?: number;
  };
}
