import React from 'react';
import cx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

import Section from 'web-components/lib/components/section';

type Props = {
  img: string;
  /** sets larger larger `minHeight` on mobile to match gatsby `BackgroundSection` */
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
  root: {
    '-webkit-background-size': 'cover !important', //TODO: test with non-gradients, is there a better way?
    '-moz-background-size': 'cover !important',
    '-o-background-size': 'cover !important',
    backgroundSize: 'cover !important',
  },
  main: props => ({
    display: 'flex',
    flexFlow: 'column nowrap',
    [theme.breakpoints.up('sm')]: {
      minHeight: props.isBanner ? theme.spacing(125) : 'inherit',
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: props.isBanner ? '90vh' : 'inherit',
    },
  }),
  section: {
    zIndex: 1,
    position: 'relative',
  },
}));

const BackgroundImgSection: React.FC<Props> = ({ classes, ...props }) => {
  const styles = useStyles({ isBanner: !!props.isBanner, linearGradient: props?.linearGradient });

  return (
    <CardMedia
      // image={props.linearGradient ? undefined : props.img}
      classes={{ root: cx(styles.root, classes?.root) }}
      style={{
        background: props?.linearGradient
          ? `${props?.linearGradient}, url(${props.img}) no-repeat center center`
          : `url(${props.img}) no-repeat center center`,
      }}
    >
      <Section classes={{ root: cx(styles.section, classes?.section) }}>
        <div className={cx(styles.main, classes && classes.main)}>{props.children}</div>
      </Section>
    </CardMedia>
  );
};

export { BackgroundImgSection };
