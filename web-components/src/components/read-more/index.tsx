import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

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
  textContainer: {
    marginBottom: theme.spacing(7),
    '& div:first-child': {
      marginBottom: '0px',
    },
  },
}));

export default function ReadMore({
  children,
  maxLength = 700,
  restMinLength = 300,
}: ReadMoreProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();

  const [expanded, setExpanded] = useState(false);
  const fontSize: FontSizes = { xs: '1rem', sm: '1.375rem' };
  const texts: Texts = truncate(children, maxLength, restMinLength);

  const handleChange = (): void => {
    setExpanded(prev => !prev);
  };

  return (
    <div>
      <div className={classes.textContainer}>
        <Description fontSize={fontSize}>{texts.truncated}</Description>
        <Fade in={expanded} unmountOnExit>
          <Description fontSize={fontSize}>{texts.rest}</Description>
        </Fade>
      </div>
      {texts.rest.length !== 0 && (
        <OutlinedButton
          onClick={handleChange}
          startIcon={
            expanded ? (
              <ArrowDownIcon direction="up" color={theme.palette.secondary.main} />
            ) : (
              <ArrowDownIcon direction="down" color={theme.palette.secondary.main} />
            )
          }
        >
          read {expanded ? 'less' : 'more'}
        </OutlinedButton>
      )}
    </div>
  );
}
