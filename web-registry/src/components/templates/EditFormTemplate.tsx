import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: 60,
  },
}));

const EditFormTemplate: React.FC<React.PropsWithChildren<unknown>> = props => {
  const styles = useStyles();

  return <div className={styles.root}>{props.children}</div>;
};

export { EditFormTemplate };
