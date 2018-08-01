import React, { Component } from 'react';
import { View } from 'react-native';
import ReactMapboxGl from "react-mapbox-gl";
import * as mapbox from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const mapboxAccessToken = "pk.eyJ1IjoiYWFyb25jLXJlZ2VuIiwiYSI6ImNqa2I4dW9sbjBob3czcHA4amJqM2NhczAifQ.4HW-QDLUBJiHxOjDakKm2w";

const Map = ReactMapboxGl({
  accessToken: mapboxAccessToken
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
  map.addControl(new MapboxGeocoder({
    accessToken: mapboxAccessToken
  }));
};

class App extends Component {
  render() {
    return (
      <View>
        <Map
        // eslint-disable-next-line
        style="mapbox://styles/mapbox/satellite-streets-v10"
        //  style="https://maps.tilehosting.com/styles/hybrid/style.json?key=UHsj69rAYb2gCUY60Put"
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
