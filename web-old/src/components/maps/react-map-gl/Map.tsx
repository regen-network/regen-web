import {Component} from "react";
import ReactMapGL, {ViewState} from 'react-map-gl';
import * as React from "react";
import WebMercatorViewport from "viewport-mercator-project";

export interface MapProps {
  viewport: WebMercatorViewport,
}

interface MapState {
  viewport: ViewState,
}

export class Map extends Component<MapProps, MapState> {
  state = {viewport: this.props.viewport};

  render() {
    return (
      <ReactMapGL
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
        {...this.state.viewport} onViewportChange={(viewport) => this.setState({viewport})}
      >
        {this.props.children}
      </ReactMapGL>
    );
  }
}
