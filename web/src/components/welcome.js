import React from 'react';
import Modal from 'react-modal';
import { withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: true
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const { theme } = this.props;

    const styles = {
      content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: "0",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        font: theme.fontFamily
      },
      title: {
        font: theme.title.fontFamily
      },
      background: 'url("Topography_Pattern_Full.png") no-repeat center -200px',
    };

    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={styles}
          contentLabel="Welcome Modal"
        >
          <div style={{
            padding: "30px",
            textAlign: "center",
            background: styles.background,
            backgroundSize: "cover"
          }}>
            <img id="logo" src="white_splash.png" alt="logo link to regen.network"/>
            <h2 style={{fontFamily: styles.title.font}}>Welcome to Regen Network</h2>
            <div style={{fontFamily: styles.content.font, width: "300px", textAlign: "center", fontSize: "1.2em"}}>
              <p>This eco-app is a tool for farmers to share farm practices and geospatial data with the Regen science team.
            We promise to keep your information private as we use what you share with us to build a system that rewards you for ecological regeneration.</p>
            <p>Thanks for collaborating with us.</p>
            </div>
            <Button style={{color: styles.content.color, marginTop: "25px", border: "3px solid white", fontFamily: styles.title.font}} onClick={this.closeModal}>Let's Get Started</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withTheme()(Welcome);
