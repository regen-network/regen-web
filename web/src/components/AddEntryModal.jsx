import React from 'react';
import './AddEntryModal.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as newEntryActions } from "../actions/newEntry";
import Modal from '@material-ui/core/Modal';
import Select from './Select.jsx';
import 'react-dates/initialize';
import { SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import * as moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

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
        const {open, onClose, entry, patchNewEntry, dateFocused, focusNewEntryDatePicker} = this.props;
        const {type, species, date, time} = entry;

        return (
            <Modal open={open}
                   onClose={onClose}
                   onRendered={() =>
                       {
                           const now = moment();
                           patchNewEntry({date:now, time: now});
                       }}
            >
                <div className="modal-add-entry">
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
                        options={entryTypes.map(({type}) => {return {value:type, label:type}})}
                        value={{value:type,label:type}}
                        onChange={(e) => patchNewEntry({type:e.value})}
                    />
                    {isPlantRelated(type) ?
                       <Select
                           options={plants.map(({name}) => {return {value:name, label:name}})}
                           value={{value:species,label:species}}
                           onChange={(e) => patchNewEntry({species:e.value})}
                       /> : null
                    }
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = ({ newEntry }) => ({
    entry: newEntry.entry,
    dateFocused: newEntry.datePickerFocus
});

const mapDispatchToProps = (dispatch) => {
    const { patchNewEntry, focusNewEntryDatePicker } = newEntryActions;
    return bindActionCreators({ patchNewEntry, focusNewEntryDatePicker }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEntryModal);

