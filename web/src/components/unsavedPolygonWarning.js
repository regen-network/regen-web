import React, { Component } from 'react';
import './AddEntryModal.css';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

class UnsavedPolygonWarning extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { open, onClose, theme, logout } = this.props;

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
                {"You have unsaved parcels drawn on the map. Erase them and sign out?"}
              </Typography>
              <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Button
                  onClick={onClose}
                  style={{
                    marginTop: "25px",
                    backgroundColor: styles.accent.blue,
                    fontFamily: styles.font,
                    color: styles.primaryColor.color}}>
                  Cancel
                </Button>
                <Button
                  onClick={() => logout()}
                  style={{
                    marginTop: "25px",
                    backgroundColor: styles.primaryColor.backgroundColor,
                    fontFamily: styles.font,
                    color: styles.primaryColor.color}}>
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
      </Modal>
    );
  }
}

export default withTheme()(UnsavedPolygonWarning);
