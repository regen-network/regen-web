import {Component, ReactNode} from "react";
import * as React from "react";
import ReactMapboxGl, {GeoJSONLayer} from "react-mapbox-gl";

const MapComp = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "",
  logoPosition: 'bottom-left',
  // easeTo: true,
//    interactive: false,
//   flyTo: false
});

export interface MapProps {
  boundingBox: Array<number>,
  children: ReactNode,
}

export class Map extends Component<MapProps> {
  render() {
    const {boundingBox, children} = this.props;
    return <MapComp
      style="mapbox://styles/mapbox/satellite-streets-v10"
      containerStyle={{
        width: '97vw',
        height: '97vh'
      }}
      fitBounds={[[boundingBox[0], boundingBox[1]], [boundingBox[2], boundingBox[3]]]}
      children={children as any} />;
  }
}