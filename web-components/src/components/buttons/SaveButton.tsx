import { ButtonProps } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { SaveIcon } from 'web-components/src/components/icons/SaveIcon';
import { Theme } from 'web-components/src/theme/muiTheme';

import { cn } from 'src/utils/styles/cn';

interface SaveButtonProps extends ButtonProps {
  buttonText: string;
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

export function SaveButton(props: SaveButtonProps) {
  const { buttonText, disabled, onClick, className } = props;
  const { classes: styles } = useStyles();
  return (
    <ContainedButton
      type="submit"
      className={cn(styles.btn, className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <SaveIcon className={styles.saveIcon} />
      {buttonText}
    </ContainedButton>
  );
}
