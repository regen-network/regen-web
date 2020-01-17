import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
// import Grid from '@material-ui/core/Grid';
import Title from '../title';

interface TimelineItemProps {
  date: string;
  title: string;
  description?: string;
  color: string;
}

interface StyleProps {
  color: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {},
  content: {
    width: '50%',
    // marginRight: '30px',
    position: 'relative',
    border: `1px solid ${theme.palette.info.light}`,
    borderRadius: '10px',
    paddingTop: theme.spacing(4.75),
    paddingRight: theme.spacing(5.5),
    paddingBottom: theme.spacing(6.25),
    paddingLeft: theme.spacing(5),
    '&:after': {
      content: '""',
      borderRight: `1px solid ${theme.palette.info.light}`,
      borderTop: `1px solid ${theme.palette.info.light}`,
      borderRadius: '2px',
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      right: '-8px', // or left
      transform: 'rotate(45deg)',
      width: theme.spacing(4),
      height: theme.spacing(4),
      zIndex: 100,
    },
  },
  date: {
    color: '#8F8F8F',
    paddingBottom: theme.spacing(0.75),
  },
  description: {
    color: '#8F8F8F',
    fontSize: '0.875rem',
    paddingTop: theme.spacing(1.5),
  },
  circle: props => ({
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    border: `5px solid ${props.color}`,
    position: 'absolute',
    right: '-40px', // or left
    zIndex: 100,
    width: theme.spacing(3.75),
    height: theme.spacing(3.75),
  }),
}));

export default function TimelineItem({ date, title, description, color }: TimelineItemProps): JSX.Element {
  const classes = useStyles({ color });
  return (
    <div className={classes.content}>
      <div className={classes.date}>{date}</div>
      <Title variant="h4">{title}</Title>
      <div className={classes.description}>{description}</div>
      <span className={classes.circle} />
    </div>
  );
}
