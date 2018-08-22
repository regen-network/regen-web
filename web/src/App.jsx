import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import * as mapbox from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { actions as mapActions } from "./actions/map";
import { actions as userActions } from "./actions/user";
import formatPolygons from "./helpers/formatPolygons";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Welcome from './components/welcome';
import PolygonIcon from './components/polygonIcon';
import * as turf from '@turf/turf';

import { BrowserRouter as Redirect, Router, Route, Link } from "react-router-dom";

import Auth from './Auth';
const auth = new Auth();

const mapboxAccessToken = "pk.eyJ1IjoiYWFyb25jLXJlZ2VuIiwiYSI6ImNqa2I4dW9sbjBob3czcHA4amJqM2NhczAifQ.4HW-QDLUBJiHxOjDakKm2w";

const Map = ReactMapboxGl({
    accessToken: mapboxAccessToken,
    logoPosition: 'top-left',
    jumpTo: true,
//    interactive: false,
    flyTo: false
});

const TEST_COORDS = [[[-0.24967984727266,51.520868329044],[-0.228050513774832,51.5247134268546],[-0.22599057724949,51.5219364443387],[-0.239723487410316,51.5183047501306],[-0.24967984727266,51.520868329044]],[[-0.370186133907936,51.5294125499453],[-0.337227149532964,51.5482041927455],[-0.302551551390053,51.5262086549911],[-0.342720313597738,51.5063394738109],[-0.364692969847738,51.5089037261625],[-0.360229774047411,51.5198001887005],[-0.370186133907936,51.5294125499453]],[[-0.294778540012828,51.5224811719843],[-0.293460840559931,51.5225757737119],[-0.291560312498945,51.5208098423641],[-0.295310687866191,51.5207625396905],[-0.294778540012828,51.5224811719843]]];


const GET_POLYGONS = gql`
{
  getCurrentUser
  allPolygons {
    nodes {
      id
      name
      geomJson
      owner
    }
  }
}
`;

const CREATE_POLYGON = gql`
   mutation CreatePolygon($name: String!,  $geojson: JSON!, $owner: String!) {
    createPolygonByJson(input: {name: $name, geojson: $geojson, owner: $owner}) {
      polygon{
        id
        name
        geomJson
        owner
      }
    }
  }
`;

let  zoom=[1.2];
let center=[0, 0];

class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {}
   };

  }

  onMenuClick = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  }

  onMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  onLogout = (e) => {
    this.setState({ anchorEl: null });
    auth.logout();
  }

  gotoRegen = () => {
      window.open(
        'http://regen.network',
        '_blank'
      );
  }

  onDrawUpdated = (e) => {
    const { updateFeatures } = this.props.actions;
    const updatedFeatures = this.state.drawControl.getAll();
    updateFeatures(updatedFeatures.features);
  }

  onSelectionChange = (e) => {
    var selected = {};
    e.features.forEach((feature) => {
      selected[feature.id] = true;
    });
    this.setState({ selected });
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
    const { selected, drawControl } = this.state;
    const newSelected = {...selected};
    newSelected[id] = !selected[id];
    const featureIds = [];
    Object.getOwnPropertyNames(newSelected).forEach((k) => {
      if(newSelected[k]) featureIds.push(k);
    });
    drawControl.changeMode('simple_select', {featureIds});
    this.setState({ selected: newSelected });
    //this.state.drawControl.changeMode('direct_select', {featureId: id});
  }

  render() {
    const { selected } = this.state;
    const { theme, features, user, actions } = this.props;

    const styles = {
      primaryColor: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
      fontFamily: theme.fontFamily,
      fontSize: "16px",
      title: {
        fontFamily: theme.title.fontFamily,
        fontSize: "20px"
      }
    };
    const { anchorEl } = this.state;

    return (

      <Query query={GET_POLYGONS}>
      {({loading, error, data}) => {
          console.log("data=",data);

        let polygons;
        let centroid;
        let featureCollectionObj = {"type":"FeatureCollection","features":[]};
        let coords = [];
        let featuresArr = [];

        if (data && data.allPolygons) {
          polygons = formatPolygons(data.allPolygons.nodes);
          // possible save to store to trigger reload
            // need to test for presence of geomJson!

            // Handrolling a GeoJSON object for turf.centroid()
            data.allPolygons.nodes.forEach(polygon => {
                // populate the geometryObj from geomJson
                let geomJson = JSON.parse(polygon.geomJson);
                let featuresObj = {"type":"Feature", "geometry":{}, "properties":{}};
                let geometryObj = {"type": "", "coordinates":[]}
                geometryObj.type = geomJson.type;
                geometryObj.coordinates = Object.values(geomJson.coordinates);

                coords.push(geometryObj.coordinates);

                // now complete a Feature object
                Object.assign(featuresObj.geometry, geometryObj);
                // ...and push it into the FeaturesCollection
                featureCollectionObj.features.push(featuresObj);

                // alternative method
                featuresArr.push(geometryObj.coordinates);
            });

            console.log("featureCollectionObj=",JSON.stringify(featureCollectionObj));
            centroid = turf.centerOfMass(featureCollectionObj);
            // cool. getting a valid centroid back from featureCollection
            console.log("centroid=", centroid);
        }

        if (auth.isAuthenticated()) {
            auth.getProfile((err, profile) => {
		            actions.updateUser(profile);
                this.zoom = [12];
                this.center = centroid;
                {/* this.center = [8.9, 46.15]; Porto Ronco */}

          });
        }

        return (
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Welcome />
            <AppBar position="static">
              <Toolbar variant="dense" style={{display: 'flex', justifyContent: 'space-between'}}>
                <a target="_blank" href="http://regen.network"> <img id="logo" src="logo_white.png"  style={{height:50}} alt="logo link to regen.network" title="Regen Logo"/></a>
                <Typography variant="title" style={{color: styles.primaryColor.color, fontFamily: styles.fontFamily}}>
                  {auth.isAuthenticated() ? "Welcome, " +  user.given_name  + "!" : "Welcome!"}
                </Typography>
                  <div>
                    { auth.isAuthenticated()
  	  	              ? <div>
	  	                  <IconButton
		                      aria-owns={anchorEl ? 'user-menu' : null}
                          aria-label="More"
                          aria-haspopup="true"
                          onClick={this.onMenuClick}
                        >
                          <img style={{height:50}} src={user.picture}/>
                        </IconButton>
		                    <Menu id="user-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.onMenuClose}>
		                      <MenuItem onClick={this.gotoRegen}>Regen</MenuItem>
		                      <MenuItem onClick={this.onLogout}>Sign Out</MenuItem>
		                    </Menu>
		                   </div>
		                 : <div> <Button onClick={() => auth.login()}>Sign In</Button> </div>
		               }
		            </div>
              </Toolbar>
            </AppBar>
            <View style={{ flex: 8, flexDirection: 'row' }}>
              <View style={{ flex: 2 }}>
                <FeatureList
                  features={features}
                  selected={selected}
                  polygons={polygons}
                  toggleSelectItem={this.toggleSelectItem}
                  user={user ? user.given_name : "guest"}
                  styles={styles} />
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
                  options={{
                      logoPosition: 'top-right'
                  }}

                  center={this.center}
                  zoom={this.zoom}

                  onStyleLoad={this.onMapLoad}>
                  {
                    (polygons && polygons.length) ?
                      polygons.map(polygon => {
                        return (
                          <GeoJSONLayer
                            data={polygon}
                            fillPaint={{
                              'fill-color': '#088',
                              'fill-opacity': 0.8
                            }}
                            symbolLayout={{
                              "text-field": polygon.name,
                              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                              "text-offset": [0, 0.6],
                              "text-anchor": "top"
                            }}/>
                        )
                      })
                    : null
                  }

                </Map>
              </View>
            </View>
            <View style={{ flex: 2 }}></View>
          </View>
          );
        }}
      </Query>);
  }
}

const FeatureList = withTheme()(({ features, selected, polygons, toggleSelectItem, theme, user, styles }) => {
  return (
    <div>
      <List>
        <Typography variant="title" style={{fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, marginLeft: "25px"}}>
          {features && features.length ? "New Plots" : ""}
        </Typography>
        {features && features.map((feature) =>
          <FeatureListItem item={feature} theme={theme} selected={selected[feature.id]} user={user} styles={styles}
            toggleSelectThis={() => toggleSelectItem(feature.id)}
          />
        )}
      </List>
      <List>
        <Typography variant="title" style={{fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, marginLeft: "25px"}}>
          {polygons && polygons.length ? "Saved Plots" : ""}
        </Typography>
        {polygons && polygons.map((polygon) =>
          <SavedFeatureItem item={polygon} theme={theme} selected={selected[polygon.id]} user={user} styles={styles}
            toggleSelectThis={() => toggleSelectItem(polygon.id)}
          />
        )}
      </List>
    </div>
  );
});

const SavedFeatureItem = ({ item, selected, toggleSelectThis, theme, user, styles }) => {
  const style = selected ? {backgroundColor: theme.palette.primary.main} : {};
  return (
	  <ListItem dense button style={style} key={item.id} onClick={toggleSelectThis}>
      <PolygonIcon polygon={item}/>
      <ListItemText
        disableTypography
        primary={<Typography style={{fontSize: styles.fontSize}}>{item.name}</Typography>} />
    </ListItem>
  );
}

const FeatureListItem = ({ item, selected, toggleSelectThis, theme, user, styles }) => {
  const style = selected ? {backgroundColor: theme.palette.primary.main} : {};
  return (
    <Mutation mutation={CREATE_POLYGON}>
      {( createPolygonByJson, {data}) => (
	       <ListItem dense button style={style} key={item.id} onClick={toggleSelectThis}>
          <ListItemText
            disableTypography
            primary={<Typography style={{fontSize: styles.fontSize}}>{"Unsaved Polygon " + item.id}</Typography>} />
          <Button style={{color: styles.primaryColor.color}}
            onClick={() => createPolygonByJson({variables: {name: "foobar" , geojson: item.geometry, owner: user }})}>
            Save
          </Button>
          </ListItem>
        )
      }
    </Mutation>
  );
}

const mapStateToProps = ({ map, user }) => ({
  features: map.toJS(),
  user: user.toJS(),
});

const mapDispatchToProps = (dispatch) => {
  const { updateFeatures } = mapActions;
  const { updateUser } = userActions;
  const actions = bindActionCreators({ updateFeatures, updateUser }, dispatch);
  return { actions }
};

export const App = connect(mapStateToProps, mapDispatchToProps)(app);

export default withTheme()(App);
