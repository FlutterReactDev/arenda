import { Item, LatLong } from "./types";

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

export function getItemByCoords(coordinates: LatLong, items: Item[]) {
  const { latitude, longitude } = coordinates;

  if (coordinates && items?.length != 0) {
    return items?.filter((item) => {
      return item.point.lat == latitude && item.point.lon == longitude;
    })[0];
  }

  return undefined;
}

export function parsePolygon(polygon: string) {
  const coords = polygon
    .replace("POLYGON", "")
    .replace("((", "")
    .replace("))", "")
    .replace("(", "")
    .replace(")", "");

  return coords.split(",").map((coord) => {
    return [Number(coord.split(" ")[0]), Number(coord.split(" ")[1])];
  });
}

export function distance(latlng1: LatLong, latlng2: LatLong) {
  const EARTH_RADIUS = 6371000;
  const rad = Math.PI / 180,
    lat1 = latlng1.latitude * rad,
    lat2 = latlng2.latitude * rad,
    sinDLat = Math.sin(((latlng2.latitude - latlng1.latitude) * rad) / 2),
    sinDLon = Math.sin(((latlng2.longitude - latlng1.longitude) * rad) / 2),
    a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon,
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS * c;
}
