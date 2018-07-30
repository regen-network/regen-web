import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import * as mapbox from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';

const Map = ReactMapboxGl({
  accessToken: "undefined"
});

const onMapLoad = (map) => {
  const drawControl = new MapboxDraw({
    controls: {
      polygon: true,
      trash: true
    },
    displayControlsDefault: false
  });
  map.addControl(drawControl, 'top-left');
  map.addControl(new mapbox.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    showUserLocation: true
  }));
};

class App extends Component {
  render() {
    return (
      <View>
        <Map
          style="https://maps.tilehosting.com/styles/hybrid/style.json?key=UHsj69rAYb2gCUY60Put"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          onStyleLoad={onMapLoad}
        />
      </View>
    );
  }
}

// <Map containerStyle={{height:"100vh", width:"100vw"}} />

export default App;
