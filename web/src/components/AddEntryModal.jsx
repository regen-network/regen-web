import React from 'react';
import './AddEntryModal.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { actions as newEntryActions } from "../actions/newEntry";
import Modal from '@material-ui/core/Modal';
import Select from './Select.jsx';
import 'react-dates/initialize';
import { SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import * as moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import PolygonIcon from './polygonIcon';

const entryTypes = [
    {type:'Planting', category: 'PlantRelated'},
    {type:'Harvesting', category: 'PlantRelated'},
    {type:'Tillage'}
];

const entryTypeCategories = new Map(entryTypes.map(({type,category}) => [type, category]));

const isPlantRelated = (type) => entryTypeCategories.get(type) === 'PlantRelated';

const plants = [
    {name:'Wheat'},
    {name:'Rye'},
    {name:'Soy'},
    {name:'Corn'},
    {name:'Buckwheat'},
]

class AddEntryModal extends React.Component {
    render() {
        const {open, onClose, entry, patchNewEntry, dateFocused, focusNewEntryDatePicker, theme, map, polygons} = this.props;
        const {type, species, date, time} = entry;
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
            fontSize: "20px"
          }
        };

        return (
            <Modal open={open}
               onClose={onClose}
               onRendered={() => {
                   const now = moment();
                   patchNewEntry({date: now, time: now});
               }}>
                <div className="modal-add-entry">
                  <div style={{margin: "15px auto", textAlign: "center", width: "100%"}}>
                      {selectedPolygon
                        ?
                        <div>
                          <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily}}>
                            {"Report an activity or observation for the selected plot"}
                          </Typography>
                          <div>
                            <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily}}>
                              {selectedPolygon.name}
                            </Typography>
                            <PolygonIcon polygon={selectedPolygon}/>
                          </div>
                        </div>
                        :
                        <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily}}>
                          {"Please select a plot to save an activity or observation."}
                        </Typography>
                      }
                  </div>
                    <SingleDatePicker
                      date={date}
                        onDateChange={(date) => {
                          patchNewEntry({date});
                          focusNewEntryDatePicker({focused: false});
                        }}
                      focused={dateFocused}
                      onFocusChange={focusNewEntryDatePicker}
                      id="addEntryModal__date-picker"
                    />
                    <TimePicker
                      value={time}
                      onChange={(time) => patchNewEntry({time})}
                    />
                    <Select
                        options={entryTypes.map(({type}) => {return {value: type, label: type}})}
                        value={{value: type, label: type}}
                        onChange={(e) => patchNewEntry({type: e.value})}
                    />
                    {isPlantRelated(type) ?
                       <Select
                           options={plants.map(({name}) => {return {value: name, label: name}})}
                           value={{value: species, label: species}}
                           onChange={(e) => patchNewEntry({species: e.value})}
                       /> : null
                    }
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
