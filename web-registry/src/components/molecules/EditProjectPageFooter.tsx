import React from 'react';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

import FixedFooter from 'web-components/lib/components/fixed-footer';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { SaveIcon } from 'web-components/lib/components/icons/SaveIcon';

interface Props {
  onSave: () => void;
  saveDisabled: boolean;
  saveText?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    justifyContent: 'flex-end',
  },
  btn: {
    display: 'flex',
    padding: theme.spacing(2, 4),
    minWidth: 0,
    height: '100%',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
      width: theme.typography.pxToRem(181),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
      width: theme.typography.pxToRem(131),
    },
  },
  saveIcon: {
    marginRight: theme.spacing(1),
    height: theme.typography.pxToRem(15),
  },
}));

const EditProjectPageFooter: React.FC<Props> = ({ saveText = 'Save', onSave, saveDisabled }) => {
  const styles = useStyles();

  return (
    <FixedFooter>
      <Grid container className={styles.root}>
        <Grid item>
          <ContainedButton className={styles.btn} onClick={onSave} disabled={saveDisabled}>
            <SaveIcon className={styles.saveIcon} />
            {saveText}
          </ContainedButton>
        </Grid>
      </Grid>
    </FixedFooter>
  );
};

export { EditProjectPageFooter };
