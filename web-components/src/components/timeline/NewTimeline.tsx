import React, { useState } from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import clsx from 'clsx';

import { Title } from '../typography';
import Modal from '../modal';
import Tag from '../tag';

interface StyleProps {
  color?: string;
  even?: boolean;
}

interface Tag {
  name: string;
  color: string;
}

export interface Item {
  title: string;
  tags: Tag[];
  imgSrc?: string;
  url?: string;
}

interface Props {
  items: Item[];
}

interface ContentProps {
  item: Item;
  index: number;
  onTitleClick?: (url: string) => void;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  timeline: {
    padding: 0,
  },
  item: {
    '&.MuiTimelineItem-missingOppositeContent': {
      '&::before': {
        content: 'unset',
      },
    },
  },
  oppositeContent: {
    marginTop: theme.spacing(7.5),
    '& img': {
      marginRight: theme.spacing(4),
      marginLeft: theme.spacing(4),
    },
  },
  content: props => ({
    backgroundColor: theme.palette.primary.main,
    position: 'relative',
    border: `1px solid ${theme.palette.info.light}`,
    borderRadius: '10px',
    boxShadow: theme.shadows[1],
    paddingRight: theme.spacing(5.75),
    paddingLeft: theme.spacing(5.75),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: props.even ? theme.spacing(3) : theme.spacing(-3),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(2),
      paddingRight: 0,
    },
    '&:after': {
      content: '""',
      borderRadius: '2px',
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      [theme.breakpoints.up('md')]: {
        right: props.even ? 'auto' : theme.spacing(-2),
        left: props.even ? theme.spacing(-2) : 'auto',
        borderRight: props.even
          ? 'none'
          : `1px solid ${theme.palette.info.light}`,
        borderTop: props.even
          ? 'none'
          : `1px solid ${theme.palette.info.light}`,
        borderLeft: props.even
          ? `1px solid ${theme.palette.info.light}`
          : 'none',
        borderBottom: props.even
          ? `1px solid ${theme.palette.info.light}`
          : 'none',
      },
      [theme.breakpoints.down('md')]: {
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
  tags: {
    textAlign: 'left',
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexWrap: 'wrap',
  },
  connector: {
    backgroundColor: theme.palette.grey[100],
    width: '4px',
  },
  firstConnector: {
    borderTopRightRadius: '4px',
    borderTopLeftRadius: '4px',
  },
  lastConnector: {
    borderBottomRightRadius: '4px',
    borderBottomLeftRadius: '4px',
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

function Content({ item, index, onTitleClick }: ContentProps): JSX.Element {
  const classes = useStyles({ even: index % 2 === 0 });
  return (
    <Grid container wrap="nowrap" className={classes.content}>
      <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
        <Title
          variant="h1"
          sx={{
            color: 'grey.100',
            pr: 5,
            fontSize: theme => ({
              xs: theme.spacing(15),
              sm: theme.spacing(22.5),
            }),
          }}
        >
          {index + 1}
        </Title>
      </Grid>
      <Grid item sx={{ pr: { xs: 5.75, sm: 0 }, pt: { xs: 3, sm: 5 } }}>
        <Title
          variant="h3"
          mobileVariant="h5"
          sx={{ color: 'primary.light', pb: { xs: 3, sm: 3.5 } }}
        >
          {item.url && onTitleClick ? (
            <Link color="inherit" onClick={() => onTitleClick(item.url || '')}>
              {item.title}
            </Link>
          ) : (
            item.title
          )}
        </Title>
        <div className={classes.tags}>
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
  const [iframeSrc, setIframeSrc] = useState('');
  return (
    <>
      <Box display={{ xs: 'none', md: 'block' }}>
        <Timeline position="alternate" className={classes.timeline}>
          {items.map((item, index) => {
            const connectorClassName = [classes.connector];
            if (index === 0) {
              connectorClassName.push(classes.firstConnector);
            }
            if (index === items.length - 1) {
              connectorClassName.push(classes.lastConnector);
            }
            return (
              <TimelineItem key={index}>
                <TimelineOppositeContent className={classes.oppositeContent}>
                  <img src={item.imgSrc} alt={item.title} />
                </TimelineOppositeContent>
                <TimelineSeparator className={classes.separator}>
                  <TimelineDot className={classes.dot} />
                  <TimelineConnector className={clsx(connectorClassName)} />
                </TimelineSeparator>
                <TimelineContent>
                  <Content
                    item={item}
                    index={index}
                    onTitleClick={setIframeSrc}
                  />
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Box>
      <Box display={{ xs: 'block', md: 'none' }}>
        <Timeline className={classes.timeline}>
          {items.map((item, index) => {
            const connectorClassName = [classes.connector];
            if (index === 0) {
              connectorClassName.push(classes.firstConnector);
            }
            if (index === items.length - 1) {
              connectorClassName.push(classes.lastConnector);
            }
            return (
              <TimelineItem key={index} className={classes.item}>
                <TimelineSeparator className={classes.separator}>
                  <TimelineDot className={classes.dot} />
                  <TimelineConnector className={clsx(connectorClassName)} />
                </TimelineSeparator>
                <TimelineContent>
                  <Content item={item} index={index} />
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Box>
      <Modal open={!!iframeSrc} onClose={() => setIframeSrc('')} isIFrame>
        <iframe title="airtable-signup-form" src={iframeSrc} />
      </Modal>
    </>
  );
}
