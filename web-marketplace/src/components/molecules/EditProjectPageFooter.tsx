import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from 'tss-react/mui';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import FixedFooter from 'web-components/src/components/fixed-footer';
import { SaveIcon } from 'web-components/src/components/icons/SaveIcon';
import { Theme } from 'web-components/src/theme/muiTheme';

interface Props {
  onSave?: () => void;
  saveDisabled: boolean;
  saveText?: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
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
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
      height: theme.typography.pxToRem(50),
      width: theme.typography.pxToRem(131),
    },
  },
  saveIcon: {
    marginRight: theme.spacing(1),
    height: theme.typography.pxToRem(15),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(0.25),
    },
  },
}));

const EditProjectPageFooter: React.FC<React.PropsWithChildren<Props>> = ({
  saveText = 'Save',
  onSave,
  saveDisabled,
}) => {
  const { classes: styles } = useStyles();

  return (
    <FixedFooter>
      <Grid container className={styles.root}>
        <Grid item>
          <ContainedButton
            type="submit"
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
