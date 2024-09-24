/* eslint-disable lingui/no-unlocalized-strings */
import { Box, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    fontFamily: 'Nilland',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    width: theme.spacing(6.25),
    height: theme.spacing(6.25),
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(16),
  },
}));

export default function InfoIcon({
  className,
  sx,
}: {
  className?: string;
  sx?: SxProps<Theme>;
}): JSX.Element {
  const { classes, cx } = useStyles();
  return (
    <Box sx={sx} className={cx(className, classes.root)}>
      i
    </Box>
  );
}
