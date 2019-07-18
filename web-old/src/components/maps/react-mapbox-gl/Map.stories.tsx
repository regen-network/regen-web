import * as React from 'react';
import {Map} from './Map';
import {GeoJSONLayer} from "react-mapbox-gl";
import {storiesOf} from "@storybook/react";
import walkersPolygon from "../walkers_2018_polygons_input"
import {bbox} from "@turf/turf";
import {withKnobs, color, number, text, select} from "@storybook/addon-knobs";

const bb = bbox(walkersPolygon as any);

const opacityRange = {range: true, min: 0, max: 1, step: 0.05};

storiesOf("Components|Maps/react-mapbox-gl", module, )
  .addDecorator(withKnobs)
  .addDecorator((story) =>
    <Map boundingBox={bb}>
      {story() as any}
    </Map>
  )
  .add("default", () => [])
  .add("polygon", () =>
    <GeoJSONLayer data={walkersPolygon}
                  fillPaint={{
                    'fill-color': color("fill-color", "blue"),
                    'fill-opacity': number("fill-opacity", 0.7, opacityRange)
                  }}
                  linePaint={{
                    'line-color': color("line-color", "yellow"),
                    'line-opacity': number("line-opacity", 0.9, opacityRange),
                    'line-width': number("line-width", 5, {
                      range: true,
                      min: 0,
                      max: 15,
                      step: 0.5,
                    }),
                  }}
                  symbolLayout={{
                    "text-field": text("text", "Walker's Reserve"),
                    "text-font": ["Lato Regular"],
                    "text-offset": [number("text-offset1", 0), number("text-offset2", 0.6)],
                    "text-anchor": select("text-anchor", ['center', 'left', 'right', 'top', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'], "top"),
                    "text-size": number("text-size", 12),
                  }}
                  symbolPaint={{
                    "text-color": color("text-color", "black"),
                    "text-opacity": number("text-opacity", 1, opacityRange)
                  }}
    >
    </GeoJSONLayer>,
    {knobs: {escapeHTML: false}});
