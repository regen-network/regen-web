import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './AddEntryModal.css';

class AddEntryModal extends React.Component {
    render() {
        const {open, onClose} = this.props;

        return (
            <Modal open={open} onClose={onClose}>
                <div className="modal-add-entry">
                    Hello World!
                </div>
            </Modal>
        );
    }
}

export default AddEntryModal;

