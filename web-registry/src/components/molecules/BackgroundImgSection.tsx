import React from 'react';
import cx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

import Section from 'web-components/lib/components/section';

type Props = {
  img: string;
  /** sets larger larger `minHeight` on mobile to match gatsby `BackgroundSection` */
  isBanner?: boolean;
  classes?: {
    section?: string;
    root?: string;
    main?: string;
  };
};

type StyleProps = {
  isBanner: boolean;
};

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
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
}));

const BackgroundImgSection: React.FC<Props> = ({ classes, ...props }) => {
  const styles = useStyles({ isBanner: !!props.isBanner });

  return (
    <CardMedia image={props.img} classes={{ root: classes?.root }}>
      <Section classes={{ root: classes?.section }}>
        <div className={cx(styles.main, classes && classes.main)}>{props.children}</div>
      </Section>
    </CardMedia>
  );
};

export { BackgroundImgSection };
