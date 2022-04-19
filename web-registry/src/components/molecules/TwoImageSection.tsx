import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import { Label } from 'web-components/lib/components/typography';
import { Image } from 'web-components/lib/components/image';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { DualImageSection } from '../../generated/sanity-graphql';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
  },
  amount: {
    textShadow: theme.shadows[4],
    lineHeight: '130%',
    color: theme.palette.primary.main,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(20),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(25),
    },
  },
  labelContainer: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(1.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(2.5),
    },
  },
  item: {
    [theme.breakpoints.down('sm')]: {
      '&:first-child': {
        padding: `${theme.spacing(34.25)} 0`,
      },
      padding: `${theme.spacing(30)} 0`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(60.5)} 0`,
    },
  },
  titleContainer: {
    position: 'absolute',
    background: theme.palette.primary.main,
    opacity: 0.8,
    zIndex: 1,
    borderRadius: '2px',
    boxShadow: theme.shadows[4],
    transform: 'translateX(-50%)',
    left: '50%',
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing(11),
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      top: theme.spacing(5),
      padding: `${theme.spacing(3.5)} ${theme.spacing(3)}`,
      width: '95%',
    },
  },
}));

const GreenLabel = styled(Label)(({ theme }) => ({
  fontSize: theme.spacing(4.5),
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '2px',
  color: theme.palette.primary.main,
  padding: theme.spacing(1, 2.5),
  display: 'inline-block',
}));
interface Props {
  content: DualImageSection;
}

const TwoImageSection: React.FC<Props> = ({ content }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <div className={classes.titleContainer}>
        <Label sx={{ color: 'info.dark', fontSize: { xs: 14, sm: 21 } }}>
          {content?.title}
        </Label>
      </div>
      <Grid item xs={12} sm={6}>
        <Image
          backgroundImage
          src={content?.left?.image?.image?.asset?.url || ''}
        >
          <div className={classes.item}>
            <Typography className={classes.amount}>
              {content?.left?.boldText}
            </Typography>
            <div className={classes.labelContainer}>
              <GreenLabel>{content?.left?.label}</GreenLabel>
            </div>
          </div>
        </Image>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Image
          backgroundImage
          src={content?.right?.image?.image?.asset?.url || ''}
        >
          <div className={classes.item}>
            <Typography className={classes.amount}>
              {content?.right?.boldText}
            </Typography>
            <div className={classes.labelContainer}>
              <GreenLabel>{content?.right?.label}</GreenLabel>
            </div>
          </div>
        </Image>
      </Grid>
    </Grid>
  );
};

export { TwoImageSection };
