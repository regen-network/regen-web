import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Link, useTheme } from '@mui/material';
import clsx from 'clsx';

import BreadcrumbIcon from '../icons/BreadcrumbIcon';
import { Body, Label, Title } from '../typography';
import LinkIcon from '../icons/LinkIcon';
import Banner from '../banner';
import copyTextToClipboard from '../../utils/copy';
import { parseText } from '../../utils/textParser';

import type { Theme } from '~/theme/muiTheme';

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

  return (
    <div className={clsx(classes.root, classNames?.root)} id={id}>
      <Box className={classNames?.container} sx={{ px: [5.25, 7.75] }}>
        <Title
          variant="h5"
          sx={{
            pb: { sm: 2.5 },
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          className={classNames?.question}
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
        <Body
          size="lg"
          sx={[
            {
              mr: [5.75, 14.25],
              position: 'relative',
              '& span.gatsby-resp-image-background-image': {
                position: 'absolute !important',
              },
              '& img.gatsby-resp-image-image': {
                position: 'relative !important',
              },
            },
            !open && {
              overflow: 'hidden',
              maxHeight: theme => [theme.spacing(18), theme.spacing(21.75)],
            },
          ]}
          className={clsx(!open && classNames?.collapsed)}
        >
          {parseText(answer)}
          {open ? (
            isShareable && (
              <Link
                href={`#${id}`}
                onClick={() => {
                  if (window && window.location) {
                    copyTextToClipboard(
                      `${window.location.origin}${window.location.pathname}#${id}`,
                    ).then(() => setCopied(true));
                  }
                }}
                sx={{
                  color: 'transparent !important',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <LinkIcon
                  className={classes.linkIcon}
                  color={theme.palette.secondary.dark}
                />
                <Label size="xs" color="secondary.main" ml={2.5}>
                  copy question link
                </Label>
              </Link>
            )
          ) : (
            <div className={clsx(classes.gradient, classNames?.gradient)} />
          )}
        </Body>
      </Box>
      {copied && <Banner text="Link copied to your clipboard" />}
    </div>
  );
};

export default Question;
