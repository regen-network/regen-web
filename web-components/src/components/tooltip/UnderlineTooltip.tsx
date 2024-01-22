import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import Tooltip from '../tooltip';

const useStyles = makeStyles()((theme: Theme) => ({
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

const UnderlineTooltip: React.FC<React.PropsWithChildren<Props>> = props => {
  const { classes: styles, cx } = useStyles();

  return (
    <Tooltip
      arrow
      placement="top"
      title={props.title || ''}
      className={cx(props.title && styles.tooltip)}
    >
      <span className={styles.underline}>{props.children}</span>
    </Tooltip>
  );
};

export { UnderlineTooltip };
