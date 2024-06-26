import { makeStyles } from 'tss-react/mui';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { SaveIcon } from 'web-components/src/components/icons/SaveIcon';
import { Theme } from 'web-components/src/theme/muiTheme';

interface SaveButtonProps {
  buttonText: string;
  isDisabled?: boolean;
  onSave?: () => void;
}

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

export function SaveButton({
  buttonText,
  isDisabled,
  onSave = () => {},
}: SaveButtonProps) {
  const { classes: styles } = useStyles();
  return (
    <ContainedButton
      type="submit"
      className={styles.btn}
      disabled={isDisabled}
      onClick={onSave}
    >
      <SaveIcon className={styles.saveIcon} />
      {buttonText}
    </ContainedButton>
  );
}
