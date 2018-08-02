import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { features: {} };
  }

  onDrawUpdated = (e) => {
    this.setState({ features: this.state.drawControl.getAll() });
  }

  onMapLoad = (map) => {
    const drawControl = new MapboxDraw({
      controls: {
        polygon: true,
        trash: true
      },
      displayControlsDefault: false
    });
    this.setState({ drawControl });
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
    map.on('draw.create', this.onDrawUpdated);
    map.on('draw.delete', this.onDrawUpdated);
    map.on('draw.combine', this.onDrawUpdated);
    map.on('draw.uncombine', this.onDrawUpdated);
    map.on('draw.update', this.onDrawUpdated);
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 8, flexDirection: 'row' }}>
          <View style={{ flex: 2 }}>
            <FlatList
              data={this.state.features.features}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <FeatureListItem item={item} />}
            />
          </View>
          <View style={{ flex: 8 }}>
            <Map
              // eslint-disable-next-line
              style="mapbox://styles/mapbox/satellite-streets-v10"
              //  style="https://maps.tilehosting.com/styles/hybrid/style.json?key=UHsj69rAYb2gCUY60Put"
              containerStyle={{
                width: '80vw',
                height: '80vh'
              }}
              onStyleLoad={this.onMapLoad}
            />
          </View>
        </View>
        <View style={{ flex: 2 }}></View>
      </View>
    );
  }
}

const FeatureListItem = ({ item }) => {
  return (
    <View style={{ flexDirection: 'column' }}>
      <Text style={{ fontWeight: 'bold' }}>{item.geometry.type}</Text>
      <Text style={{ fontSize: 10 }}>{JSON.stringify(item.geometry.coordinates[0])}</Text>
    </View>
  );
}

// <Map containerStyle={{height:"100vh", width:"100vw"}} />

export default App;
