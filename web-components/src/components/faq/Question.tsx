import React, { useState, useEffect } from 'react';
import { makeStyles, DefaultTheme as Theme, useTheme } from '@mui/styles';
import clsx from 'clsx';

import BreadcrumbIcon from '../icons/BreadcrumbIcon';
import Title from '../title';
import LinkIcon from '../icons/LinkIcon';
import Banner from '../banner';
import copyTextToClipboard from '../../utils/copy';
import { parseText } from '../../utils/textParser';
// import { BlockContent } from '../block-content';

export interface QuestionItem {
  classNames?: ClassNames;
  question: string;
  answer: string | JSX.Element;
}

interface QuestionProps extends QuestionItem {
  first?: boolean;
  last?: boolean;
  questionId?: string;
  isShareable?: boolean;
}

interface StyleProps {
  first: boolean;
  last: boolean;
}

interface ClassNames {
  root?: string;
  container?: string;
  question?: string;
  answer?: string;
  gradient?: string;
  collapsed?: string;
  icon?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    borderBottom: !props.last ? `1px solid ${theme.palette.grey[100]}` : 'none',
    [theme.breakpoints.up('sm')]: {
      paddingTop: props.first ? theme.spacing(7) : theme.spacing(12.5),
      paddingBottom: theme.spacing(12.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: props.first ? theme.spacing(7) : theme.spacing(10.75),
      paddingBottom: theme.spacing(10.75),
    },
  }),
  container: {
    [theme.breakpoints.down('sm')]: {
      padding: `0 ${theme.spacing(5.25)}`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing(7.75)}`,
    },
  },
  question: {
    cursor: 'pointer',
    lineHeight: '150%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(2.5),
    },
  },
  icon: {
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(5),
      width: theme.spacing(8.25),
      marginLeft: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(3.5),
      width: theme.spacing(5.75),
      marginLeft: theme.spacing(3.125),
    },
  },
  gradient: {
    position: 'absolute',
    top: theme.spacing(4),
    width: '100%',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 61.46%)',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(21.75),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(18),
    },
  },
  collapsed: {
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      maxHeight: theme.spacing(21.75),
    },
    [theme.breakpoints.down('sm')]: {
      maxHeight: theme.spacing(18),
    },
  },
  answer: {
    lineHeight: '150%',
    position: 'relative',
    '& ul, ol': {
      listStyle: 'none',
      marginLeft: theme.spacing(3),
    },
    '& li p:first-child': {
      display: 'inline',
    },
    '& li::before': {
      content: "'\\2022'",
      color: theme.palette.secondary.main,
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em',
      fontSize: theme.spacing(3),
    },
    '& a': {
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      marginRight: theme.spacing(14.25),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
      marginRight: theme.spacing(5.75),
    },
    '& span.gatsby-resp-image-background-image': {
      position: 'absolute !important',
    },
    '& img.gatsby-resp-image-image': {
      position: 'relative !important',
    },
  },
  anchorLink: {
    color: 'transparent !important',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    '&:link, &:visited, &:hover, &:active': {
      textDecoration: 'none',
    },
  },
  linkIcon: {
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7.5),
      height: theme.spacing(7.5),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(5.5),
      height: theme.spacing(5.5),
    },
  },
  copyText: {
    color: theme.palette.secondary.main,
    fontSize: theme.spacing(3),
    paddingLeft: theme.spacing(2.5),
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
  },
}));

const Question = ({
  classNames,
  question,
  answer,
  questionId,
  first = false,
  last = false,
  isShareable = false,
}: QuestionProps): JSX.Element => {
  const id = question
    .trim()
    .toLowerCase()
    .replace(/[^\w\- ]+/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/\-+$/, '');
  const [open, setOpen] = useState(id === questionId);
  const [copied, setCopied] = useState(false);

  const classes = useStyles({ first, last });
  const theme = useTheme();

  useEffect(() => {
    setOpen(id === questionId);
  }, [id, questionId]);

  const handleClick = (): void => {
    setOpen(prevOpen => !prevOpen);
  };

  const answerClassName = [classes.answer];
  if (!open) {
    answerClassName.push(classes.collapsed);
  }

  return (
    <div className={clsx(classes.root, classNames?.root)} id={id}>
      <div className={clsx(classes.container, classNames?.container)}>
        <Title
          variant="h5"
          className={clsx(classes.question, classNames?.question)}
          onClick={handleClick}
        >
          {question}
          {open ? (
            <BreadcrumbIcon
              className={clsx(classes.icon, classNames?.icon)}
              direction="up"
            />
          ) : (
            <BreadcrumbIcon className={clsx(classes.icon, classNames?.icon)} />
          )}
        </Title>
        <div
          className={clsx(
            classes.answer,
            classNames?.answer,
            !open && classes.collapsed,
            !open && classNames?.collapsed,
          )}
        >
          {parseText(answer)}
          {/* TODO this component should always accept Sanity block content */}
          {/* <BlockContent content={answer} /> */}
          {open ? (
            isShareable && (
              <a
                href={`#${id}`}
                onClick={() => {
                  if (window && window.location) {
                    copyTextToClipboard(
                      `${window.location.origin}${window.location.pathname}#${id}`,
                    ).then(() => setCopied(true));
                  }
                }}
                className={classes.anchorLink}
              >
                <LinkIcon
                  className={classes.linkIcon}
                  color={theme.palette.secondary.dark}
                />
                <span className={classes.copyText}>copy question link</span>
              </a>
            )
          ) : (
            <div className={clsx(classes.gradient, classNames?.gradient)} />
          )}
        </div>
      </div>
      {copied && <Banner text="Link copied to your clipboard" />}
    </div>
  );
};

export default Question;
