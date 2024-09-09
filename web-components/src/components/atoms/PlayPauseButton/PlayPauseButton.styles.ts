import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const usePlayPauseButtonStyles = makeStyles()((theme: Theme) => ({
  button: {
    background: theme.palette.primary.main,
    borderRadius: '50%',
    width: theme.spacing(17.5),
    height: theme.spacing(17.5),
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25))',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));
