import React, { useState } from 'react';
import ReactHtmlParser from 'html-react-parser';
import { makeStyles } from 'tss-react/mui';

import { ExpandButton } from '../buttons/ExpandButton';
import { Texts, truncate } from '../read-more/truncate';
import { Body, Subtitle } from '../typography';

export interface ActionProps {
  name: string;
  description: string;
  imgSrc: string;
  className?: string;
  text: string;
  lessText: string;
  moreText: string;
}

const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(74.5),
    },
  },
  image: {
    width: '100%',
    borderRadius: '5px',
  },
  icon: {
    top: theme.spacing(0.75),
    height: theme.spacing(2.5),
    width: theme.spacing(2.5),
    marginLeft: theme.spacing(0.5),
  },
}));

export default function Action({
  name,
  description,
  imgSrc,
  className,
  text,
  lessText,
  moreText,
}: ActionProps): JSX.Element {
  const { classes, cx } = useStyles();

  const [expanded, setExpanded] = useState(false);
  const texts: Texts = truncate(description, 310, 100);
  const desc: string = expanded
    ? texts.truncated + ' ' + texts.rest
    : texts.truncated;

  const handleChange = (): void => {
    setExpanded(prev => !prev);
  };

  return (
    <div className={cx(classes.root, className)}>
      <img className={classes.image} src={imgSrc} alt={name} />
      <Subtitle size="lg" sx={{ pt: [2.8, 2.5], pb: [1.2, 2.25] }}>
        {name}
      </Subtitle>
      <Body size="sm" mobileSize="sm">
        <>
          {ReactHtmlParser(desc)}
          {texts.rest.length !== 0 && (
            <ExpandButton
              size="small"
              onClick={handleChange}
              expanded={expanded}
              sx={{
                p: [0],
                ml: 2,
                ':hover': { bgcolor: 'transparent !important' },
              }}
              text={text}
              lessText={lessText}
              moreText={moreText}
            />
          )}
        </>
      </Body>
    </div>
  );
}
