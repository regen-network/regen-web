import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';

import Title from '../title';
import ShieldIcon from '../icons/ShieldIcon';
import IssuanceModal, { IssuanceModalData } from '../modal/IssuanceModal';
import { getFormattedDate } from '../../utils/format';

interface TimelineItemProps {
  date?: Date | string;
  summary: string;
  description?: string;
  modalData?: IssuanceModalData; // | MonitoringModalProps use type guard to check modalData type;
  circleColor: string;
  barColor: string;
  odd: boolean;
  last: boolean;
}

interface StyleProps {
  circleColor: string;
  barColor: string;
  odd: boolean;
  last: boolean;
}

// TODO: define spacing object with elements sizings for computation
const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  content: props => ({
    backgroundColor: theme.palette.primary.main,
    position: 'relative',
    border: `1px solid ${theme.palette.grey[100]}`,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    paddingTop: theme.spacing(4.75),
    paddingRight: theme.spacing(5.5),
    paddingBottom: theme.spacing(6.25),
    paddingLeft: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      width: '75%',
      marginRight: props.odd ? '0' : theme.spacing(7.75),
      marginLeft: props.odd ? theme.spacing(7.75) : '0',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginRight: 0, // theme.spacing(5.75),
      marginBottom: theme.spacing(5),
    },
    '&:after': {
      content: '""',
      borderRadius: '2px',
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      [theme.breakpoints.up('sm')]: {
        right: props.odd ? 'auto' : theme.spacing(-2),
        left: props.odd ? theme.spacing(-2) : 'auto',
        borderRight: props.odd ? 'none' : `1px solid ${theme.palette.grey[100]}`,
        borderTop: props.odd ? 'none' : `1px solid ${theme.palette.grey[100]}`,
        borderLeft: props.odd ? `1px solid ${theme.palette.grey[100]}` : 'none',
        borderBottom: props.odd ? `1px solid ${theme.palette.grey[100]}` : 'none',
        top: props.last ? 'auto' : theme.spacing(2),
        bottom: props.last ? theme.spacing(2) : 'auto',
      },
      [theme.breakpoints.down('xs')]: {
        left: theme.spacing(-2),
        borderLeft: `1px solid ${theme.palette.grey[100]}`,
        borderBottom: `1px solid ${theme.palette.grey[100]}`,
        top: theme.spacing(2),
      },
      transform: 'rotate(45deg)',
      width: theme.spacing(4),
      height: theme.spacing(4),
      zIndex: 100,
    },
  }),
  date: {
    lineHeight: '150%',
    color: theme.palette.info.main,
    paddingBottom: theme.spacing(0.75),
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.875rem',
    },
  },
  description: {
    color: theme.palette.info.main,
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '150%',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.75rem',
      lineHeight: '145%',
    },
    whiteSpace: 'pre-line',
    paddingTop: theme.spacing(1.5),
  },
  bar: props => ({
    backgroundColor: props.barColor,
    [theme.breakpoints.up('sm')]: {
      right: props.odd ? 'auto' : `calc(${theme.spacing(-7.75 - 1.5 / 2)} - 1px)`,
      left: props.odd ? `calc(${theme.spacing(-7.75 - 1.5 / 2)} - 1px)` : 'auto',
      top: props.last ? 'auto' : theme.spacing(5.75 + 1.75),
      bottom: props.last ? theme.spacing(5.75 + 1.75) : 'auto',
      width: theme.spacing(1.5),
      height: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      display: props.last ? 'none' : 'inherit',
      left: theme.spacing(-5.75 - 1 / 2),
      top: theme.spacing(4.5 + 1.75),
      width: theme.spacing(1),
      height: `calc(100% + ${theme.spacing(5)})`,
    },
    position: 'absolute',
  }),
  circle: props => ({
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    borderColor: props.circleColor,
    borderStyle: 'solid',
    position: 'absolute',
    boxSizing: 'border-box',
    [theme.breakpoints.up('sm')]: {
      right: props.odd ? 'auto' : `calc(${theme.spacing(-7.75 - 5.75 / 2)} - 1px)`,
      left: props.odd ? `calc(${theme.spacing(-7.75 - 5.75 / 2)} - 1px)` : 'auto',
      top: props.last ? 'auto' : theme.spacing(2),
      bottom: props.last ? theme.spacing(2) : 'auto',
      width: theme.spacing(5.75),
      height: theme.spacing(5.75),
      borderWidth: theme.spacing(1),
    },
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(-5.75 - 4.5 / 2),
      top: theme.spacing(2),
      width: theme.spacing(4.5),
      height: theme.spacing(4.5),
      borderWidth: theme.spacing(0.75),
    },
    zIndex: 100,
  }),
  summary: {
    lineHeight: '150%',
    position: 'relative',
  },
  icon: {
    cursor: 'pointer',
    position: 'absolute',
    marginLeft: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing(0.5),
    },
  },
}));

const options = { year: 'numeric', month: 'long', day: 'numeric' };

export default function TimelineItem({
  date,
  summary,
  description,
  modalData,
  circleColor,
  barColor,
  odd,
  last,
}: TimelineItemProps): JSX.Element {
  const classes = useStyles({ circleColor, barColor, odd, last });
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={classes.content}>
      {date && <div className={classes.date}>{getFormattedDate(date, options)}</div>}
      <Title className={classes.summary} variant="h5">
        {summary} {modalData && <ShieldIcon className={classes.icon} onClick={() => setOpen(true)} />}
      </Title>
      {description && <div className={classes.description}>{ReactHtmlParser(description)}</div>}
      <span className={classes.circle} />
      <div className={classes.bar} />
      {modalData && <IssuanceModal open={open} onClose={() => setOpen(false)} {...modalData} />}
    </div>
  );
}
