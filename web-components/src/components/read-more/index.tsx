import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import OutlinedButton from '../buttons/OutlinedButton';
import Description from '../description';
// TODO use svg icon from figma
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
// import { truncate } from './truncate';

interface ReadMoreProps {
  children: string;
  length?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  textContainer: {
    marginBottom: theme.spacing(7),
  },
}));

export default function ReadMore({ children, length = 757 }: ReadMoreProps): JSX.Element {
  const classes = useStyles({});
  const [expanded, setExpanded] = useState(false);
  const trimText = children.substring(0, length);
  // const trimText = truncate(children, length);
  const expandedText = expanded ? (
    <Description>{children}</Description>
  ) : (
    <Description>{trimText}</Description>
  );

  return (
    <div>
      <div className={classes.textContainer}>{expandedText}</div>
      {children.length > length && (
        <OutlinedButton
          onClick={() => setExpanded(!expanded)}
          startIcon={expanded ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        >
          read {expanded ? 'less' : 'more'}
        </OutlinedButton>
      )}
    </div>
  );
}
