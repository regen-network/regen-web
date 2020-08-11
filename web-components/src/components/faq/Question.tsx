import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import clsx from 'clsx';

import BreadcrumbIcon from '../icons/BreadcrumbIcon';
import Title from '../title';

export interface QuestionProps {
  question: string;
  answer: string;
  first?: boolean;
  last?: boolean;
}

interface StyleProps {
  first: boolean;
  last: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    borderBottom: !props.last ? `1px solid ${theme.palette.grey[100]}` : 'none',
    [theme.breakpoints.up('sm')]: {
      paddingTop: props.first ? theme.spacing(7) : theme.spacing(12.5),
      paddingBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: props.first ? theme.spacing(7) : theme.spacing(10.75),
      paddingBottom: theme.spacing(3.75),
    },
  }),
  question: {
    cursor: 'pointer',
    lineHeight: '150%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(5),
      width: theme.spacing(8.25),
      paddingLeft: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(3.5),
      width: theme.spacing(5.75),
      paddingLeft: theme.spacing(3.125),
    },
  },
  gradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 61.46%)',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(21.75),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(18),
    },
  },
  collapsed: {
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      maxHeight: theme.spacing(21.75),
    },
    [theme.breakpoints.down('xs')]: {
      maxHeight: theme.spacing(18),
    },
  },
  answer: {
    lineHeight: '150%',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      marginTop: theme.spacing(7),
      marginRight: theme.spacing(14.25),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
      marginTop: theme.spacing(4),
      marginRight: theme.spacing(5.75),
    },
  },
}));

const Question = ({ question, answer, first = false, last = false }: QuestionProps): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles({ first, last });

  const handleClick = (): void => {
    setOpen(prevOpen => !prevOpen);
  };

  const answerClassName = [classes.answer];
  if (!open) {
    answerClassName.push(classes.collapsed);
  }

  return (
    <div className={classes.root}>
      <Title variant="h5" className={classes.question} onClick={handleClick}>
        {question}
        {open ? (
          <BreadcrumbIcon className={classes.icon} direction="up" />
        ) : (
          <BreadcrumbIcon className={classes.icon} />
        )}
      </Title>
      <div className={clsx(answerClassName)}>
        {ReactHtmlParser(answer)}
        {open ? null : <div className={classes.gradient} />}
      </div>
    </div>
  );
};

export default Question;
