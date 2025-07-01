import { makeStyles } from 'tss-react/mui';

interface StyleProps {
  gridView: boolean;
  padding?: string | number;
  title?: string;
  mobileItemWidth?: string;
  itemWidth?: string;
  visibleOverflow: boolean;
}

export const useStyles = makeStyles<StyleProps>()(
  (
    theme,
    { gridView, mobileItemWidth, itemWidth, padding, title, visibleOverflow },
  ) => ({
    root: {
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(11.75),
      },
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(8),
      },
    },
    slider: {
      [theme.breakpoints.down('sm')]: {
        width: mobileItemWidth || '70%',
        paddingTop: title ? theme.spacing(4) : 0,
      },
      [theme.breakpoints.up('sm')]: {
        width: itemWidth || '100%',
        marginLeft: padding ? `-${padding}` : 0,
        paddingTop: title ? theme.spacing(8) : 0,
      },
      '& .slick-dots': {
        bottom: 'auto',
        overflow: 'hidden',
        height: theme.spacing(7.5),
        '& ul': {
          padding: 0,
          whiteSpace: 'nowrap',
          margin: '8px 0 -6.5px',
          '& li': {
            height: theme.spacing(3.75),
            width: theme.spacing(3.75),
            margin: '0 6.5px',
            '&.slick-active': {
              '& div': {
                backgroundColor: theme.palette.secondary.dark,
              },
            },
          },
        },
      },
      '& .slick-list': {
        overflow: visibleOverflow ? 'visible' : 'hidden',
        width: '100%',
        [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
          overflow: 'visible',
        },
        '& .slick-slide': {
          display: 'flex',
          '& > div': {
            width: '97%',
          },
        },
      },
      '& .slick-track': {
        display: 'flex',
        '& .slick-slide': {
          height: 'inherit',
          display: 'flex',
          margin: theme.spacing(4, 0),
          [theme.breakpoints.down('sm')]: {
            paddingRight: theme.spacing(5),
            '&:last-child': {
              paddingRight: 0,
            },
          },
        },
      },
    },
    dot: {
      height: theme.spacing(3.75),
      width: theme.spacing(3.75),
      backgroundColor: theme.palette.grey[100],
      borderRadius: '50%',
    },
    item: {
      height: '100%',
      paddingBottom: gridView ? theme.spacing(5) : 0,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: padding || theme.spacing(4),
        paddingRight: padding || theme.spacing(4),
        '&:last-child': {
          paddingRight: 0,
        },
      },
    },
    hiddenScrollBar: {
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  }),
);
