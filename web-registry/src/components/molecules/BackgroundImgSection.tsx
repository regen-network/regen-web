import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import { makeStyles } from '@mui/styles';
import cx from 'clsx';

import Section from 'web-components/lib/components/section';
import { Theme } from 'web-components/lib/theme/muiTheme';

type Props = {
  img: string;
  /** sets larger `minHeight` on mobile to match gatsby `BackgroundSection` */
  isBanner?: boolean;
  linearGradient?: string;
  classes?: {
    section?: string;
    root?: string;
    main?: string;
  };
};

type StyleProps = {
  isBanner: boolean;
  linearGradient?: string;
};

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
  section: {
    zIndex: 1,
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
    },
  },
  main: props => ({
    display: 'flex',
    flexFlow: 'column nowrap',
    minHeight: props.isBanner ? '74vh' : 'inherit',
    [theme.breakpoints.up('sm')]: {
      minHeight: props.isBanner ? theme.spacing(125) : 'inherit',
    },
  }),
  backgroundGradient: props => ({
    position: 'relative',
    '&::after': {
      content: '""',
      top: 0,
      left: 0,
      position: 'absolute',
      backgroundImage: props.linearGradient,
      height: '100%',
      width: '100%',
      opacity: 0.8,
    },
  }),
}));

const BackgroundImgSection: React.FC<Props> = ({ classes, ...props }) => {
  const styles = useStyles({
    isBanner: !!props.isBanner,
    linearGradient: props?.linearGradient,
  });

  return (
    // <div className={props?.linearGradient ? styles.backgroundGradient : ''}>
    <CardMedia
      image={props.img}
      classes={{
        root: cx(classes?.root, {
          [styles.backgroundGradient]: props?.linearGradient,
        }),
      }}
    >
      <Section classes={{ root: cx(styles.section, classes?.section) }}>
        <div className={cx(styles.main, classes && classes.main)}>
          {props.children}
        </div>
      </Section>
    </CardMedia>
    // </div>
  );
};

export { BackgroundImgSection };
