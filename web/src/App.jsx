import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
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
import { Query } from "react-apollo";
import Welcome from './components/welcome';
import FeatureList from './components/featureList';

import Auth from './Auth';
const auth = new Auth();

const mapboxAccessToken = "pk.eyJ1IjoiYWFyb25jLXJlZ2VuIiwiYSI6ImNqa2I4dW9sbjBob3czcHA4amJqM2NhczAifQ.4HW-QDLUBJiHxOjDakKm2w";

const Map = ReactMapboxGl({
  accessToken: mapboxAccessToken
});

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
    const { theme, map, user, actions } = this.props;
    console.log("features from props", map, map.features);
    const { features } = map;

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
        console.log(data);

        let polygons;

        if (data && data.allPolygons) {
          polygons = formatPolygons(data.allPolygons.nodes);
          // possible save to store to trigger reload
        }

        if (auth.isAuthenticated()) {
            auth.getProfile((err, profile) => {
		            actions.updateUser(profile);
          });
        }

        return (
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Welcome />
            <AppBar position="static">
              <Toolbar variant="dense" style={{display: 'flex', justifyContent: 'space-between'}}>
                <a target="_blank" href="http://regen.network" rel="noopener noreferrer">
                  <img id="logo" src="logo_white.png"  style={{height:50}} alt="logo link to regen.network" title="Regen Logo"/>
                </a>
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
                          <img style={{height:50}} src={user.picture} alt="user" />
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
                  user={user ? user.sub : "guest"}
                  styles={styles}
                  optimisticSaveFeature={actions.optimisticSaveFeature} />
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

const mapStateToProps = ({ map, user }) => ({
  map: map.toJS(),
  user: user.toJS(),
});

const mapDispatchToProps = (dispatch) => {
  const { updateFeatures, optimisticSaveFeature } = mapActions;
  const { updateUser } = userActions;
  const actions = bindActionCreators({ updateFeatures, optimisticSaveFeature, updateUser }, dispatch);
  return { actions }
};

export const App = connect(mapStateToProps, mapDispatchToProps)(app);

export default withTheme()(App);
