// @ts-ignore
import React, {Component} from 'react';
import {storiesOf} from '@storybook/react';
import {Map} from './Map';
import Marker from "react-mapbox-gl/lib/marker";
import WebMercatorViewport from "viewport-mercator-project";
import {StaticMap} from "react-map-gl";

const viewport : any = {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    };

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none'
};

const size = 20;

storiesOf('Components|Maps/react-map-gl/Map', module)
  .addDecorator(story =>
    <Map viewport={viewport}>{story()}</Map>
  )
  .add("default", () => [])
  // .add("marker", () => <Marker latitude={37.8} longitude={-122.5} key={0}>
  //   <svg
  //     height={size}
  //     viewBox="0 0 24 24"
  //     style={{
  //       ...pinStyle,
  //       transform: `translate(${-size / 2}px,${-size}px)`
  //     }}
  //   >
  //     <path d={ICON}/>
  //   </svg>
  // </Marker>)

storiesOf('Components|Maps/react-map-gl/StaticMap', module)
  .addDecorator(story =>
    <StaticMap height="100vh" width="100vw"
               mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
               viewState={viewport}
    >{story()}</StaticMap>
  )
  .add("default", () => [])
