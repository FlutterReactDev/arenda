import { Item } from "./types";

export function getBoundsOfCoords(coordinates: number[][]) {
  const maxX = coordinates.findIndex(
    (item) => item[0] == Math.max(...coordinates.map((item) => item[0]))
  );

  const maxY = coordinates.findIndex(
    (item) => item[1] == Math.max(...coordinates.map((item) => item[1]))
  );

  const minX = coordinates.findIndex(
    (item) => item[0] == Math.min(...coordinates.map((item) => item[0]))
  );
  const minY = coordinates.findIndex(
    (item) => item[1] == Math.min(...coordinates.map((item) => item[1]))
  );

  return {
    northEast: [maxX, maxY],
    southWest: [minX, minY],
  };
}

export function getItemByCoords(coordinates: number[], items: Item[]) {
  if (coordinates && items?.length != 0) {
    return items?.filter((item) => {
      return (
        item.point.lat == coordinates[1] && item.point.lon == coordinates[0]
      );
    })[0];
  }

  return undefined;
}
