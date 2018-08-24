import React, { Component } from 'react';
import './AddEntryModal.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { actions as entryActions } from "../actions/entry";
import { actions as mapActions } from "../actions/map";
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from './Select.jsx';
import * as moment from 'moment';
import PolygonIcon from './polygonIcon';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Auth from '../Auth';
const auth = new Auth();

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

class SavePolygonModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          completed: false,
          name: "",
          submittedName: false,
          hasTrees: false,
          hasWatercourse: false,
          hasWetland: false,
          hasNativeBuffer: false,
          hasWildlifeCorridor: false
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

    render() {
        const {open, onClose, entry, patchNewEntry, theme, authenticated, user, clearSelected, optimisticSaveFeature} = this.props;
        const { currentFeature } = entry;
        const { type, species, date } = entry.entry;

        console.log("DATE", date);

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

        return (
            <Modal open={open}
               onClose={onClose}>
                <div className="modal-add-entry">
                  <div style={{margin: "25px"}}>
                      { authenticated
                        ?
                        <div>
                          <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily, margin: "15px"}}>
                            {"Tell us about this parcel"}
                          </Typography>
                          <PolygonIcon polygon={currentFeature}/>
                          <div style={{margin: "25px"}}>
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
                                    { this.state.submittedName ?
                                      <Typography variant="subheading" style={{fontFamily: styles.title.fontFamily, margin: "15px"}}>
                                        {"Saved!"}
                                      </Typography>
                                    :
                                      <div>
                                        {error ? <p style={{color: styles.accent.red}}>"There was an error saving your parcel. Please try again."</p> : null}
                                        <Button onClick={() => {
                                          createPolygonByJson({variables: {name: this.state.name, geojson: currentFeature.geometry, owner: user }});
                                          optimisticSaveFeature(currentFeature.id, this.state.name);
                                          clearSelected(currentFeature.id); // delete from map
                                          this.setState({submittedName: true});
                                        }}
                                          style={{
                                            margin: "25px",
                                            backgroundColor: styles.accent.blue,
                                            fontFamily: styles.fontFamily,
                                            color: styles.primaryColor.color}}>
                                          Save Parcel</Button>
                                      </div>
                                    }
                                  </div>
                                )}
                              </Mutation>
                          </div>
                          <div>
                            <Typography variant="subheading" style={{fontFamily: styles.title.fontFamily, margin: "15px"}}>
                              {"Please choose if any of these features are present within the parcel limits:"}
                            </Typography>
                            <Mutation mutation={LOG_ENTRY}>
                            {(logEntry, {loading, error}) => (
                              <FormGroup row>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={this.state.hasTrees}
                                      onChange={(e) => {
                                        this.handleFeatureChange(e, 'hasTrees');
                                        logEntry({variables: {type: 'hasTrees', polygon: currentFeature.geometry, happenedAt: now }});
                                      }}
                                      value="hasTrees"
                                      color="primary"
                                    />
                                  }
                                  label="Area with trees"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={this.state.hasWatercourse}
                                      onChange={(e) => {
                                        this.handleFeatureChange(e, 'hasWatercourse');
                                        logEntry({variables: {type: 'hasWatercourse', polygon: currentFeature.geometry, happenedAt: now }});
                                      }}
                                      value="hasWatercourse"
                                      color="primary"
                                    />
                                  }
                                  label="Watercourse"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={this.state.hasWetland}
                                      onChange={(e) => {
                                        this.handleFeatureChange(e, 'hasWetland');
                                        logEntry({variables: {type: 'hasWetland', polygon: currentFeature.geometry, happenedAt: now }});
                                      }}
                                      value="hasWetland"
                                      color="primary"
                                    />
                                  }
                                  label="Wetland"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={this.state.hasNativeBuffer}
                                      onChange={(e) => {
                                        this.handleFeatureChange(e, 'hasNativeBuffer');
                                        logEntry({variables: {type: 'hasNativeBuffer', polygon: currentFeature.geometry, happenedAt: now }});
                                      }}
                                      value="hasNativeBuffer"
                                      color="primary"
                                    />
                                  }
                                  label="Native or wild vegetation buffer strip"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={this.state.hasWildlifeCorridor}
                                      onChange={(e) => {
                                        this.handleFeatureChange(e, 'hasWildlifeCorridor');
                                        logEntry({variables: {type: 'hasWildlifeCorridor', polygon: currentFeature.geometry, happenedAt: now }});
                                      }}
                                      value="hasWildlifeCorridor"
                                      color="primary"
                                    />
                                  }
                                  label="Other kind of corridor for wildlife"
                                />
                              </FormGroup>
                            )}
                            </Mutation>
                          </div>
                          <div>
                            <Typography variant="subheading" style={{fontFamily: styles.title.fontFamily, margin: "15px"}}>
                              {"What was the last activity that occured in this parcel?"}
                            </Typography>
                            <DatePicker
                                selected={date}
                                onChange={(date) => {
                                  patchNewEntry({date});
                                }}/>
                            <Select
                                options={entryTypes.map(({type}) => {return {value: type, label: type}})}
                                value={{value: type, label: type}}
                                onChange={(e) => {
                                  patchNewEntry({type: e.value})
                                  if (!isPlantRelated(e.value)) {
                                    this.setState({completed: true});
                                  }
                                }}
                            />
                            {isPlantRelated(type) ?
                               <Select
                                   options={plants.map(({name}) => {return {value: name, label: name}})}
                                   value={{value: species, label: species}}
                                   onChange={(e) => {
                                     patchNewEntry({species: e.value});
                                     this.setState({completed: true});
                                   }}
                               />
                               : null
                            }
                          </div>
                          { this.state.completed
                            ? <Mutation mutation={LOG_ENTRY}>
                                {(logEntry, {loading, error}) => (
                                  <div>
                                    {error ? <p style={{color: styles.accent.red}}>"There was an error saving your update. Please try again."</p> : null}
                                    <Button onClick={() => {
                                      currentFeature.name = this.state.name;
                                      logEntry({variables: {type: type, polygon: currentFeature.geometry, species: species, happenedAt: date }});
                                      onClose();
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
                            : null
                          }
                        </div>
                        :
                        <div>
                          <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily}}>
                            {"Please log in to access this feature."}
                          </Typography>
                          <Button
                            onClick={() => auth.login()}
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

const mapStateToProps = ({ entry, user }) => ({
    entry: entry,
    authenticated: user.authenticated,
});

const mapDispatchToProps = (dispatch) => {
    const { patchNewEntry, closeSaveEntryModal } = entryActions;
    const { optimisticSaveFeature } = mapActions;
    return bindActionCreators({ patchNewEntry, closeSaveEntryModal, optimisticSaveFeature }, dispatch);
};

export default withTheme()(connect(mapStateToProps, mapDispatchToProps)(SavePolygonModal));
