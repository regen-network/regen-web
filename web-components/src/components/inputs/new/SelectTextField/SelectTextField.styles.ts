import { makeStyles } from 'tss-react/mui';

interface StyleProps {
  defaultStyle: boolean;
}

export const useSelectTextFieldStyles = makeStyles<StyleProps>()(
  (theme, { defaultStyle }) => ({
    root: {
      '& select': {
        color: defaultStyle ? theme.palette.info.main : 'inherit',
      },
    },
  }),
);
