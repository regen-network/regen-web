// import { DefaultTheme as Theme } from '@mui/styles';
import { makeStyles } from 'tss-react/mui';

const usePostCardStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.grey['200'],
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  description: {
    lineClamp: 2,
    WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  fileIcon: {
    height: '24px !important',
    width: '24px !important',
    ml: '1rem',
  },
}));

export default usePostCardStyles;
