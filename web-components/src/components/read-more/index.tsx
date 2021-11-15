import React, { useState } from 'react';
import { makeStyles, useTheme, DefaultTheme as Theme } from '@mui/styles';
import Fade from '@mui/material/Fade';

import OutlinedButton from '../buttons/OutlinedButton';
import Description from '../description';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import { truncate, Texts } from './truncate';
import { FontSizes } from '../../theme/sizing';

interface ReadMoreProps {
  children: string;
  maxLength?: number;
  restMinLength?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(7),
    width: 'inherit',
  },
  textContainer: {
    paddingTop: theme.spacing(4),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    border: 'none',
    marginLeft: theme.spacing(4),
  },
  buttonLabel: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
}));

const ReadMore: React.FC<ReadMoreProps> = ({
  maxLength = 700,
  restMinLength = 300,
  children,
}) => {
  const classes = useStyles({});
  const theme = useTheme();

  const [expanded, setExpanded] = useState(false);
  const fontSize: FontSizes = { xs: '1rem', sm: '1.375rem' };
  const texts: Texts = truncate(children, maxLength, restMinLength);

  const handleChange = (): void => {
    setExpanded(prev => !prev);
  };

  const ReadButton = (): JSX.Element => (
    <OutlinedButton
      onClick={handleChange}
      classes={{ root: classes.button, label: classes.buttonLabel }}
      endIcon={
        expanded ? (
          <ArrowDownIcon direction="up" color={theme.palette.secondary.main} />
        ) : (
          <ArrowDownIcon
            direction="down"
            color={theme.palette.secondary.main}
          />
        )
      }
    >
      read {expanded ? 'less' : 'more'}
    </OutlinedButton>
  );

  return (
    <div className={classes.root}>
      <div className={classes.textContainer}>
        <Description fontSize={fontSize}>
          {texts.truncated}
          {texts.rest && !expanded && <ReadButton />}
        </Description>
        <Fade in={expanded} unmountOnExit>
          <Description fontSize={fontSize}>
            {!texts.rest.startsWith('\n') && '\n'}
            {texts.rest}
            {texts.rest && expanded && <ReadButton />}
          </Description>
        </Fade>
      </div>
    </div>
  );
};

export default ReadMore;
