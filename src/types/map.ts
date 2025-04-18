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
    /**
     * Control if item should show up in overall map navigation
     */
    showInNavigation?: boolean;
    /**
     * Control if item should show detail popup when focused
     */
    showPopup?: boolean;
    /**
     * Show custom text in popup when clicked
     */
    popupText?: string;
    /**
     * Control if icon should be shown in normal map view
     */
    mapIcon?: boolean;
    type:
      | "stage"
      | "stand"
      | "food"
      | "attraction"
      | "hygiene"
      | "placeholder"
      | "unknown";
    interactive?: boolean;
    /**
     * List of calendar tags to filter by to show relevant events
     */
    calendarQuery?: string[];
    padding?: number;
    /**
     * "Always" show label on map irregardless of zoom level
     */
    stickyLabel?: boolean;
    /**
     * Override automatic label width calculation to visually center, if needed
     */
    labelWidth?: number;
  };
}
