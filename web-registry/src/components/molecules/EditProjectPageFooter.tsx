import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import { Theme } from 'web-components/lib/theme/muiTheme';
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
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(21),
      height: theme.typography.pxToRem(60),
      width: theme.typography.pxToRem(181.11),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(18),
      height: theme.typography.pxToRem(50),
      width: theme.typography.pxToRem(131),
    },
  },
  saveIcon: {
    marginRight: theme.spacing(1),
    height: theme.typography.pxToRem(15),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(0.25),
    },
  },
}));

const EditProjectPageFooter: React.FC<Props> = ({
  saveText = 'Save',
  onSave,
  saveDisabled,
}) => {
  const styles = useStyles();

  return (
    <FixedFooter>
      <Grid container className={styles.root}>
        <Grid item>
          <ContainedButton
            className={styles.btn}
            onClick={onSave}
            disabled={saveDisabled}
          >
            <SaveIcon className={styles.saveIcon} />
            {saveText}
          </ContainedButton>
        </Grid>
      </Grid>
    </FixedFooter>
  );
};

export { EditProjectPageFooter };
