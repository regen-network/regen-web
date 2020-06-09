import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import BackgroundImage from 'gatsby-background-image';

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    width: 'min-content',
    margin: '0 auto',
  },
  typography: {
    padding: theme.spacing(2),
  },
  icon: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    top: '50%',
    left: '54%',
    transform: 'translate(-50%, -50%)',
  },
  vid: {
    width: '50vw',
    height: '40vh',
  },
}));

export default function VideoPopup() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <StaticQuery
      query={graphql`
        query {
          play: file(relativePath: { eq: "play.png" }) {
            childImageSharp {
              fixed(quality: 90, width: 45) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
          whiteEllipse: file(relativePath: { eq: "white-ellipse.png" }) {
            childImageSharp {
              fixed(quality: 90, width: 100) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <div className={classes.root} onClick={handleClick}>
            <BackgroundImage Tag="div" fixed={data.whiteEllipse.childImageSharp.fixed}>
              <Img
                fixed={data.play.childImageSharp.fixed}
                style={{ position: 'absolute' }}
                className={classes.icon}
              ></Img>
            </BackgroundImage>
            <Popover
              id={id}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <div className={classes.vid} style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                <iframe
                  title="Kiss the Ground Video"
                  src="https://player.vimeo.com/video/299326236?autoplay=1"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  frameBorder={0}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            </Popover>
          </div>
        );
      }}
    />
  );
}
