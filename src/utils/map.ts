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

export const units = (units: number) => units * (47.3 / 3);

export function getStandSize(
  width: number,
  height: number,
): {
  width: number;
  height: number;
} {
  return { width: units(width), height: units(height) };
}

export function getStandPolygon(w: number, h: number): Cords[] {
  const width = units(w);
  const height = units(h);
  return [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ];
}

export function calculate(
  items: Array<PartialMapItem | MapItem>,
  direction: "up" | "down" | "left" | "right",
  margin = 0,
): MapItem[] {
  const newItems: MapItem[] = [];

  const isHorizontal = direction === "left" || direction === "right";
  const isPositive = direction === "right" || direction === "up";

  items.forEach((item, index) => {
    if (index === 0) {
      // First item keeps its position
      newItems.push({
        ...item,
        pos: (item as MapItem).pos,
      });
    } else {
      const prevItem = newItems[index - 1];
      const prevPos = prevItem.pos;

      // Calculate spacing based on direction:
      // - Positive direction (right/up): use previous item's size
      // - Negative direction (left/down): use current item's size
      const itemSize = isHorizontal ? item.width : item.height;
      const prevItemSize = isHorizontal ? prevItem.width : prevItem.height;

      const spacing =
        (isPositive ? prevItemSize : itemSize) + margin + (item.margin || 0);

      // Apply spacing in the specified direction
      const offset = isPositive ? spacing : -spacing;

      const pos = isHorizontal
        ? { x: prevPos.x + offset, y: prevPos.y }
        : { x: prevPos.x, y: prevPos.y + offset };

      newItems.push({
        ...item,
        pos,
      });
    }
  });

  return newItems;
}

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
