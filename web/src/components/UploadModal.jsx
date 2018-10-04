import React, { Component } from 'react';
import './AddEntryModal.css';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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

        fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: data,
        }).then((res) => {
            console.log("res=",res);
            console.log("data=",data);
            console.log("accessToken=",this.props.accessToken);
        });
    }

    componentWillMount() {
        console.log("component iwll mount");
        this.host = "localhost:5000";
    }

    render() {
        const {open, onClose, theme, accessToken } = this.props;
        console.log("accessToken=",accessToken);
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
                    {"Be my modal please."}

                    <form encType="multipart/form-data" onSubmit={this.handleUpload} >
                      <div>
                        <input ref={(ref) => { this.uploadInput = ref; }} type="file" accept=".kml" />
                        <input type="hidden" ref={(input) => { this.actionInput = input }} name="accessToken" value="{accessToken}"/>
                      </div>
                      <br />
                      <div>
                        <input type="submit"/>
                      </div>
                    </form>

                  </Typography>
                </div>
              </div>
            </Modal>
        );
    }
}

export default withTheme()(UploadModal);
