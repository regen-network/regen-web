import React from 'react';
import { SxProps } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { makeStyles } from 'tss-react/mui';

import Section from 'web-components/src/components/section';
import { Theme } from 'web-components/src/theme/muiTheme';

type Props = {
  img?: string;
  /** sets larger `minHeight` on mobile to match gatsby `BackgroundSection` */
  isBanner?: boolean;
  linearGradient?: string;
  sx?: SxProps<Theme>;
  classes?: {
    section?: string;
    root?: string;
    main?: string;
    title?: string;
  };
  title?: string;
  id?: string;
};

type StyleProps = {
  isBanner: boolean;
  linearGradient?: string;
};

const useStyles = makeStyles<StyleProps>()(
  (theme, { isBanner, linearGradient }) => ({
    section: {
      zIndex: 1,
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        paddingTop: 0,
      },
    },
    main: {
      display: 'flex',
      flexFlow: 'column nowrap',
      minHeight: isBanner ? '74vh' : 'inherit',
      [theme.breakpoints.up('sm')]: {
        minHeight: isBanner ? theme.spacing(125) : 'inherit',
      },
    },
    backgroundGradient: {
      position: 'relative',
      '&::after': {
        content: '""',
        top: 0,
        left: 0,
        position: 'absolute',
        backgroundImage: linearGradient,
        height: '100%',
        width: '100%',
        opacity: 0.8,
      },
    },
  }),
);

const BackgroundImgSection: React.FC<React.PropsWithChildren<Props>> = ({
  classes,
  title,
  id,
  sx = [],
  ...props
}) => {
  const { classes: styles, cx } = useStyles({
    isBanner: !!props.isBanner,
    linearGradient: props?.linearGradient,
  });

  return (
    <CardMedia
      image={props.img}
      classes={{
        root: cx(
          classes?.root,
          props?.linearGradient ? styles.backgroundGradient : null,
        ),
      }}
      sx={Array.isArray(sx) ? sx : [sx]}
    >
      <Section
        title={title}
        id={id}
        classes={{
          root: cx(styles.section, classes?.section),
          title: classes?.title,
        }}
      >
        <div className={cx(styles.main, classes && classes.main)}>
          {props.children}
        </div>
      </Section>
    </CardMedia>
  );
};

export { BackgroundImgSection };
