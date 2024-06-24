import { useFormState } from 'react-hook-form';
import { Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { SaveIcon } from 'web-components/src/components/icons/SaveIcon';
import { StickyBar } from 'web-components/src/components/sticky-bar/StickyBar';
import { Theme } from 'web-components/src/theme/muiTheme';

import { SAVE } from './EditProfileForm.constants';

const useStyles = makeStyles()((theme: Theme) => ({
  btn: {
    display: 'flex',
    minWidth: 0,
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(21),
      padding: theme.spacing(2, 4),
      height: theme.typography.pxToRem(60),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
      height: theme.typography.pxToRem(50),
      padding: theme.spacing(2, 3.5),
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

export const EditProfileFormActionBar = ({
  saveDisabled,
}: {
  saveDisabled?: boolean;
}) => {
  const { isSubmitting, submitCount, isValid } = useFormState();
  const { classes: styles } = useStyles();

  return (
    <StickyBar>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <ContainedButton
          type="submit"
          className={styles.btn}
          disabled={
            (submitCount > 0 && !isValid) ||
            isSubmitting ||
            saveDisabled ||
            !isValid
          }
        >
          <SaveIcon className={styles.saveIcon} />
          {SAVE}
        </ContainedButton>
      </Box>
    </StickyBar>
  );
};
