import React from 'react';
import { Theme, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

import ControlledFormLabel from '../form/ControlledFormLabel';

interface Props {
  className?: string;
  description?: string;
  disabled?: boolean;
  optional?: boolean;
  label?: string;
  onExampleClick?: () => void;
  labelSubText?: string;
}

interface StyleProps {
  optional?: boolean;
  disabled?: boolean;
  description?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  description: props => ({
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(1),
      marginBottom: !!props.description ? theme.spacing(4) : theme.spacing(2),
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      marginBottom: !!props.description ? theme.spacing(3) : theme.spacing(1),
      fontSize: theme.spacing(3),
    },
  }),
  descriptionText: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
  txtGray: {
    color: theme.palette.info.dark,
  },
  example: {
    color: theme.palette.secondary.main,
    cursor: 'pointer',
  },
  filler: {
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(3),
    },
  },
}));

/**
 *  This component provides styled decorations for label, description, and error message with our custom styles
 */
export default function FormLabel({
  label,
  description,
  disabled,
  className,
  optional,
  labelSubText,
  onExampleClick,
}: Props): JSX.Element {
  const styles = useStyles({ optional, disabled, description });
  return (
    <div className={className}>
      {label && (
        <ControlledFormLabel optional={optional} disabled={disabled} labelSubText={labelSubText}>
          {label}
        </ControlledFormLabel>
      )}
      {description && (
        <div className={styles.description}>
          <Typography variant="body1" className={clsx(styles.descriptionText, styles.txtGray)}>
            {description}
            {onExampleClick && (
              <span className={styles.example} onClick={onExampleClick}>
                &nbsp;See an example»
              </span>
            )}
          </Typography>
        </div>
      )}
    </div>
  );
}
