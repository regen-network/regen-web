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
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import { withTheme } from '@material-ui/core/styles';
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import * as mapbox from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { actions as authActions } from "./actions/auth";
import { actions as mapActions } from "./actions/map";
import { actions as entryActions } from "./actions/entry";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Welcome from './components/welcome';
import * as turf from '@turf/turf';
import FeatureList from './components/featureList';
import DetailView from './components/detailView';
import AddEntryModal from './components/AddEntryModal.jsx';
import SaveEntryModal from './components/SaveEntryModal.jsx';
import UnsavedPolygonWarning from './components/unsavedPolygonWarning';
import DeletePolygonConfirmation from './components/deletePolygonConfirmation';


const mapboxAccessToken = "pk.eyJ1IjoiYWFyb25jLXJlZ2VuIiwiYSI6ImNqa2I4dW9sbjBob3czcHA4amJqM2NhczAifQ.4HW-QDLUBJiHxOjDakKm2w";

const Map = ReactMapboxGl({
    accessToken: mapboxAccessToken,
    logoPosition: 'bottom-left',
    easeTo: true,
//    interactive: false,
    flyTo: false
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
    const unsavedFeatures = JSON.parse(localStorage.getItem("features"));
    this.setState({ unsavedFeatures });
  }

  onMenuClick = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  }

  onMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  onLogout = (e) => {
    const unsaved = this.props.map.features.length && this.props.map.features.some((feature) => {
      return !feature.saved;
    });

    if (unsaved) {
        this.props.actions.openWarningModal();
    }
    else {
      this.setState({ anchorEl: null });
      this.props.actions.logout();
    }
  }

  gotoRegen = () => {
      window.open(
        'http://regen.network',
        '_blank'
      );
  }

  // Link removed for now as Invision page 'Over Quota'
  gotoInvisionDemo = () => {
      window.open(
        'https://projects.invisionapp.com/share/3VO8HG8M4D8#/screens/321828395_Landing_Screen_2'
      );
  }

  onDrawUpdated = (e) => {
    const { updateFeatures } = this.props.actions;
    const updatedFeatures = this.state.drawControl.getAll();
    localStorage.setItem("features", JSON.stringify(updatedFeatures.features));
    updateFeatures(updatedFeatures.features);
  }

  onSelectionChange = (e) => {
    const { updateSelected } = this.props.actions;
    let selected = {};
    e.features.forEach((feature) => {
      selected[feature.id] = true;
    });
    updateSelected(selected);
  }

  onMapLoad = (map) => {
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


    const unsavedFeatures = JSON.parse(localStorage.getItem("features"));
    if (unsavedFeatures && unsavedFeatures.length) {
      this.props.actions.updateFeatures(unsavedFeatures);

      drawControl.set({
        type: 'FeatureCollection',
        features: unsavedFeatures
      });
    }

    this.setState({ drawControl });
    map.on('draw.create', this.onDrawUpdated);
    map.on('draw.delete', this.onDrawUpdated);
    map.on('draw.combine', this.onDrawUpdated);
    map.on('draw.uncombine', this.onDrawUpdated);
    map.on('draw.update', this.onDrawUpdated);
    map.on('draw.selectionchange', this.onSelectionChange);
  }

  drawSelected = (id) => {
    const { drawControl } = this.state;
    const { updateSelected } = this.props.actions;
    const selected = this.props.map.selected;

    let mapFeatureIds = {};
    drawControl.getAll().features.forEach((feature) => {
      mapFeatureIds[feature.id] = true;
    });

    if (mapFeatureIds[id]) {
      if (id in selected) {
        selected[id] = !selected[id];
      }
      else {
        selected[id] = true;
      }

      const featureIds = [];
      Object.keys(selected).forEach((k) => {
        if (selected[k] && mapFeatureIds[k]) {
          featureIds.push(k);
        }
        else {
          selected[k] = false;
        }
      });

      drawControl.changeMode('simple_select', {featureIds});
    }
    else {
      let currentState = selected[id] ? selected[id] : false;

      Object.keys(selected).forEach((k) => {
        selected[k] = false;
      });
      selected[id] = !currentState;

      drawControl.changeMode('simple_select'); // deselect drawn polygons
    }

    updateSelected(selected);
  }

  clearSelected = (id) => {
    // delete a new drawn polygon
    const { drawControl } = this.state;
    drawControl.delete(id);
  }


  render() {
    const worldview = [-60, -60, 60, 60]; // default mapbox worldview
    const { theme, map, user, actions, addModalOpen, saveModalOpen, isAuthenticated, menuModalOpen } = this.props;
    const { features, selected, zoom, deletePolygonModalOpen, warningModalOpen, deletedFeature } = map;
    const { login, updateZoom } = actions;

    const styles = {
      primaryColor: {
        backgroundColor: theme.palette.common.black,
        green: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
      accent: {
        blue: theme.palette.accent.blue,
        yellow: theme.palette.accent.yellow,
        red: theme.palette.accent.red
      },
      fontFamily: theme.fontFamily,
      fontSize: "16px",
      title: {
        fontFamily: theme.title.fontFamily,
        fontSize: "20px"
      }
    };
    const { anchorEl, unsavedFeatures } = this.state;

    return (

      <Query query={GET_POLYGONS}>
      {({loading, error, data}) => {
          /* If the user has saved polygons, roll them into a GeoJson FeatureCollection
             and pass them to turf.bbox(). This bbox can be passed to mapbox's fitBounds()
             method which will ease the view to the centroid of the user's polygons.
             Otherwise display a world map.
          */
        const nodes = data && data.allPolygons && data.allPolygons.nodes;
        let polygons = nodes && nodes.map(p => Object.assign({}, JSON.parse(p.geomJson), {id: p.id, name: p.name}));
        let bbox = worldview;
        if (polygons && polygons.length && !zoom ) {
          bbox = turf.bbox({
            type: 'FeatureCollection',
            features: polygons.map(p => ({
              type: 'Feature',
              geometry: p
            }))
          });
          updateZoom();
        }
        else if (unsavedFeatures && unsavedFeatures.length && !zoom) {
          bbox = turf.bbox({
            type: 'FeatureCollection',
            features: unsavedFeatures
          });
          updateZoom();
        }

        return (
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Welcome open={menuModalOpen} onClose={actions.closeMenuModal} user={isAuthenticated ? user : null} />
            <AppBar position="static" style={{backgroundColor: styles.primaryColor.backgroundColor, height: "50px"}}>
              <Toolbar variant="dense">
                <a target="_blank" href="http://regen.network" rel="noopener noreferrer" style={{position: "absolute", left: "20px"}}>
                  <img id="logo" src="logo_landscape.png" style={{height: 40, paddingTop: "5px"}} alt="logo link to regen.network" title="Regen Logo"/>
                </a>
                <Typography variant="title" style={{color: styles.primaryColor.color, fontFamily: styles.fontFamily, fontSize: "18px", textAlign: "center", width: "100%", letterSpacing: "1px"}}>
                  {isAuthenticated ? <div>Welcome <span style={{fontFamily: styles.title.fontFamily}}>{user.given_name}!</span></div> : "Welcome!"}
                </Typography>
                <div style={{position: "absolute", right: "20px"}}>
                  { isAuthenticated
	  	              ? <div>
  	                  <IconButton
	                      aria-owns={anchorEl ? 'user-menu' : null}
                        aria-label="More"
                        aria-haspopup="true"
                        onClick={this.onMenuClick}
                      >
                        <Avatar alt="user" src={user.picture} />
                      </IconButton>
	                    <Menu id="user-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.onMenuClose}>
                        <MenuItem onClick={actions.openMenuModal}>Menu</MenuItem>
                        <MenuItem onClick={this.gotoRegen}>Regen</MenuItem>
	                      <MenuItem onClick={this.onLogout}>Sign Out</MenuItem>
	                    </Menu>
	                   </div>
	                 : <Button onClick={() => login()}
                       style={{
                         border: "1px solid #FFF",
                         fontFamily: styles.fontFamily,
                         color: styles.primaryColor.color}}>Sign In</Button>
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
                  toggleSelect={this.drawSelected}
                  styles={styles}
                  openSaveEntryModal={actions.openSaveEntryModal}
                  openDeletePolygonModal={actions.openDeleteModal} />
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
                      // options seem to be ignored here. why?
                      logoPosition: 'top-left'
                  }}
		              fitBounds={!zoom ? ([[bbox[0], bbox[1]], [bbox[2], bbox[3]]]) : null}
                  onStyleLoad={this.onMapLoad}
                  onZoomEnd={(e) => {
                    if (!zoom) {
                      updateZoom();
                    }
                  }}>
                  {
                    (polygons && polygons.length) ?
                      polygons.map(polygon => {
                        let fillColor = selected[polygon.id] ? styles.accent.yellow : styles.accent.blue;
                        return (
                          <GeoJSONLayer
                            data={polygon}
                            key={polygon.id}
                            fillOnClick={() => this.drawSelected(polygon.id)}
                            fillPaint={{
                              'fill-color': fillColor,
                              'fill-opacity': 0.7
                            }}
                            linePaint={{
                              'line-color': fillColor,
                              'line-opacity': 0.9,
                              'line-width': 5
                            }}
                            symbolLayout={{
                              "text-field": polygon.name,
                              "text-font": ["Lato Regular"],
                              "text-offset": [0, 0.6],
                              "text-anchor": "top"
                            }}/>
                        )
                      })
                    : null
                  }
                  {
                    isAuthenticated ?
                      <div style={{position: "absolute", bottom: "25px", right: "10px"}}>
                        <Button
                          variant="fab"
                          color="secondary"
                          onClick={actions.openNewEntryModal}>
                            <AddIcon />
                        </Button>
                      </div>
                      : null
                  }
                </Map>
                <DetailView features={features} selected={selected} polygons={polygons} styles={styles} />
              </View>
            </View>
            <AddEntryModal open={addModalOpen} onClose={actions.closeNewEntryModal} polygons={polygons} />
            <SaveEntryModal open={saveModalOpen} onClose={actions.closeSaveEntryModal} user={data && data.getCurrentUser} clearSelected={this.clearSelected} />
            <UnsavedPolygonWarning open={warningModalOpen} onClose={actions.closeWarningModal} logout={actions.logout} />
            <DeletePolygonConfirmation open={deletePolygonModalOpen} onClose={actions.closeDeleteModal} deletedFeature={deletedFeature} />
          </View>
          );
        }}
      </Query>);
  }
}

const mapStateToProps = ({ map, entry, auth }) => ({
  map: map,
  user: auth.user,
  menuModalOpen: auth.menuModalOpen,
  addModalOpen: entry.addModalOpen,
  saveModalOpen: entry.saveModalOpen,
  isAuthenticated: auth.authenticated
});

const mapDispatchToProps = (dispatch) => {
  const { logout, login, openMenuModal, closeMenuModal } = authActions;
  const { updateZoom, updateFeatures, optimisticSaveFeature, updateSelected, openWarningModal, closeWarningModal, openDeleteModal, closeDeleteModal } = mapActions;
  const { openNewEntryModal, closeNewEntryModal, openSaveEntryModal, closeSaveEntryModal } = entryActions;
  const actions = bindActionCreators({
    updateFeatures,
    optimisticSaveFeature,
    updateSelected,
    openNewEntryModal,
    closeNewEntryModal,
    openSaveEntryModal,
    closeSaveEntryModal,
    openWarningModal,
    closeWarningModal,
    openDeleteModal,
    closeDeleteModal,
    updateZoom,
    logout,
    login,
    openMenuModal,
    closeMenuModal
  }, dispatch);
  return { actions }
};

export default withTheme()(connect(mapStateToProps, mapDispatchToProps)(App));
