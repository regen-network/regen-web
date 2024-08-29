export const getLongLat = (value: string) => {
  const isCoordinates =
    /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(
      value,
    );
  if (isCoordinates) {
    const [latitude, longitude] = value.split(',').map(Number) as [
      number,
      number,
    ];
    // mapbox reverse geocoding service and geojson use this order
    return [longitude, latitude];
  }
  return;
};
