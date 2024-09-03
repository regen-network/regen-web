const COORDINATES_REGEX =
  /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

const isValidGeoCoordinates = (value: string): boolean =>
  COORDINATES_REGEX.test(value);

export const getLongLat = (value: string) => {
  if (isValidGeoCoordinates(value)) {
    const [latitude, longitude] = value.split(',').map(Number) as [
      number,
      number,
    ];
    // mapbox reverse geocoding service and geojson use this order
    return [longitude, latitude];
  }
  return;
};
