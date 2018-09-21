import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

class Welcome extends React.Component {

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

    // SAVING FOR LATER
    // <div style={{
    //   padding: "30px",
    //   textAlign: "center",
    //   background: styles.background,
    //   backgroundSize: "cover"
    // }}>
    //   <img id="logo" src="white_splash.png" alt="logo link to regen.network"/>
    //   <h2 style={{fontFamily: styles.title.font, margin: "0 auto"}}>Welcome to Regen Network</h2>
    //   <div style={{fontFamily: styles.content.font, width: "300px", textAlign: "center", fontSize: "1.2em", margin: "0 auto"}}>
    //     <p>This eco-app is a tool for farmers to share farm practices and geospatial data with the Regen science team.
    //   We promise to keep your information private as we use what you share with us to build a system that rewards you for ecological regeneration.</p>
    //     <p>Thanks for collaborating with us.</p>
    //   </div>
    //   <Button style={{color: styles.content.color, marginTop: "25px", border: "3px solid white", fontFamily: styles.title.font}} onClick={this.closeModal}>Get Started</Button>
    // </div>


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
                <div style={{background: styles.background.commons, backgroundSize: "cover", width: "275px", borderRadius: "3px", margin: "5px", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.47)"}}>
                    <div style={{backgroundColor: styles.content.backgroundColor, height: "150px", marginTop: "170px", padding: "8px", overflow: "hidden"}}>
                        <Typography variant="title" style={{color: styles.content.color, fontFamily: styles.title.font, fontSize: "20px", margin: "10px auto"}}>
                          Data Commons
                        </Typography>
                        <Typography variant="subheading" style={{color: styles.content.color, fontFamily: styles.content.font, fontSize: "16px", margin: "10px auto"}}>
                          Share or sell information on your ranch and find the data you need to help you manage your ranch.
                        </Typography>
                    </div>
                </div>
                <div style={{background: styles.background.projects, backgroundSize: "cover", width: "275px", borderRadius: "3px", margin: "5px", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.47)"}}>
                    <div style={{backgroundColor: styles.content.backgroundColor, height: "150px", marginTop: "170px", padding: "8px", overflow: "hidden"}}>
                        <Typography variant="title" style={{color: styles.content.color, fontFamily: styles.title.font, fontSize: "20px", margin: "10px auto"}}>
                          Ranching Projects
                        </Typography>
                        <Typography variant="subheading" style={{color: styles.content.color, fontFamily: styles.content.font, fontSize: "16px", margin: "10px auto"}}>
                          Browse projects you qualify for or start your own project, and earn more money.
                        </Typography>
                    </div>
                </div>
                <div style={{background: styles.background.community, backgroundSize: "cover", width: "275px", borderRadius: "3px", margin: "5px", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.47)"}}>
                    <div style={{backgroundColor: styles.content.backgroundColor, height: "150px", marginTop: "170px", padding: "8px", overflow: "hidden"}}>
                        <Typography variant="title" style={{color: styles.content.color, fontFamily: styles.title.font, fontSize: "20px", margin: "10px auto"}}>
                          Join the Community
                        </Typography>
                        <Typography variant="subheading" style={{color: styles.content.color, fontFamily: styles.content.font, fontSize: "16px", margin: "10px auto"}}>
                          Connect with other ranchers like you and with funding organizations in the world of ranching.
                        </Typography>
                    </div>
                </div>
              </div>
              <Button
                style={{backgroundColor: styles.content.green, color: "#fff", marginTop: "25px", fontFamily: styles.content.font}}
                onClick={onClose}>Get Started</Button>
            </div>
         </div>
      </Modal>
    );
  }
}

export default withTheme()(Welcome);
