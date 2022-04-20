import React, { useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import ReactHtmlParser from 'react-html-parser';
import clsx from 'clsx';

import ArrowDownIcon from '../icons/ArrowDownIcon';
import { truncate, Texts } from '../read-more/truncate';
import { BodyText, ButtonText, Subtitle } from '../typography';

export interface ActionProps {
  name: string;
  description: string;
  imgSrc: string;
  className?: string;
}

const useStyles = makeStyles(theme => ({
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
}: ActionProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();

  const [expanded, setExpanded] = useState(false);
  const texts: Texts = truncate(description, 310, 100);
  const desc: string = expanded
    ? texts.truncated + ' ' + texts.rest
    : texts.truncated;

  const handleChange = (): void => {
    setExpanded(prev => !prev);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <img className={classes.image} src={imgSrc} alt={name} />
      <Subtitle size="lg" sx={{ pt: [2.8, 2.5], pb: [1.2, 2.25] }}>
        {name}
      </Subtitle>
      <BodyText size="sm" mobileSize="sm">
        {ReactHtmlParser(desc)}
        {texts.rest.length !== 0 && (
          <ButtonText
            size="xs"
            role="button"
            onClick={handleChange}
            sx={{ ml: 3, width: theme => theme.spacing(24), cursor: 'pointer' }}
          >
            read {expanded ? 'less' : 'more'}
            {expanded ? (
              <ArrowDownIcon
                className={classes.icon}
                direction="up"
                color={theme.palette.secondary.main}
              />
            ) : (
              <ArrowDownIcon
                className={classes.icon}
                direction="down"
                color={theme.palette.secondary.main}
              />
            )}
          </ButtonText>
        )}
      </BodyText>
    </div>
  );
}
