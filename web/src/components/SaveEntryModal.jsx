import React, { Component } from 'react';
import './AddEntryModal.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { actions as entryActions } from "../actions/entry";
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Select from './Select.jsx';
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
          completed: false
        };
    }

    render() {
        const {open, onClose, entry, patchNewEntry, theme, polygon} = this.props;
        const {type, species, date} = entry;

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
                      {polygon
                        ?
                        <div>
                          <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily, margin: "15px"}}>
                            {"Tell us more about this parcel"}
                          </Typography>
                          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, marginRight: "25px"}}>
                              {polygon.name}
                            </Typography>
                            <PolygonIcon polygon={polygon}/>
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
                                    logEntry({variables: {type: type, polygon: polygon, species: species, happenedAt: date }});
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
                          {"Please log in to access this feature."}
                        </Typography>
                      }
                  </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = ({ entry }) => ({
    entry: entry.entry,
});

const mapDispatchToProps = (dispatch) => {
    const { patchNewEntry, closeSaveEntryModal } = entryActions;
    return bindActionCreators({ patchNewEntry, closeSaveEntryModal }, dispatch);
};

export default withTheme()(connect(mapStateToProps, mapDispatchToProps)(SavePolygonModal));
