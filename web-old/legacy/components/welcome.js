import React, { Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import './welcome.css';

class WelcomeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  toggleHover = () => {
    let currentHover = this.state.hover;
    this.setState({
      hover: !currentHover
    });
  }

  render() {
    const { styles, background, text } = this.props;

    return (
      <div style={{background: background, backgroundSize: "cover"}}
        className="welcome__paper">
          <div className="welcome__card" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
            {
              this.state.hover ?
              <div className="welcome__comingsoon">
                  <Typography variant="title" style={{color: styles.content.color, fontFamily: styles.title.font, fontSize: "20px", margin: "10px auto"}}>
                    Coming Soon
                  </Typography>
              </div>
              :
              <div>
                  <Typography variant="title" style={{color: styles.content.color, fontFamily: styles.title.font, fontSize: "20px", margin: "10px auto"}}>
                    {text.title}
                  </Typography>
                  <Typography variant="subheading" style={{color: styles.content.color, fontFamily: styles.content.font, fontSize: "16px", margin: "10px auto"}}>
                    {text.body}
                  </Typography>
              </div>
            }
          </div>
      </div>
    );
  }
}

class Welcome extends Component {

  // Link removed for now as Invision page 'Over Quota'
  gotoInvisionDemo = () => {
      window.open(
        'https://projects.invisionapp.com/share/3VO8HG8M4D8#/screens/321828395_Landing_Screen_2'
      );
  }

  render() {
    const { theme, open, onClose, user } = this.props;

    const styles = {
      content: {
        height: "80vh",
        width: "70vw",
        marginLeft: "15vw",
        marginTop: "10vh",
        padding: "0",
        backgroundColor: theme.palette.common.light,
        color: theme.palette.common.grey,
        green: theme.palette.primary.main,
        font: theme.fontFamily,
        borderRadius: "3px"
      },
      title: {
        font: theme.title.fontFamily
      },
      background: {
        topo: 'url("Topography_Pattern_Full.png") no-repeat center -200px',
        commons: 'url("background-commons.jpg") no-repeat center -100px',
        projects: 'url("background-projects.jpg") no-repeat center -25px',
        community: 'url("background-community.jpg") no-repeat center -75px',
      }
    };

    const cards = {
      commons: {
        title: "Data Commons",
        body: "Share or sell information on your ranch and find the data you need to help you manage your ranch."
      },
      projects: {
        title: "Ranching Projects",
        body: "Browse projects you qualify for or start your own project, and earn more money."
      },
      community: {
        title: "Join the Community",
        body: "Connect with other ranchers like you and with funding organizations in the world of ranching."
      }
    }

    return (
      <Modal open={open}
         onClose={onClose}>
         <div style={styles.content}>
            <div style={{padding: "25px", textAlign: "center"}}>
              {
                user ?
                <Typography variant="title" style={{color: styles.content.green, fontFamily: styles.title.font, fontSize: "20px", margin: "10px auto"}}>
                  Hi {user.given_name} {user.family_name}.
                </Typography>
                : null
              }
              <Typography variant="title" style={{color: styles.content.color, fontFamily: styles.content.font, fontSize: "20px", margin: "10px auto"}}>
                Welcome to <span style={{fontFamily: styles.title.font}}>Regen Network</span>.
              </Typography>
              <Typography variant="title" style={{color: styles.content.color, fontFamily: styles.content.font, fontSize: "20px", margin: "10px auto"}}>
                Click Get Started to set up the app for your ranch.
              </Typography>
              <div style={{display: "flex", justifyContent: "center"}}>
                <WelcomeCard styles={styles} background={styles.background.commons} text={cards.commons} />
                <WelcomeCard styles={styles} background={styles.background.projects} text={cards.projects} />
                <WelcomeCard styles={styles} background={styles.background.community} text={cards.community} />
              </div>
              <Button
                style={{marginTop: "25px", fontFamily: styles.content.font}}
                onClick={onClose}
                variant="contained"
                color="primary">Get Started</Button>
            </div>
         </div>
      </Modal>
    );
  }
}

export default withTheme()(Welcome);
