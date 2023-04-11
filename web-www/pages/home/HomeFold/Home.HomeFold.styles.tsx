import { makeStyles } from 'tss-react/mui';

export const useHomeFoldStyles = makeStyles()(theme => ({
  root: {
    textShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    color: theme.palette.primary.main,
    width: '100%',
  },
  backgroundGradient: {
    height: '100%',
    zIndex: -1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background:
      'linear-gradient(217.94deg, rgba(250, 235, 209, 0.5) 22.17%, rgba(125, 201, 191, 0.5) 46.11%, rgba(81, 93, 137, 0.5) 70.05%);',
    opacity: 0.8,
  },
}));
