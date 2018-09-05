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
      white: theme.palette.common.white,
      color: theme.palette.accent.blue,
      font: theme.title.fontFamily
    };

    return (
      <Modal open={open}
         onClose={onClose}>
          <div className="modal-add-entry">
            <div style={{margin: "25px"}}>
              <Typography variant="title" style={{color: styles.color, fontFamily: styles.font}}>
                {"You have unsaved parcels drawn on the map. Erase them and sign out?"}
              </Typography>
              <Button
                onClick={() => logout()}
                style={{
                  marginTop: "25px",
                  backgroundColor: styles.color,
                  fontFamily: styles.font,
                  color: styles.white}}>
                Sign Out
              </Button>
            </div>
          </div>
      </Modal>
    );
  }
}

export default withTheme()(UnsavedPolygonWarning);
