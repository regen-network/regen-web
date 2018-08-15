import React from 'react';
import './AddEntryModal.css';
import Modal from '@material-ui/core/Modal';
import Select from './Select.jsx';

const entryTypes = [
    {type:'Planting', category: 'PlantRelated'},
    {type:'Harvesting', category: 'PlantRelated'},
    {type:'Tillage'}
];

const entryTypeCategories = new Map(entryTypes.map(({type,category}) => [type, category]));

const isPlantRelated = (type) => entryTypeCategories[type] === 'PlantRelated';

const plants = [
    {name:'Wheat'},
    {name:'Rye'},
    {name:'Soy'},
    {name:'Corn'},
    {name:'Buckwheat'},
]

class AddEntryModal extends React.Component {
    state = {
        type: null,
        species: null
    }

    onTypeSelected = (e) => this.setState({type:e.value});
    onSpeciesSelected = (e) => this.setState({species:e.value});

    render() {
        const {open, onClose} = this.props;
        const {type, species} = this.state;
        console.log(this.state);
        console.log(entryTypes);
        console.log(entryTypeCategories);

        return (
            <Modal open={open} onClose={onClose}>
                <div className="modal-add-entry">
                    <Select
                        options={entryTypes.map(({type}) => {return {value:type, label:type}})}
                        value={type}
                        onChange={this.onTypeSelected}
                    />
                    {isPlantRelated(type) ?
                       <Select
                           options={plants.map(({name}) => {return {value:name, label:name}})}
                           value={species}
                           onChange={this.onSpeciesSelected} /> : null
                    }
                </div>
            </Modal>
        );
    }
}

export default AddEntryModal;

