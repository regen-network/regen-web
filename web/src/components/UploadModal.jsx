import React, { Component } from 'react';
import './AddEntryModal.css';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';


class UploadModal extends React.Component {
    constructor(props) {
        super(props);

        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(e) {
        e.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('accessToken', this.props.accessToken);

        console.log("accessToken=",this.props.accessToken);

        fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: data,
        }).then((res) => {
            this.props.refetch;
        });
        this.props.onClose();
    }

    componentWillMount() {
        console.log("component iwll mount");
        this.host = "localhost:5000";
    }

    render() {
        const {open, onClose, theme, accessToken, refetch } = this.props;

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
                    {"Select a .kmz file."}

                     <input
                       accept=".kmz"
                       style={{ display: 'none' }}
                       id="raised-button-file"
                       type="file"
                       ref={(ref) => { this.uploadInput = ref; }}
                     />
                       <br/>
                     <label htmlFor="raised-button-file">
                       <Button variant="raised" component="span">
                         Upload
                       </Button>
                     </label>

                     <br/>
                     <Button variant="raised" type="submit" onClick={this.handleUpload} >
                       Submit
                     </Button>

                  </Typography>

                </div>
              </div>
            </Modal>
        );
    }
}

export default withTheme()(UploadModal);
