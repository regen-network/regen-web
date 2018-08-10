export default (polygons) => {
  return polygons.map((polygon) => {

    const formattedPolygon = {
      id: polygon.id,
      name: polygon.name,
      owner: polygon.owner,
      type: 'fill',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: JSON.parse(polygon.geomJson)
        }
      },
      layout: {},
      paint: {
          'fill-color': '#088',
          'fill-opacity': 0.8
      }
    }

    return formattedPolygon;
  })
}
