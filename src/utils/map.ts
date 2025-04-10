/**
 * Be very careful to not import leaflet as it crashes if used server side. For
 * any client side utils prefer just dumping them in the TgMap component
 * itself, in a script tag
 */
import type { MapItem, PartialMapItem, Cords } from "../types";

export const slugifyMapItemName = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "-");

export const isMapItem = (item: PartialMapItem | MapItem): item is MapItem =>
  !!item.name && !!item.width && !!item.height && !!(item as MapItem)?.pos;

// Ex. "3"
export const stringToSize = (sizeString: string) =>
  parseInt(sizeString || "1") * (47.3 / 3);
// Ex. "3x3"
export function getStandSize(sizeString: string): {
  width: number;
  height: number;
} {
  const [width = stringToSize("1"), height = stringToSize("1")] = sizeString
    .split("x")
    .map(stringToSize);
  return { width, height };
}

export function getStandPolygon(sizeString: string): Cords[] {
  const { width, height } = getStandSize(sizeString);
  return [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ];
}

export function calculateColumn(
  items: Array<PartialMapItem | MapItem>,
  direction: "up" | "down" = "down",
): MapItem[] {
  const newItems: MapItem[] = [];

  items.forEach((item, i) => {
    if (isMapItem(item)) {
      newItems.push(item);
      return;
    }
    const previousItem = newItems[newItems.length - 1];
    const yOffset =
      direction === "down" ? item.height * -1 : previousItem.height;

    newItems.push({
      ...item,
      pos: {
        x: previousItem.pos.x,
        y: previousItem.pos.y + yOffset,
      },
    });
  });

  return newItems;
}

export const calculateRow = (
  items: Array<PartialMapItem | MapItem>,
  direction: "right" | "left" = "right",
): MapItem[] => {
  const newItems: MapItem[] = [];

  items.forEach((item, i) => {
    if (isMapItem(item)) {
      newItems.push(item);
      return;
    }

    const previousItem = newItems[newItems.length - 1];
    const xOffset = direction === "left" ? item.width * -1 : previousItem.width;

    newItems.push({
      ...item,
      pos: {
        x: previousItem.pos.x + xOffset,
        y: previousItem.pos.y,
      },
    });
  });

  return newItems;
};

export function rotateCords(center: Cords, points: Cords[], yaw: number) {
  const res = [];
  const centerPoint = center;
  const angle = yaw * (Math.PI / 180);
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    // translate to center
    const p2 = { y: p.y - centerPoint.y, x: p.x - centerPoint.x };
    // rotate using matrix rotation
    const p3 = {
      y: Math.cos(angle) * p2.y - Math.sin(angle) * p2.x,
      x: Math.sin(angle) * p2.y + Math.cos(angle) * p2.x,
    };
    // translate back to center
    let p4 = { y: p3.y + centerPoint.y, x: p3.x + centerPoint.x };
    // done with that point
    res.push(p4);
  }
  return res;
}

export const toLatLngTuple = (cords: Cords): L.LatLngTuple => [
  cords.y,
  cords.x,
];

export const pad = (amount: number, cords: [Cords, Cords]): [Cords, Cords] => [
  {
    x: cords[0].x + amount,
    y: cords[0].y + amount,
  },
  {
    x: cords[1].x - amount,
    y: cords[1].y - amount,
  },
];
