import { withStyles, DefaultTheme as Theme } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';

function arrowGenerator(): any {
  return {
    '&[data-popper-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-1.42em',
      marginLeft: 4,
      marginRight: 4,
      '&::before': {
        transformOrigin: '0 100%',
      },
    },
    '&[data-popper-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-1.42em',
      marginLeft: 4,
      marginRight: 4,
      '&::before': {
        transformOrigin: '100% 0',
      },
    },
    '&[data-popper-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-1.42em',
      height: '1em',
      width: '1.42em',
      marginTop: 4,
      marginBottom: 4,
      '&::before': {
        transformOrigin: '100% 100%',
      },
    },
    '&[data-popper-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-1.42em',
      height: '1em',
      width: '1.42em',
      marginTop: 4,
      marginBottom: 4,
      '&::before': {
        transformOrigin: '0 0',
      },
    },
  };
}

const CustomTooltip = withStyles((theme: Theme) => ({
  popper: {
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  tooltip: {
    color: theme.palette.info.dark,
    boxShadow: theme.shadows[4],
    background: theme.palette.grey[50],
    border: `1px solid ${theme.palette.grey[600]}`,
    borderRadius: '5px',
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(5.25),
      padding: `${theme.spacing(6)} ${theme.spacing(3.75)}`,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
      padding: `${theme.spacing(11.25)} ${theme.spacing(7.5)}`,
      maxWidth: theme.spacing(150),
    },
  },
  arrow: {
    color: theme.palette.grey[50],
    width: '2em',
    height: '1.42em',
    '&:before': {
      borderBottomRightRadius: '5px',
      border: `1px solid ${theme.palette.grey[600]}`,
    },
  },
  popperArrow: arrowGenerator(),
}))(Tooltip);

export default CustomTooltip;
