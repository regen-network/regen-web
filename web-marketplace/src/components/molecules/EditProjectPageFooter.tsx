import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { makeStyles } from 'tss-react/mui';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import { VIEW_PROJECT_BUTTON } from 'web-components/src/components/cards/ProjectCard/ProjectCard.constants';
import FixedFooter from 'web-components/src/components/fixed-footer';
import EyeIcon from 'web-components/src/components/icons/EyeIcon';
import { SaveIcon } from 'web-components/src/components/icons/SaveIcon';
import { Theme } from 'web-components/src/theme/muiTheme';

import { useProjectEditContext } from 'pages';

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
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { isDirtyRef, setIsWarningModalOpen } = useProjectEditContext();

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
                navigate(path);
              }
            }}
          >
            <EyeIcon className={styles.saveIcon} />
            {VIEW_PROJECT_BUTTON.text}
          </OutlinedButton>
        </Grid>
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
