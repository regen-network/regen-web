import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: 60,
  },
}));

const EditFormTemplate: React.FC = props => {
  const styles = useStyles();

  return <div className={styles.root}>{props.children}</div>;
};

export { EditFormTemplate };
