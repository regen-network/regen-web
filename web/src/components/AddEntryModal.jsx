import React from 'react';
import './AddEntryModal.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as newEntryActions } from "../actions/newEntry";
import Modal from '@material-ui/core/Modal';
import Select from './Select.jsx';

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
        const {open, onClose, entry, patchNewEntry} = this.props;
        const {type, species} = entry;

        return (
            <Modal open={open} onClose={onClose}>
                <div className="modal-add-entry">
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
    entry: newEntry.entry
});

const mapDispatchToProps = (dispatch) => {
    const { patchNewEntry } = newEntryActions;
    return bindActionCreators({ patchNewEntry }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEntryModal);

