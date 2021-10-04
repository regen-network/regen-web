import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import cx from 'clsx';
import Tooltip from '../tooltip';

const useStyles = makeStyles((theme: Theme) => ({
  underline: {
    color: theme.palette.info.contrastText,
    borderBottom: `3px dashed ${theme.palette.info.contrastText}`,
  },
  tooltip: {
    cursor: 'pointer',
  },
}));

interface Props {
  title?: string;
}

const UnderlineTooltip: React.FC<Props> = props => {
  const styles = useStyles();

  return (
    <Tooltip arrow placement="top" title={props.title || ''} className={cx(props.title && styles.tooltip)}>
      <span className={styles.underline}>{props.children}</span>
    </Tooltip>
  );
};

export { UnderlineTooltip };
