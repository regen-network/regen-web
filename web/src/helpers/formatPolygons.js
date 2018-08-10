export default (polygons) => {
  return polygons.map((polygon) => {

    const formattedPolygon = {
      id: polygon.id,
      name: polygon.name,
      type: "Polygon",
      coordinates: JSON.parse(polygon.geomJson).coordinates
    }

    return formattedPolygon;
  })
}
