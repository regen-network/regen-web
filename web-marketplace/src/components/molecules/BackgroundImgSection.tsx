import React from 'react';
import { useLingui } from '@lingui/react';
import Image from 'next/image';
import { makeStyles } from 'tss-react/mui';

import Section from 'web-components/src/components/section';
import { cn } from 'web-components/src/utils/styles/cn';

type Props = {
  img?: string;
  /** sets larger `minHeight` on mobile to match gatsby `BackgroundSection` */
  isBanner?: boolean;
  linearGradient?: string;
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
  img,
  ...props
}) => {
  const { classes: styles, cx } = useStyles({
    isBanner: !!props.isBanner,
    linearGradient: props?.linearGradient,
  });
  const { _ } = useLingui();

  return (
    <div
      className={cn(
        'relative',
        classes?.root,
        props?.linearGradient ? styles.backgroundGradient : null,
      )}
    >
      {img && (
        <Image
          alt="" // decorative
          src={img}
          quality={100}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      )}
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
    </div>
  );
};

export { BackgroundImgSection };
