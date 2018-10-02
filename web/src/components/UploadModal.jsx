import React, { Component } from 'react';
import './AddEntryModal.css';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import Uppy from '@uppy/core';
import Dashboard from '@uppy/react/lib/Dashboard';
import DashboardModal from '@uppy/react/lib/DashboardModal';
import DragDrop from '@uppy/react/lib/DragDrop';
import GoogleDrive from '@uppy/google-drive';
import Tus from '@uppy/tus';
import '@uppy/dashboard/dist/style.css';

class UploadModal extends React.Component {
    constructor (props) {
        super(props);

        const uppy = Uppy({
            target: "body",
            autoProceed: false,
            inline: true,
            restrictions: {
                maxFileSize: 1000000,
                maxNumberOfFiles: 10,
                minNumberOfFiles: 1,
                allowedFileTypes: false
            }
        });

        uppy.use(Tus, { endpoint: '/upload' });

        uppy.on('complete', (result) => {
            const url = result.successful[0].uploadURL
        })

        uppy.use(DragDrop, {target: 'body'});

        uppy.run();

    }
    handleUploadModalOpen = () => this.setState({ modalOpen: true });
    handleUploadModalClose = () => this.setState({ modalOpen: false });


    componentWillMount() {
        console.log("component iwll mount");
        this.host = "localhost:5000";

    }

    render() {
        const {open, onClose, theme} = this.props;
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
          <div>
            <DragDrop
              uppy={this.uppy}
              locale={{
                  strings: {
                      chooseFile: 'Pick a new avatar'
                  }
              }}
              />
          </div>
        );
    }
}

export default withTheme()(UploadModal);
