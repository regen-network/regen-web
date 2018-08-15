import React from 'react';
import './AddEntryModal.css';
import Modal from '@material-ui/core/Modal';
import Select from './Select.jsx';

const entryTypes = [
    'Planting',
    'Harvesting',
    'Tillage'
];

class AddEntryModal extends React.Component {
    state = {
        type: null
    }

    onTypeSelected = (v) => this.setState({type:v});

    render() {
        const {open, onClose} = this.props;
        const {type} = this.state;

        return (
            <Modal open={open} onClose={onClose}>
                <div className="modal-add-entry">
                    <Select
                        options={entryTypes.map(t => {return {value:t, label:t}})}
                        value={type}
                        onChange={this.onTypeSelected}
                    />
                </div>
            </Modal>
        );
    }
}

export default AddEntryModal;

