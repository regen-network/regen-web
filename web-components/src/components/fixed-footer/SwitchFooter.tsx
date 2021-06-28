import React from 'react';
import clsx from 'clsx';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import FixedFooter from './';
import ContainedButton from '../buttons/ContainedButton';

interface SwitchFooterProps {
  buttonText: string;
  activeOption: string;
  leftOption: string;
  rightOption: string;
  label?: string;
  onCtaClick: () => void;
  onToggleClick: () => void;
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switch: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    marginRight: theme.spacing(2),
  },
  toggleContainer: {
    display: 'flex',
    width: theme.spacing(82.25),
    height: theme.spacing(12.5),
    borderRadius: theme.spacing(12.5),
    background: theme.palette.info.light,
    alignItems: 'center',
    justifyContent: 'space-between',
    textTransform: 'uppercase',
    fontSize: theme.typography.pxToRem(14),
    fontFamily: theme.typography.h1.fontFamily,
  },
  option: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(11),
    minWidth: '35%',
    padding: theme.spacing(0, 9),
    borderRadius: theme.spacing(12.5),
    margin: theme.spacing(0, 0.75),
    cursor: 'pointer',
  },
  active: {
    background: theme.palette.secondary.dark,
    animation: `$activate 0.2s`,
  },
  inactive: {
    color: '#3D7ACF',
    animation: `$deactivate 0.2s`,
    '&:hover': {
      background: theme.palette.grey[100],
    },
  },
  btn: {
    padding: theme.spacing(2, 4),
    height: theme.spacing(15),
    [theme.breakpoints.up('sm')]: {
      minWidth: theme.spacing(74.75),
      fontSize: theme.typography.pxToRem(21),
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: theme.spacing(39.75),
      fontSize: theme.typography.pxToRem(12),
    },
  },
  '@keyframes activate': {
    '0%': {
      background: theme.palette.grey[100],
      color: '#3D7ACF',
    },
    '100%': {
      background: theme.palette.secondary.dark,
      color: theme.palette.primary.contrastText,
    },
  },
  '@keyframes deactivate': {
    '0%': {
      background: theme.palette.secondary.dark,
      color: theme.palette.primary.contrastText,
    },
    '100%': {
      background: theme.palette.info.light,
      color: '#3D7ACF',
    },
  },
}));

const SwitchFooter: React.FC<SwitchFooterProps> = ({
  buttonText,
  activeOption,
  leftOption,
  rightOption,
  label,
  onCtaClick,
  onToggleClick,
}) => {
  const styles = useStyles();

  return (
    <FixedFooter>
      <div className={styles.root}>
        <div className={styles.switch}>
          {label && <span className={styles.label}>{label}</span>}
          <div className={styles.toggleContainer}>
            <div
              className={clsx(styles.option, activeOption === leftOption ? styles.active : styles.inactive)}
              onClick={onToggleClick}
            >
              {leftOption}
            </div>
            <div
              className={clsx(styles.option, activeOption === rightOption ? styles.active : styles.inactive)}
              onClick={onToggleClick}
            >
              {rightOption}
            </div>
          </div>
        </div>
        <ContainedButton className={styles.btn} onClick={onCtaClick}>
          {buttonText}
        </ContainedButton>
      </div>
    </FixedFooter>
  );
};

export { SwitchFooter };
