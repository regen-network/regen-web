import React from 'react';
import './AddEntryModal.css';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';


class UploadModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          fileName: ""
        };

        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(e) {
        e.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('accessToken', this.props.accessToken);

        this.props.uploadKMZ(data);
        this.props.refetch();
    }

    render() {
        const {open, onClose, theme, uploadError } = this.props;

        const styles = {
          primaryColor: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
          accent: {
            blue: theme.palette.accent.blue,
            red: theme.palette.accent.red
          },
          font: theme.title.fontFamily
        };

        return (
            <Modal open={open}
                   onClose={onClose}>
              <div className="modal-add-entry">
                <div style={{margin: "25px"}}>
                  <Typography variant="title" style={{fontFamily: styles.font}}>
                    {this.state.fileName ? `Click Upload to import ${this.state.fileName}` : "Select a .kmz file."}
                  </Typography>
                  <Typography variant="subheading" style={{fontFamily: styles.font, color: styles.accent.red}}>
                    {uploadError || null}
                  </Typography>
                    <input
                     accept=".kmz"
                     style={{ display: 'none' }}
                     id="button-file"
                     type="file"
                     name={this.Input}
                     ref={(ref) => {
                       this.uploadInput = ref; }}
                     onChange={() => {
                       if (this.uploadInput && this.uploadInput.files.length) {
                         this.setState({fileName: this.uploadInput.files[0].name})
                       }
                     }}
                    />
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                       <label htmlFor="button-file">
                         <Button component="span"
                          style={{
                            marginTop: "25px",
                            backgroundColor: styles.primaryColor.backgroundColor,
                            fontFamily: styles.font,
                            color: styles.primaryColor.color}}>
                           Choose
                         </Button>
                       </label>
                       {this.state.fileName ?
                       <Button type="submit" onClick={this.handleUpload}
                          style={{
                            marginTop: "25px",
                            backgroundColor: styles.primaryColor.backgroundColor,
                            fontFamily: styles.font,
                            color: styles.primaryColor.color}}>
                         Upload
                       </Button> : null }
                  </div>
                </div>
              </div>
            </Modal>
        );
    }
}

export default withTheme()(UploadModal);
