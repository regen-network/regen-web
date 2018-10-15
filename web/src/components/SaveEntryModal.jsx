import React, { Component } from 'react';
import './AddEntryModal.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { actions as entryActions } from "../actions/entry";
import { actions as mapActions } from "../actions/map";
import { actions as authActions } from "../actions/auth";
import Modal from '@material-ui/core/Modal';
import PolygonIcon from './polygonIcon';
import SavePolygonName from "./polygonModal/savePolygonName";
import ChoosePolygonFeatures from "./polygonModal/choosePolygonFeatures";
import ChoosePolygonPractices from "./polygonModal/choosePolygonPractices";
import PolygonCropHistory from "./polygonModal/polygonCropHistory";

class SavePolygonModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          stage: 0
        };
    }

    handleNameChange = name => event => {
      this.setState({
        [name]: event.target.value
      });
    };

    updateStage = () => {
      let current = this.state.stage;
      this.setState({stage: current < 3 ? current + 1 : 0});
    }

    render() {
        const {open, onClose, entry, patchNewEntry, theme, authenticated, clearSelected, optimisticSaveFeature, user, login, clearEntry} = this.props;
        const { currentFeature } = entry;

        const styles = {
          primaryColor: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
          accent: {
            blue: theme.palette.accent.blue,
            yellow: theme.palette.accent.yellow,
            red: theme.palette.accent.red
          },
          fontFamily: theme.fontFamily,
          fontSize: "16px",
          title: {
            fontFamily: theme.title.fontFamily,
            fontSize: "24px"
          }
        };

        const renderStage = (stage) => {
            switch(stage) {
              case 0:
                return <SavePolygonName
                      styles={styles}
                      handleNameChange={this.handleNameChange}
                      name={this.state.name}
                      user={user}
                      currentFeature={currentFeature}
                      optimisticSaveFeature={optimisticSaveFeature}
                      clearSelected={clearSelected}
                      updateStage={this.updateStage} />;
              case 1:
                return <ChoosePolygonFeatures
                      styles={styles}
                      currentFeature={currentFeature}
                      updateStage={this.updateStage} />;
              case 2:
                return <ChoosePolygonPractices
                      styles={styles}
                      currentFeature={currentFeature}
                      updateStage={this.updateStage} />;
              case 3:
                return <PolygonCropHistory
                      styles={styles}
                      entry={entry}
                      patchNewEntry={patchNewEntry}
                      currentFeature={currentFeature}
                      updateStage={this.updateStage}
                      clearEntry={clearEntry}
                      onClose={onClose} />;
              default:
                console.log("err in stages");
            }
        }

        return (
            <Modal open={open}
               onClose={() => {
                 this.setState({
                   name: "",
                   stage: 0
                 });
                 onClose();
               }}>
                <div className="modal-add-entry">
                  <div style={{margin: "25px"}}>
                      { authenticated
                        ?
                        <div>
                          <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily, margin: "15px"}}>
                            {"Tell us about this parcel"}
                          </Typography>
                          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            {
                              this.state.name ?
                              <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, marginRight: "25px"}}>
                                {this.state.name}
                              </Typography>
                              : null
                            }
                            <PolygonIcon polygon={currentFeature}/>
                          </div>
                          {renderStage(this.state.stage)}
                        </div>
                        :
                        <div>
                          <Typography variant="title" style={{color: styles.accent.blue, fontFamily: styles.title.fontFamily}}>
                            {"Please log in to access this feature."}
                          </Typography>
                          <Button
                            onClick={() => login()}
                            style={{
                              marginTop: "25px",
                              backgroundColor: styles.primaryColor.backgroundColor,
                              fontFamily: styles.fontFamily,
                              color: styles.primaryColor.color}}>
                            Sign In
                          </Button>
                        </div>
                      }
                  </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = ({ entry, auth }) => ({
    entry: entry,
    authenticated: auth.authenticated,
});

const mapDispatchToProps = (dispatch) => {
    const { patchNewEntry, closeSaveEntryModal, clearEntry } = entryActions;
    const { optimisticSaveFeature, updateUnsavedFeatures } = mapActions;
    const { login } = authActions;
    return bindActionCreators({ patchNewEntry, closeSaveEntryModal, optimisticSaveFeature, updateUnsavedFeatures, login, clearEntry }, dispatch);
};

export default withTheme()(connect(mapStateToProps, mapDispatchToProps)(SavePolygonModal));
