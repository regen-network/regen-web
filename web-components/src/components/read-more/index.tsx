import React, { useState } from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import cx from 'clsx';
import Fade from '@mui/material/Fade';

import { ExpandButton } from '../buttons/ExpandButton';
import Description from '../description';
import { truncate, Texts } from './truncate';
import { FontSizes } from '../../theme/sizing';

interface ReadMoreProps {
  children: string;
  maxLength?: number;
  restMinLength?: number;
  classes?: {
    root?: string;
    textContainer?: string;
    description?: string;
  };
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
  classes,
}) => {
  const styles = useStyles({});
  const [expanded, setExpanded] = useState(false);
  const fontSize: FontSizes = { xs: '1rem', sm: '1.375rem' };
  const texts: Texts = truncate(children, maxLength, restMinLength);
  const Button: React.FC = () => (
    <ExpandButton
      sx={{ ml: 4, pt: [0, 0], pb: [0, 0] }}
      onClick={() => setExpanded(!expanded)}
      expanded={expanded}
    />
  );

  return (
    <div className={cx(styles.root, classes?.root)}>
      <div className={cx(styles.textContainer, classes?.textContainer)}>
        <Description className={classes?.description} fontSize={fontSize}>
          {texts.truncated}
          {texts.rest && !expanded && <Button />}
        </Description>
        <Fade in={expanded} mountOnEnter unmountOnExit>
          {/* https://mui.com/guides/migration-v4/#cannot-read-property-scrolltop-of-null */}
          <div>
            <Description className={classes?.description} fontSize={fontSize}>
              {!texts.rest.startsWith('\n') && '\n'}
              {texts.rest}
              {texts.rest && expanded && <Button />}
            </Description>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default ReadMore;
