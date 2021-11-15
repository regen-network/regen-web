import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Typography from '@mui/material/Typography';

import Card from './Card';
// import VerifiedIcon from '../icons/VerifiedIcon';

export interface ImpactCardProps {
  name: string;
  description: JSX.Element | string;
  imgSrc: string;
  monitored?: boolean;
  largeFontSize?: boolean;
}

interface StyleProps {
  imgSrc: string;
  monitored: boolean;
  largeFontSize: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  background: props => ({
    backgroundImage: `url(${props.imgSrc})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top',
    backgroundColor: theme.palette.grey['200'],
    textAlign: 'center',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      backgroundSize: props.monitored ? 'auto 70%' : '100% auto',
    },
    [theme.breakpoints.down('sm')]: {
      backgroundSize: '100% auto',
    },
    height: '100%',
  }),
  text: props => ({
    [theme.breakpoints.up('sm')]: {
      paddingLeft: props.monitored ? theme.spacing(14.5) : theme.spacing(3.75),
      paddingRight: props.monitored ? theme.spacing(14.5) : theme.spacing(3.75),
      paddingBottom: props.monitored ? theme.spacing(12.5) : theme.spacing(6),
      paddingTop: props.monitored ? theme.spacing(63.75) : theme.spacing(45.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: props.monitored ? theme.spacing(5) : theme.spacing(3.75),
      paddingRight: props.monitored ? theme.spacing(5) : theme.spacing(3.75),
      paddingBottom: props.monitored ? theme.spacing(8) : theme.spacing(1.5),
      paddingTop: props.monitored ? theme.spacing(33.75) : theme.spacing(28.5),
    },
    position: 'relative',
  }),
  name: props => ({
    [theme.breakpoints.up('sm')]: {
      fontSize: props.largeFontSize || props.monitored ? '1.5rem' : '1.125rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: props.largeFontSize || props.monitored ? '1.375rem' : '1rem',
    },
    fontWeight: 'bold',
  }),
  description: props => ({
    [theme.breakpoints.up('sm')]: {
      fontSize:
        props.largeFontSize || props.monitored ? '1.125rem' : '0.875rem',
      paddingBottom: props.monitored ? theme.spacing(10) : theme.spacing(0),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: props.largeFontSize || props.monitored ? '1rem' : '0.875rem',
      paddingBottom: props.monitored ? theme.spacing(6.75) : theme.spacing(6),
    },
    paddingTop: props.monitored ? theme.spacing(3) : theme.spacing(2.25),
    color: theme.palette.info.dark,
  }),
  monitored: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: theme.typography.h1.fontFamily,
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    letterSpacing: theme.spacing(0.25),
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.75rem',
      paddingLeft: '10%',
      paddingRight: '10%',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.625rem',
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
    textAlign: 'left',
  },
  backgroundGradient: props => ({
    height: props.monitored ? '70%' : '85%',
    zIndex: 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background:
      'linear-gradient(180deg, rgba(250, 250, 250, 0) 2.48%, #FAFAFA 64.06%)',
  }),
  monitoredIcon: {
    // [theme.breakpoints.down('xs')]: {
    //   flexGrow: 0,
    //   maxWidth: '20%',
    //   flexBasis: '20%',
    // },
    paddingRight: theme.spacing(2),
  },
}));

export default function ImpactCard({
  name,
  description,
  imgSrc,
  monitored = false,
  largeFontSize = false,
}: ImpactCardProps): JSX.Element {
  const classes = useStyles({ imgSrc, monitored, largeFontSize });
  // const theme = useTheme();
  return (
    <Card>
      <div className={classes.background}>
        <div className={classes.backgroundGradient} />
        <div className={classes.text}>
          <Typography className={classes.name}>{name}</Typography>
          <Typography className={classes.description}>{description}</Typography>
          {/*monitored && (
              <span className={classes.monitored}>
                <span className={classes.monitoredIcon}>
                  <VerifiedIcon color={theme.palette.secondary.main} />
                </span>
                verified and tracked on the regen ledger
              </span>
            )*/}
        </div>
      </div>
    </Card>
  );
}
