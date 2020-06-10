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
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.play}>
        <PlayIcon width="60%" height="60%" className={classes.icon} />
      </div>
      <Modal
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
      </Modal>
    </div>
  );
}
