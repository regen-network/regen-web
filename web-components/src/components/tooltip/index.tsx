import { withStyles, Theme } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

function arrowGenerator(): any {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-1.42em',
      marginLeft: 4,
      marginRight: 4,
      '&::before': {
        transformOrigin: '0 100%',
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-1.42em',
      marginLeft: 4,
      marginRight: 4,
      '&::before': {
        transformOrigin: '100% 0',
      },
    },
    '&[x-placement*="right"] $arrow': {
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
    '&[x-placement*="left"] $arrow': {
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

const CustomTooltip: any = withStyles((theme: Theme) => ({
  tooltip: {
    color: theme.palette.info.dark,
    boxShadow: theme.shadows[3],
    background: theme.palette.grey[50],
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: '5px',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5.25),
      padding: theme.spacing(3.75),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
      maxWidth: '90vw',
      left: '-5vw',
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
    },
  },
  popperArrow: arrowGenerator(),
}))(Tooltip);

export default CustomTooltip;
