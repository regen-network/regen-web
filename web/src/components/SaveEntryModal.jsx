import React, { Component } from 'react';
import './AddEntryModal.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { actions as entryActions } from "../actions/entry";
import { actions as mapActions } from "../actions/map";
import { actions as authActions } from "../actions/auth";
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SingleSelect from './select.js';
import * as moment from 'moment';
import PolygonIcon from './polygonIcon';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LOG_ENTRY = gql`
   mutation LogEntry($type: String!, $comment: String, $polygon: JSON!, $point: JSON, $species: String, $unit: String, $numericValue: BigFloat, $happenedAt: Datetime) {
    logEntry(input: {type: $type, comment: $comment, polygon: $polygon, point: $point, species: $species, unit: $unit, numericValue: $numericValue, happenedAt: $happenedAt}) {
      entry{
        id
        type
        polygon
        species
        when
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

const entryTypes = [
    {type:'Planting', category: 'PlantRelated'},
    {type:'Harvesting', category: 'PlantRelated'},
    {type:'Tillage'}
];

const entryTypeCategories = new Map(entryTypes.map(({type,category}) => [type, category]));

const isPlantRelated = (type) => entryTypeCategories.get(type) === 'PlantRelated';

const plants = [
    {name: 'Wheat'},
    {name: 'Rye'},
    {name: 'Soy'},
    {name: 'Corn'},
    {name: 'Buckwheat'}
];

const tillage = [
    {name: 'No-till'},
    {name: 'Conservation till'},
    {name: 'Till'}
];

const fieldFeatures = [
  {type: "hasTrees", label: "Area with trees"},
  {type: "hasWatercourse", label: "Watercourse"},
  {type: "hasWetland", label: "Wetland"},
  {type: "hasNativeBuffer", label: "Native or wild vegetation buffer strip"},
  {type: "hasWildlifeCorridor", label: "Wildlife corridor"},
];

const fieldPractices = [
  {type: "cropRotation", label: "Crop rotation"},
  {type: "intercropping", label: "Intercropping", category: "PlantRelated"},
  {type: "coverCropping", label: "Cover cropping", category: "PlantRelated"},
  {type: "agroforestry", label: "Agroforestry", category: "PlantRelated"},
  {type: "organicAnnualCrops", label: "Organic annual crops", category: "PlantRelated"},
  {type: "perennialCrops", label: "Perennial crops", category: "PlantRelated"},
  {type: "silvopasture", label: "Silvopasture", category: "PlantRelated"},
  {type: "pastureCropping", label: "Pasture cropping", category: "PlantRelated"},
  {type: "holisticManagement", label: "Holistic management"},
  {type: "tilling", label: "Tilling", category: "Tilling"}
]

class SavePolygonModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          hasTrees: false,
          hasWatercourse: false,
          hasWetland: false,
          hasNativeBuffer: false,
          hasWildlifeCorridor: false,
          stage: 0
        };
    }

    handleNameChange = name => event => {
      this.setState({
        [name]: event.target.value
      });
    };

    handleFeatureChange = (e, name) => {
      this.setState({ [name]: e.target.checked });
    };

    removeItemFromStorage = (id) => {
      const unsavedFeatures = JSON.parse(localStorage.getItem("features"));
      const remainingUnsavedFeatures = unsavedFeatures.filter((feature) => {
        return feature.id !== id;
      });
      localStorage.setItem("features", JSON.stringify(remainingUnsavedFeatures));
    }

    render() {
        const {open, onClose, entry, patchNewEntry, theme, authenticated, clearSelected, optimisticSaveFeature, user, login} = this.props;
        const { currentFeature } = entry;
        const { type, species, date } = entry.entry;

        const now = moment().format();

        const styles = {
          primaryColor: {
            backgroundColor: theme.palette.primary.main,
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
            fontSize: "24px"
          }
        };

        const SavePolygonName = () => {
          return <div style={{margin: "25px"}}>
                <form noValidate>
                  <TextField
                    id="name"
                    label="Name"
                    autoFocus={true}
                    value={this.state.name}
                    onChange={this.handleNameChange('name')}
                    margin="normal"
                  />
                </form>
                <Mutation mutation={CREATE_POLYGON}>
                    {(createPolygonByJson, {loading, error}) => (
                      <div>
                          {error ? <p style={{color: styles.accent.red}}>"There was an error saving your parcel. Please try again."</p> : null}
                          <Button onClick={() => {
                            createPolygonByJson({variables: {name: this.state.name, geojson: currentFeature.geometry, owner: user }});
                            optimisticSaveFeature(currentFeature.id, this.state.name);
                            clearSelected(currentFeature.id); // delete from map
                            this.removeItemFromStorage(currentFeature.id);
                            this.setState({stage: 1});
                          }}
                          style={{
                            margin: "25px",
                            backgroundColor: styles.accent.blue,
                            fontFamily: styles.fontFamily,
                            color: styles.primaryColor.color}}>
                          Save Parcel</Button>
                      </div>
                    )}
                  </Mutation>
              </div>;
          }

          const ChoosePolygonFeatures = () => {
            return <div>
              <Typography variant="subheading" style={{fontFamily: styles.title.fontFamily, margin: "15px"}}>
                {"Please choose if any of these features are present within the parcel limits:"}
              </Typography>
              <Mutation mutation={LOG_ENTRY}>
              {(logEntry, {loading, error}) => (
                <FormGroup row>
                  {
                    fieldFeatures.map((feature) => {
                      return <FormControlLabel
                              control={
                                <Checkbox
                                  checked={this.state[feature.type]}
                                  onChange={(e) => {
                                    this.handleFeatureChange(e, feature.type);
                                    logEntry({variables: {type: feature.type, polygon: currentFeature.geometry, happenedAt: now }});
                                  }}
                                  value={feature.type}
                                  color="primary"
                                />
                              }
                              label={feature.label}
                              key={feature.type}
                            />
                    })
                  }
                </FormGroup>
              )}
              </Mutation>
              <Button onClick={() => {
                this.setState({stage: 2});
              }}
              style={{
                margin: "25px",
                backgroundColor: styles.accent.blue,
                fontFamily: styles.fontFamily,
                color: styles.primaryColor.color}}>
              Submit</Button>
            </div>;
        }

        const ChoosePolygonPractices = () => {
          return <div>
            <Typography variant="subheading" style={{fontFamily: styles.title.fontFamily, margin: "15px"}}>
              {"Please choose if any of these are practiced within the parcel limits:"}
            </Typography>
            <Mutation mutation={LOG_ENTRY}>
            {(logEntry, {loading, error}) => (
              <FormGroup row>
                {
                  fieldPractices.map((practice) => {
                    return <FormControlLabel
                            control={
                              <Checkbox
                                checked={this.state[practice.type]}
                                onChange={(e) => {
                                  this.handleFeatureChange(e, practice.type);
                                  logEntry({variables: {type: practice.type, polygon: currentFeature.geometry, happenedAt: now }});
                                }}
                                value={practice.type}
                                color="primary"
                              />
                            }
                            label={practice.label}
                            key={practice.type}
                          />
                  })
                }
              </FormGroup>
            )}
            </Mutation>
            <Button onClick={() => {
              this.setState({stage: 3});
            }}
            style={{
              margin: "25px",
              backgroundColor: styles.accent.blue,
              fontFamily: styles.fontFamily,
              color: styles.primaryColor.color}}>
            Submit</Button>
          </div>;
      }

        const PolygonEntries = () => {
          return <div>
              <Typography variant="subheading" style={{fontFamily: styles.title.fontFamily, margin: "15px"}}>
                {"What was the last activity that occured in this parcel?"}
              </Typography>
              <DatePicker
                  selected={date}
                  onChange={(date) => {
                    patchNewEntry({date});
                  }}/>
              <SingleSelect
                  placeholder={"Select an action..."}
                  options={entryTypes.map(({type}) => {return {value: type, label: type}})}
                  value={type ? {value: type, label: type} : null}
                  onChange={(e) => {
                    patchNewEntry({type: e.value});
                  }}
              />
              {isPlantRelated(type) ?
                 <SingleSelect
                     placeholder={"Select a crop..."}
                     options={plants.map(({name}) => {return {value: name, label: name}})}
                     value={species ? {value: species, label: species} : ""}
                     onChange={(e) => {
                       patchNewEntry({species: e.value});
                     }}
                 />
                 : null
              }
              <Mutation mutation={LOG_ENTRY}>
                {(logEntry, {loading, error}) => (
                  <div>
                    {error ? <p style={{color: styles.accent.red}}>"There was an error saving your update. Please try again."</p> : null}
                    <Button onClick={() => {
                      currentFeature.name = this.state.name;
                      logEntry({variables: {type: type, polygon: currentFeature.geometry, species: species, happenedAt: date }});
                      onClose();
                      this.setState({
                        name: "",
                        hasTrees: false,
                        hasWatercourse: false,
                        hasWetland: false,
                        hasNativeBuffer: false,
                        hasWildlifeCorridor: false,
                        stage: 0
                      });
                    }}
                      style={{
                        margin: "25px",
                        backgroundColor: styles.accent.blue,
                        fontFamily: styles.fontFamily,
                        color: styles.primaryColor.color}}>
                      Submit</Button>
                  </div>
                )}
              </Mutation>
          </div>;
        }

        const renderStage = (stage) => {
            if (stage === 0) {
              return <SavePolygonName />;
            }
            else if (stage === 1) {
              return <ChoosePolygonFeatures />;
            }
            else if (stage === 2) {
              return <ChoosePolygonPractices />;
            }
            else if (stage === 3) {
              return <PolygonEntries />;
            }
        }

        return (
            <Modal open={open}
               onClose={() => {
                 this.setState({
                   name: "",
                   hasTrees: false,
                   hasWatercourse: false,
                   hasWetland: false,
                   hasNativeBuffer: false,
                   hasWildlifeCorridor: false,
                   stage: 0
                 });
                 onClose();
               }}>
                <div className="modal-add-entry">
                  <div style={{margin: "25px"}}>
                      { authenticated
                        ?
                        <div>
                          <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily, margin: "15px"}}>
                            {"Tell us about this parcel"}
                          </Typography>
                          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            {
                              this.state.name ?
                              <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, marginRight: "25px"}}>
                                {this.state.name}
                              </Typography>
                              : null
                            }
                            <PolygonIcon polygon={currentFeature}/>
                          </div>
                          {renderStage(this.state.stage)}
                        </div>
                        :
                        <div>
                          <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily}}>
                            {"Please log in to access this feature."}
                          </Typography>
                          <Button
                            onClick={() => login()}
                            style={{
                              marginTop: "25px",
                              backgroundColor: styles.primaryColor.backgroundColor,
                              fontFamily: styles.fontFamily,
                              color: styles.primaryColor.color}}>
                            Sign In
                          </Button>
                        </div>
                      }
                  </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = ({ entry, auth }) => ({
    entry: entry,
    authenticated: auth.authenticated,
});

const mapDispatchToProps = (dispatch) => {
    const { patchNewEntry, closeSaveEntryModal } = entryActions;
    const { optimisticSaveFeature, updateUnsavedFeatures } = mapActions;
    const { login } = authActions;
    return bindActionCreators({ patchNewEntry, closeSaveEntryModal, optimisticSaveFeature, updateUnsavedFeatures, login }, dispatch);
};

export default withTheme()(connect(mapStateToProps, mapDispatchToProps)(SavePolygonModal));
