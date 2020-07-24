import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PlayIcon from 'web-components/lib/components/icons/PlayIcon';
import Modal from '@material-ui/core/Modal';

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
    [theme.breakpoints.up('sm')]: {
      width: '112px',
      height: '112px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '70px',
      height: '70px',
    },
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing(7.2),
      left: theme.spacing(7.6),
      width: theme.spacing(13.8025),
      height: theme.spacing(13.8025),
    },
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(4.8),
      left: theme.spacing(4.8),
      width: theme.spacing(8.6275),
      height: theme.spacing(8.6275),
    },
    transform: 'translate(-50%, -50%)',
    '& path': {
      position: 'relative',
      left: '4px',
    },
  },
  vid: {
    outline: 'none',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    height: '70%',
    width: '85%',
  },
}));

export default function VideoPopup() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.play} onClick={handleOpen}>
        <PlayIcon className={classes.icon} />
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.vid}>
          <iframe
            title="Kiss the Ground Video"
            src="https://player.vimeo.com/video/299326236?autoplay=1"
            style={{
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
