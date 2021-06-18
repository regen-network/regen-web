import React from 'react';
import cx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

import Section, { SectionProps } from 'web-components/lib/components/section';

type Props = {
  img: string;
  sectionProps?: SectionProps;
  classes?: {
    main?: string;
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    flexFlow: 'column nowrap',
    [theme.breakpoints.up('sm')]: {
      minHeight: theme.spacing(120),
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: theme.spacing(90),
    },
  },
}));

const BackgroundImgSection: React.FC<Props> = props => {
  const styles = useStyles();

  return (
    <CardMedia image={props.img}>
      <Section {...props.sectionProps}>
        <div className={cx(styles.main, props.classes && props.classes.main)}>{props.children}</div>
      </Section>
    </CardMedia>
  );
};

export { BackgroundImgSection };
