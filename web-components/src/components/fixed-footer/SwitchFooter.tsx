import React from 'react';
import clsx from 'clsx';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import FixedFooter from './';
import ContainedButton from '../buttons/ContainedButton';

interface Props {
  buttonText: string;
  onCtaClick: () => void;
  onToggleClick: () => void;
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {},
  btn: {
    padding: theme.spacing(2, 4),
    minWidth: 0,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
}));

const SwitchFooter: React.FC<Props> = ({ buttonText, ...props }) => {
  const styles = useStyles();

  return (
    <FixedFooter>
      <div className={styles.root}>
        <ContainedButton className={styles.btn} onClick={props.onCtaClick}>
          {buttonText}
        </ContainedButton>
      </div>
    </FixedFooter>
  );
};

export { SwitchFooter };
