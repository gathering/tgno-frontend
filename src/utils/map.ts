/**
 * Be very careful to not import leaflet as it crashes if used server side. For
 * any client side utils prefer just dumping them in the TgMap component
 * itself, in a script tag
 */
import type { MapItem, PartialMapItem } from "../types";

export const slugifyMapItemName = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "-");

export const isMapItem = (item: PartialMapItem | MapItem): item is MapItem =>
  !!item.name && !!item.width && !!item.height && !!(item as MapItem)?.pos;

export const calculateRow = (
  items: Array<PartialMapItem | MapItem>,
): MapItem[] => {
  const newItems: MapItem[] = [];

  items.forEach((item, i) => {
    if (isMapItem(item)) {
      newItems.push(item);
      return;
    }
    const pos = newItems[newItems.length - 1]?.pos || [0, 0];

    newItems.push({
      ...item,
      pos: [pos[0] + items[i - 1]?.width || 0, pos[1]],
    });
  });

  return newItems;
};

export type Cords = [number, number];

export const isCords = (possibleCords: unknown): possibleCords is Cords =>
  Array.isArray(possibleCords) &&
  possibleCords.length === 2 &&
  typeof possibleCords[0] === "number";

export const pad = (amount: number, cords: Cords[]): Cords[] => {
  return [
    [cords[0][0] + amount, cords[0][1] + amount],
    [cords[1][0] - amount, cords[1][1] - amount],
  ];
};
