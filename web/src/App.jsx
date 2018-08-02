import React, { Component } from 'react';
import { View } from 'react-native';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ReactMapboxGl from "react-mapbox-gl";
import * as mapbox from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';

const mapboxAccessToken = "pk.eyJ1IjoiYWFyb25jLXJlZ2VuIiwiYSI6ImNqa2I4dW9sbjBob3czcHA4amJqM2NhczAifQ.4HW-QDLUBJiHxOjDakKm2w";

const Map = ReactMapboxGl({
  accessToken: mapboxAccessToken
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: {},
      selected: {}
   };
  }

  onDrawUpdated = (e) => {
    this.setState({ features: this.state.drawControl.getAll() });
  }

  onSelectionChange = (e) => {
    var selected = {};
    e.features.forEach((feature) => {
      selected[feature.id] = true;
    });
    this.setState({selected});
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
    map.on('draw.selectionchange', this.onSelectionChange);
  }

  toggleSelectItem = (id) => {
    // TODO I was trying to get the toggling to work, but somehow changeMode isn't working with simple_select - @aaronc
    // either we just use direct_select or do a bit of debugging
    const {selected, drawControl} = this.state;
    const newSelected = {...selected};
    newSelected[id] = !selected[id];
    const featureIds = [];
    Object.getOwnPropertyNames(newSelected).forEach((k) => {
      if(newSelected[k]) featureIds.push(k);
    });
    drawControl.changeMode('simple_select', {featureIds});
    this.setState({selected:newSelected});
    //this.state.drawControl.changeMode('direct_select', {featureId: id});
  }

  render() {
    const {features, selected} = this.state;
    const { theme } = this.props;
    const styles = {
      primaryColor: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
      fontFamily: theme.fontFamily
    };

    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <AppBar position="static">
          <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="title" style={{color: styles.primaryColor.color, fontFamily: styles.fontFamily}}>
              Welcome, User!
            </Typography>
            <Button style={{color: styles.primaryColor.color}}>Logout</Button>
          </Toolbar>
        </AppBar>
        <View style={{ flex: 8, flexDirection: 'row' }}>
          <View style={{ flex: 2 }}>
            <FeatureList features={features} selected={selected} toggleSelectItem={this.toggleSelectItem} />
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

const FeatureList = withTheme()(({features, selected, toggleSelectItem, theme}) => {
  return (
  <List subheader={<ListSubheader>Features</ListSubheader>}>
    {features && features.features && features.features.map((feature) =>
      <FeatureListItem item={feature} theme={theme} selected={selected[feature.id]}
        toggleSelectThis={() => toggleSelectItem(feature.id)}
      />
    )}
  </List>
  );
});

const FeatureListItem = ({ item, selected, toggleSelectThis, theme }) => {
  const style = selected ? {backgroundColor: theme.palette.primary.main} : {};
  return (
    <ListItem dense button style={style} key={item.id} onClick={toggleSelectThis}>
      <ListItemText primary={"Unsaved Polygon " + item.id} />
    </ListItem>
  );
}

// <Map containerStyle={{height:"100vh", width:"100vw"}} />

export default withTheme()(App);
