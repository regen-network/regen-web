import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Title from 'web-components/lib/components/title';

import { CreditClass } from '../../mocks';
import { BackgroundImgSection } from '../molecules/BackgroundImgSection';
import { IconLabel } from '../molecules/IconLabel';
import creditClassConnectImg from '../../assets/credit-class-connect-bg.png';

type Props = {
  creditClass: CreditClass;
};

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(30, 5),
    },
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(17.75),
      flexDirection: 'column',
    },
  },
  iconLabel: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(17.75),
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
}));

function CreditClassConnectSection({ creditClass }: Props): JSX.Element {
  const styles = useStyles();

  return (
    <BackgroundImgSection
      img={creditClassConnectImg}
      classes={{ root: styles.connectRoot, main: styles.main, section: styles.section }}
    >
      <Title className={styles.header} variant="h2" align="center">
        {creditClass.landSteward.connectSection?.header || 'Connect and Learn'}
      </Title>
      <div className={styles.links}>
        {creditClass.landSteward.connectSection?.links?.map(link => (
          <IconLabel
            className={styles.iconLabel}
            key={link.name}
            label={link.name}
            icon={<img src={link.icon} alt={link.name} />}
            description={link.description}
            href={link.href}
          />
        ))}
      </div>
    </BackgroundImgSection>
  );
}

export { CreditClassConnectSection };
