import React, { Component } from 'react';
import './AddEntryModal.css';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import GoogleDrive from '@uppy/google-drive';
import DragDrop from '@uppy/drag-drop';
import Tus from '@uppy/tus';
//import 'uppy/dist/uppy.css';


class UploadModal extends React.Component {
//    const {open, onClose, theme, importedFile} = this.props;
//    private readonly inputOpenFileRef : RefObject<HTMLInputElement>
    constructor (props) {
        super(props);
    }
//        this.handleSubmit.bind(this);
//        this.inputRef = React.createRef();


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
        this.host = "localhost:5000";
// only for debugging. Change to an FP statement later.
/*
    const uppy = Uppy({
        autoProceed: false,
        restrictions: {
            maxFileSize: 1000000,
            maxNumberOfFiles: 10,
            minNumberOfFiles: 1,
            allowedFileTypes: false
        }
    });

    uppy.use(Tus, { endpoint: 'localhost:5000/upload' });
        console.log(Dashboard);
        uppy.use(Dashboard, {
            target: 'body',
            inline: true
        });
*/
    }

    render() {
        const {open, onClose, theme} = this.props;
        {console.log("rendering UploadModal")}

    const styles = {
      primaryColor: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
      accent: {
        blue: theme.palette.accent.blue
      },
      font: theme.title.fontFamily
    };

        return (

            <Modal open={open}
                   onClose={onClose}>
              <div className="modal-add-entry">
                <div style={{margin: "25px"}}>
                  <Typography variant="title" style={{fontFamily: styles.font}}>
                    {"thank you. Be my modal please."}
                  </Typography>
                  <div>
                    <input type="file"/>
                  </div>
                </div>
                </div>
            </Modal>
        );
    }
}

export default withTheme()(UploadModal);
