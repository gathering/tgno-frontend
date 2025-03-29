export interface MapItem extends PartialMapItem {
  pos: [number, number];
}

export interface PartialMapItem {
  slug?: string;
  name: string;
  icon: string;
  target?: unknown;
  width: number;
  height: number;
  presentation?: Record<string, string | number | Object>;
}
