import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';


class UploadModal extends React.Component {
//    const {open, onClose, theme, importedFile} = this.props;
//    private readonly inputOpenFileRef : RefObject<HTMLInputElement>

    constructor (props) {
        super(props);
        this.handleSubmit.bind(this);
        this.inputRef = React.createRef();

    }
    handleSubmit(e) {
        e.preventDefault();
        alert(
            `Selected file - ${
        this.fileInput.current.files[0].name
      }`
        );
    }

    componentWillMount() {
        console.log("component iwll mount");
    }

    render() {
        const {open, onClose} = this.props;
        {console.log("rendering UploadModal")}
        return (
            <Modal open={open}
               onClose={onClose}>
                <div id="uploadModal">
                  <p>here is some stuff</p>
                </div>
            </Modal>
        );
    }
}

export default (UploadModal);
