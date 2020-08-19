import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

import Title from '../title';

interface StyleProps {
  color?: string;
  even?: boolean;
}

interface Tag {
  name: string;
  color: string;
}

interface Item {
  title: string;
  tags: Tag[];
  imgSrc?: string;
}

interface Props {
  items: Item[];
}

interface ContentProps {
  item: Item;
  index: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  item: {
    '&.MuiTimelineItem-missingOppositeContent': {
      '&::before': {
        content: 'unset',
      },
    },
  },
  content: props => ({
    backgroundColor: theme.palette.primary.main,
    // maxWidth: '75%',
    position: 'relative',
    border: `1px solid ${theme.palette.info.light}`,
    borderRadius: '10px',
    paddingTop: theme.spacing(7.5),
    paddingRight: theme.spacing(5.75),
    paddingBottom: theme.spacing(7.5),
    paddingLeft: theme.spacing(5.75),
    boxShadow: theme.shadows[1],
    '&:after': {
      content: '""',
      borderRadius: '2px',
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      [theme.breakpoints.up('sm')]: {
        right: props.even ? 'auto' : theme.spacing(-2),
        left: props.even ? theme.spacing(-2) : 'auto',
        borderRight: props.even ? 'none' : `1px solid ${theme.palette.info.light}`,
        borderTop: props.even ? 'none' : `1px solid ${theme.palette.info.light}`,
        borderLeft: props.even ? `1px solid ${theme.palette.info.light}` : 'none',
        borderBottom: props.even ? `1px solid ${theme.palette.info.light}` : 'none',
        // bottom: props.last ? theme.spacing(2) : 'auto',
      },
      [theme.breakpoints.down('xs')]: {
        left: theme.spacing(-2),
        borderLeft: `1px solid ${theme.palette.info.light}`,
        borderBottom: `1px solid ${theme.palette.info.light}`,
      },
      top: `calc(50% - ${theme.spacing(2.825)})`,
      transform: 'rotate(45deg)',
      width: theme.spacing(4),
      height: theme.spacing(4),
      zIndex: 100,
    },
  }),
  tag: props => ({
    backgroundColor: props.color || theme.palette.secondary.main,
  }),
  connector: {
    backgroundColor: theme.palette.grey[100],
    width: '4px',
  },
  dot: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    borderColor: theme.palette.grey[100],
    borderStyle: 'solid',
    boxSizing: 'border-box',
    width: theme.spacing(5.75),
    height: theme.spacing(5.75),
    boxShadow: theme.shadows[0],
    borderWidth: '4px',
    margin: 0,
    position: 'absolute',
    left: 0,
    top: `calc(50% - ${theme.spacing(2.825)})`,
  },
  separator: {
    position: 'relative',
    paddingLeft: theme.spacing(2.375),
    paddingRight: theme.spacing(2.375),
  },
}));

function Tag({ name, color }: Tag): JSX.Element {
  const classes = useStyles({ color });
  return <div className={classes.tag}>{name}</div>;
}

function Content({ item, index }: ContentProps): JSX.Element {
  const classes = useStyles({ even: index % 2 === 0 });
  return (
    <Grid container className={classes.content}>
      <Grid item>{index + 1}</Grid>
      <Grid item>
        <Title variant="h3">{item.title}</Title>
        <div>
          {item.tags.map((t, i) => (
            <Tag key={i} name={t.name} color={t.color} />
          ))}
        </div>
      </Grid>
    </Grid>
  );
}

export default function NewTimeline({ items }: Props): JSX.Element {
  const classes = useStyles({});

  return (
    <>
      <Box display={{ xs: 'none', sm: 'block' }}>
        <Timeline align="alternate">
          {items.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent>
                <img src={item.imgSrc} alt={item.title} />
              </TimelineOppositeContent>
              <TimelineSeparator className={classes.separator}>
                <TimelineDot className={classes.dot} />
                <TimelineConnector className={classes.connector} />
              </TimelineSeparator>
              <TimelineContent>
                <Content item={item} index={index} />
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
      <Box display={{ xs: 'block', sm: 'none' }}>
        <Timeline>
          {items.map((item, index) => (
            <TimelineItem key={index} className={classes.item}>
              <TimelineSeparator className={classes.separator}>
                <TimelineDot className={classes.dot} />
                <TimelineConnector className={classes.connector} />
              </TimelineSeparator>
              <TimelineContent>
                <Content item={item} index={index} />
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </>
  );
}
