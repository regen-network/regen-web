import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
    },
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(4.8),
      left: theme.spacing(4.8),
    },
    transform: 'translate(-50%, -50%)',
    '& path': {
      position: 'relative',
      left: '4px',
    },
  },
  vid: {
    display: 'inline-block',
	width: 'min-content',
	[theme.breakpoints.up('xs')]: {
		position: 'relative',
		top: '15vh',
		width: '100vw',
		height: '50vh',
	}
  },
  close: {
    cursor: 'pointer',
    'font-size': '4rem',
    'z-index': 150,
    position: 'fixed',
    color: '#fff',
	'font-family': 'sans-serif',
	[theme.breakpoints.down('sm')]: {
		left: '89vw',
		top: '10vh',
	},
	[theme.breakpoints.up('sm')]: {
		top: '5vh',
		left: '94.5vw',
	},
	[theme.breakpoints.down('xs')]: {

	}
  },
}));

export default function VideoPopup() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log('CLOSE');
    setOpen(false);
  };

  const desktop = useMediaQuery(theme.breakpoints.up('sm'));

  const playIconSize = desktop ? '55.21px' : '34.51px';

  return (
    <div className={classes.root}>
      <div className={classes.play} onClick={handleOpen}>
        <PlayIcon width={playIconSize} height={playIconSize} className={classes.icon} />
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
