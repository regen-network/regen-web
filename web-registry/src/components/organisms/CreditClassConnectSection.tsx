import React from 'react';
import { makeStyles } from '@mui/styles';

import Title from 'web-components/lib/components/title';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { ConnectSection, Maybe } from '../../generated/sanity-graphql';
import { BackgroundImgSection } from '../molecules/BackgroundImgSection';
import { IconLabel } from '../molecules/IconLabel';
import creditClassConnectImg from '../../assets/credit-class-connect-bg.png';
import { getLinkHref } from '../../lib/button';

type Props = {
  connectSection?: Maybe<ConnectSection>;
};

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(30, 5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(17.75),
    },
  },
  connectRoot: {
    backgroundSize: 'auto 102%', // This is a bit of a hack to hide a white line that appears at the bottom of the component.
    '@media (min-width: 1720px)': {
      backgroundSize: 'cover',
    },
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(236.5),
    },
  },
  header: {
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  links: {
    display: 'flex',
    color: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(30),
      fontSize: theme.typography.pxToRem(18),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(17.75),
      flexDirection: 'column',
    },
  },
  iconLabel: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(17.75),
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
}));

function CreditClassConnectSection({ connectSection }: Props): JSX.Element {
  const styles = useStyles();

  return (
    <BackgroundImgSection
      img={creditClassConnectImg}
      classes={{
        root: styles.connectRoot,
        main: styles.main,
        section: styles.section,
      }}
    >
      <Title className={styles.header} variant="h2" align="center">
        {connectSection?.title || 'Connect and Learn'}
      </Title>
      <div className={styles.links}>
        {connectSection?.links?.map((link, i) => (
          <IconLabel
            className={styles.iconLabel}
            key={link?.name || i}
            label={link?.name || ''}
            icon={
              <img
                src={link?.icon?.asset?.url || ''}
                alt={link?.name || 'connect'}
              />
            }
            descriptionRaw={link?.descriptionRaw}
            href={getLinkHref(link?.href)}
          />
        ))}
      </div>
    </BackgroundImgSection>
  );
}

export { CreditClassConnectSection };
