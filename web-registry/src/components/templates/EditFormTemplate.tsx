import React from 'react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  root: {
    paddingBottom: 60,
  },
}));

const EditFormTemplate: React.FC<React.PropsWithChildren<unknown>> = props => {
  const { classes: styles } = useStyles();

  return <div className={styles.root}>{props.children}</div>;
};

export { EditFormTemplate };
