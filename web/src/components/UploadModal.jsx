import React from 'react';
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

        this.props.uploadKMZ(data);

        // fetch('/upload', {
        //     method: 'POST',
        //     body: data,
        // }).then((res) => {
        //     this.props.refetch;
        // });
        // this.props.onClose();
    }

    // componentWillMount() {
    //     this.host = "localhost:5000";
    // }

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
                  </Typography>

                     <input
                       accept=".kmz"
                       style={{ display: 'none' }}
                       id="button-file"
                       type="file"
                       name= {this.Input}
                       ref={(ref) => { this.uploadInput = ref; }}
                     />
                       <div style={{display: 'flex', justifyContent: 'space-around'}}>
                     <label htmlFor="button-file">
                       <Button  component="span"
                        style={{
                          marginTop: "25px",
                          backgroundColor: styles.primaryColor.backgroundColor,
                          fontFamily: styles.font,
                          color: styles.primaryColor.color}}>
                         Choose
                       </Button>
                     </label>

                     <Button type="submit" onClick={this.handleUpload}
                        style={{
                          marginTop: "25px",
                          backgroundColor: styles.primaryColor.backgroundColor,
                          fontFamily: styles.font,
                          color: styles.primaryColor.color}}>
                       Upload
                     </Button>
                     </div>


                </div>
              </div>
            </Modal>
        );
    }
}

export default withTheme()(UploadModal);
