import React, { Component } from 'react';
import './AddEntryModal.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { actions as entryActions } from "../actions/entry";
import Modal from '@material-ui/core/Modal';
import Select from './Select.jsx';
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

class AddEntryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          completed: false
        };
    }

    render() {
        const {open, onClose, entry, patchNewEntry, theme, map, polygons} = this.props;
        const {type, species, date} = entry.entry;
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

        const ModalContent = () => {
          let modalContent;

          if (!selectedPolygon) {
            modalContent =
              <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily}}>
                {"Please select a parcel to save an activity or observation."}
              </Typography>
          }
          else if (!selectedPolygon.name && !selectedPolygon.saved) {
              modalContent =
                <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily}}>
                  {"Please save the parcel to add an activity or observation."}
                </Typography>
          }
          else {
              modalContent =
                <div>
                  <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily, margin: "15px"}}>
                    {"Report an activity or observation\nfor the selected parcel"}
                  </Typography>
                  <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, marginRight: "25px"}}>
                      {selectedPolygon.name}
                    </Typography>
                    <PolygonIcon polygon={selectedPolygon}/>
                  </div>
                  <div style={{margin: "25px"}}>
                    <DatePicker
                        selected={date}
                        onChange={(date) => {
                          patchNewEntry({date});
                        }}/>
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
                        {( logEntry, {loading, error}) => (
                          <div>
                            {error ? <p style={{color: styles.accent.red}}>"There was an error saving your update. Please try again."</p> : null}
                            <Button onClick={() => {
                              logEntry({variables: {type: type, polygon: selectedPolygon, species: species, happenedAt: date }});
                              onClose();
                              this.setState({completed: false});
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
            }

            return modalContent;
          };

        return (
            <Modal open={open}
               onClose={onClose}>
                <div className="modal-add-entry">
                  <div style={{margin: "25px"}}>
                    <ModalContent />
                  </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = ({ entry, map }) => ({
    entry: entry,
    map: map
});

const mapDispatchToProps = (dispatch) => {
    const { patchNewEntry } = entryActions;
    return bindActionCreators({ patchNewEntry }, dispatch);
};

export default withTheme()(connect(mapStateToProps, mapDispatchToProps)(AddEntryModal));
