import * as React from 'react';
import ReactMapboxGl, {GeoJSONLayer} from "react-mapbox-gl";
import {storiesOf} from "@storybook/react";
import walkersPolygon from "./walkers_2018_polygons_input"
import {bbox} from "@turf/turf";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "",
  logoPosition: 'bottom-left',
  // easeTo: true,
//    interactive: false,
//   flyTo: false
});

const bb = bbox(walkersPolygon);

storiesOf("Components|Maps/react-mapbox-gl", module)
  .addDecorator((story) =>
    <Map
      // eslint-disable-next-line
      style="mapbox://styles/mapbox/satellite-streets-v10"
      containerStyle={{
        width: '97vw',
        height: '97vh'
      }}
      fitBounds={[[bb[0], bb[1]], [bb[2], bb[3]]]}
    >
      {story()}
    </Map>
  )
  .add("default", () => [])
  .add("polygon", () =>
    <GeoJSONLayer data={walkersPolygon}
                  fillPaint={{
                    'fill-color': "blue",
                    'fill-opacity': 0.7
                  }}
                  linePaint={{
                    'line-color': "yellow",
                    'line-opacity': 0.9,
                    'line-width': 5
                  }}
                  symbolLayout={{
                    "text-field": "test",
                    "text-font": ["Lato Regular"],
                    "text-offset": [0, 0.6],
                    "text-anchor": "top"
                  }}
    >
    </GeoJSONLayer>
  )
