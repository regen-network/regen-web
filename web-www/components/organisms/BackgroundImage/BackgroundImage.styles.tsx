import { makeStyles } from 'tss-react/mui';

export const useBackgroundImageStyles = makeStyles()(theme => ({
  image: { objectFit: 'cover' },
}));
