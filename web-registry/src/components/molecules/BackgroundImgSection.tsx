import React from 'react';
import cx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

import Section, { SectionProps } from 'web-components/lib/components/section';

type Props = {
  img: string;
  sectionProps?: SectionProps;
  /** sets larger larger `minHeight` on mobile to match gatsby `BackgroundSection` */
  isBanner?: boolean;
  classes?: {
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
      minHeight: theme.spacing(125),
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: theme.spacing(props.isBanner ? 137 : 90),
    },
  }),
}));

const BackgroundImgSection: React.FC<Props> = ({ classes, ...props }) => {
  const styles = useStyles({ isBanner: !!props.isBanner });

  return (
    <CardMedia image={props.img}>
      <Section {...props.sectionProps}>
        <div className={cx(styles.main, classes?.main)}>{props.children}</div>
      </Section>
    </CardMedia>
  );
};

export { BackgroundImgSection };
