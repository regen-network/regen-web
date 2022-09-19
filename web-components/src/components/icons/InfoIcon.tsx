import { Box, SxProps } from '@mui/material';
import { DefaultTheme as Theme, makeStyles } from '@mui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontFamily: 'Nilland',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    width: theme.spacing(6.25),
    height: theme.spacing(6.25),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function IconIcon({
  className,
  sx,
}: {
  className?: string;
  sx?: SxProps<Theme>;
}): JSX.Element {
  const classes = useStyles();
  return (
    <Box sx={sx} className={clsx(className, classes.root)}>
      i
    </Box>
  );
}
