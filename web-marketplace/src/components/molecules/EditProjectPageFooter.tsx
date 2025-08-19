import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import Grid from '@mui/material/Grid';
import { useProjectEditContext } from 'legacy-pages';
import { useRouter } from 'next/navigation';
import { makeStyles } from 'tss-react/mui';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import { SaveButton } from 'web-components/src/components/buttons/SaveButton';
import FixedFooter from 'web-components/src/components/fixed-footer';
import EyeIcon from 'web-components/src/components/icons/EyeIcon';
import { Theme } from 'web-components/src/theme/muiTheme';

import { getProjectCardButtonMapping } from 'lib/constants/shared.constants';

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
  eyeIcon: {
    marginRight: theme.spacing(1),
    height: theme.typography.pxToRem(15),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(0.25),
    },
  },
}));

const EditProjectPageFooter: React.FC<React.PropsWithChildren<Props>> = ({
  saveText,
  onSave,
  saveDisabled,
}) => {
  const { _ } = useLingui();
  const { classes: styles } = useStyles();
  const { projectId } = useParams();
  const router = useRouter();
  const { isDirtyRef, setIsWarningModalOpen } = useProjectEditContext();
  const projectCardButtons = useMemo(() => getProjectCardButtonMapping(_), [_]);

  return (
    <FixedFooter>
      <Grid container className={styles.root} gap={{ xs: 2.5, sm: 3.75 }}>
        <Grid item>
          <OutlinedButton
            className={styles.btn}
            onClick={() => {
              const path = `/project/${projectId}`;
              if (isDirtyRef.current) {
                setIsWarningModalOpen(path);
              } else {
                router.push(path);
              }
            }}
          >
            <EyeIcon className={styles.eyeIcon} />
            {projectCardButtons.view.text}
          </OutlinedButton>
        </Grid>
        <Grid item>
          <SaveButton
            buttonText={saveText ?? _(msg`Save`)}
            disabled={saveDisabled}
            onClick={onSave}
          />
        </Grid>
      </Grid>
    </FixedFooter>
  );
};

export { EditProjectPageFooter };
