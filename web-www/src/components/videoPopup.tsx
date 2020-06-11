import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import PlayIcon from 'web-components/lib/components/icons/PlayIcon';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'min-content',
    height: 'min-content',
    cursor: 'pointer',
    margin: '0 auto',
  },
  typography: {
    padding: theme.spacing(2),
  },
  play: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'relative',
    top: theme.spacing(6),
    left: theme.spacing(10),
    transform: 'translate(-50%, -50%)',
  },
  vid: {
    width: '50vw',
    height: '40vh',
  },
  close: {
    cursor: 'pointer',
    'font-size': '4rem',
    'z-index': 150,
    position: 'absolute',
    color: '#fff',
    left: '95vw',
    'font-family': 'sans-serif',
    top: '-34px',
  },
}));

export default function VideoPopup() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log('CLOSE');
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.play} onClick={handleOpen}>
        <PlayIcon width="60%" height="60%" className={classes.icon} />
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.vid}>
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
          <div className={classes.close} onClick={handleClose}>
            x
          </div>
        </div>
      </Modal>
    </div>
  );
}
