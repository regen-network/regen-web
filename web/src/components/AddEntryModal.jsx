import React, { Component } from 'react';
import './AddEntryModal.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { actions as newEntryActions } from "../actions/newEntry";
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Select from './Select.jsx';
// import 'react-dates/initialize';
// import { SingleDatePicker} from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';
import * as moment from 'moment';
import PolygonIcon from './polygonIcon';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

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

const entryTypes = [
    {type:'Planting', category: 'PlantRelated'},
    {type:'Harvesting', category: 'PlantRelated'},
    {type:'Tillage'}
];

// <SingleDatePicker
//   date={date}
//   onDateChange={(date) => {
//     patchNewEntry({date});
//     focusNewEntryDatePicker({focused: false});
//   }}
//   focused={dateFocused}
//   onFocusChange={focusNewEntryDatePicker}
//   id="addEntryModal__date-picker"
// />

const entryTypeCategories = new Map(entryTypes.map(({type,category}) => [type, category]));

const isPlantRelated = (type) => entryTypeCategories.get(type) === 'PlantRelated';

const plants = [
    {name: 'Wheat'},
    {name: 'Rye'},
    {name: 'Soy'},
    {name: 'Corn'},
    {name: 'Buckwheat'}
];

class AddEntryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          completed: false
        };
    }

    render() {
        const {open, onClose, entry, patchNewEntry, dateFocused, focusNewEntryDatePicker, theme, map, polygons} = this.props;
        const {type, species, date} = entry;
        const {features, selected} = map;

        let selectedPolygon = null;
        const combinedFeatures = polygons ? polygons.concat(features) : features;

        if (combinedFeatures && combinedFeatures.length) {
          combinedFeatures.forEach((feature) => {
            if (selected[feature.id]) {
              selectedPolygon = feature;
            }
          });
        }

        const styles = {
          primaryColor: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
          accent: {
            blue: theme.palette.accent.blue,
            yellow: theme.palette.accent.yellow
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
               onClose={onClose}
               onRendered={() => {
                   const now = moment().format();
                   patchNewEntry({date: now});
               }}>
                <div className="modal-add-entry">
                  <div style={{margin: "25px"}}>
                      {selectedPolygon
                        ?
                        <div>
                          <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily, margin: "15px"}}>
                            {"Report an activity or observation\nfor the selected plot"}
                          </Typography>
                          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, marginRight: "25px"}}>
                              {selectedPolygon.name}
                            </Typography>
                            <PolygonIcon polygon={selectedPolygon}/>
                          </div>
                          <div style={{margin: "25px"}}>
                            <form noValidate>
                              <TextField
                                id="date"
                                label="Date of Activity"
                                type="date"
                                defaultValue={moment().format("YYYY-MM-DD")}
                                className={""}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={(e) => {
                                  const happened_at = moment(e.target.value).format();
                                  patchNewEntry({date: happened_at});
                                }}
                              />
                            </form>
                          </div>
                          <div>
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
                                {( logEntry, {data}) => (
                                  <Button onClick={() => {
                                    logEntry({variables: {type: type, polygon: selectedPolygon, species: species, happenedAt: date }});
                                    onClose();
                                  }}
                                    style={{
                                      margin: "25px",
                                      backgroundColor: styles.accent.blue,
                                      fontFamily: styles.fontFamily,
                                      color: styles.primaryColor.color}}>
                                    Submit</Button>
                                )}
                              </Mutation>
                            : null
                          }
                        </div>
                        :
                        <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily}}>
                          {"Please select a plot to save an activity or observation."}
                        </Typography>
                      }
                  </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = ({ newEntry, map }) => ({
    entry: newEntry.entry,
    dateFocused: newEntry.datePickerFocus,
    map: map,
});

const mapDispatchToProps = (dispatch) => {
    const { patchNewEntry, focusNewEntryDatePicker } = newEntryActions;
    return bindActionCreators({ patchNewEntry, focusNewEntryDatePicker }, dispatch);
};

export default withTheme()(connect(mapStateToProps, mapDispatchToProps)(AddEntryModal));
