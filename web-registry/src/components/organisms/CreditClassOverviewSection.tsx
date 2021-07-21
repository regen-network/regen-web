import React from 'react';
import { makeStyles, Theme, useTheme, useMediaQuery } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import cx from 'clsx';

import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';
import { OverviewCard } from 'web-components/lib/components/cards/OverviewCard';

import { CreditClass } from '../../mocks';
import { SDGs } from './SDGs';
import { CreditClassDetailsColumn } from '../molecules/CreditClassDetailsColumn';

interface CreditClassOverviewSectionProps {
  className?: string;
  creditClass: CreditClass;
}

const useStyles = makeStyles((theme: Theme) => ({
  sectionRoot: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(30),
      paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
      paddingBottom: theme.spacing(8),
    },
  },
  overview: {
    display: 'flex',
    paddingTop: theme.spacing(8),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  cardWrap: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      width: `calc(100% + ${theme.spacing(8)})`,
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      overflow: 'scroll',
      marginLeft: theme.spacing(-4),
    },
  },
  cardItem: {
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
    [theme.breakpoints.down('xs')]: {
      '&:first-child': {
        paddingLeft: theme.spacing(4),
      },
    },
  },
  overviewCard: {
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      minWidth: theme.spacing(69.5),
      minHeight: theme.spacing(40.75),
    },
  },
  sdgsMobile: {
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(20, 0),
    },
  },
  sdgsSection: {
    [theme.breakpoints.up('xs')]: {
      paddingTop: 0,
      paddingBottom: theme.spacing(30),
    },
  },
}));

const CreditClassOverviewSection: React.FC<CreditClassOverviewSectionProps> = ({
  className,
  creditClass,
}) => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('xs'));

  const OverviewCards: React.FC<{ cards: any[] }> = props => (
    <Grid container spacing={4} className={styles.cardWrap}>
      {props.cards.map((card, i) => (
        <Grid item sm={12} lg={6} key={i} className={styles.cardItem}>
          <OverviewCard
            className={styles.overviewCard}
            icon={<img src={require(`../../assets/${card.icon}`)} alt={card.description} />}
            item={card}
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <>
      <Section
        classes={{ root: cx(styles.sectionRoot, className), title: styles.title }}
        title="Overview"
        titleVariant="h2"
        titleAlign="left"
      >
        <div className={styles.overview}>
          <OverviewCards cards={creditClass.overviewCards} />
          {isMobile && creditClass.sdgs && (
            <div className={styles.sdgsMobile}>
              <Title className={styles.title} variant="h2" align="left">
                SDGs
              </Title>
              <SDGs sdgs={creditClass.sdgs} />
            </div>
          )}
          <CreditClassDetailsColumn creditClass={creditClass} />
        </div>
      </Section>
      {!isMobile && creditClass.sdgs && (
        <Section classes={{ root: styles.sdgsSection, title: styles.title }} title="SDGs" titleAlign="left">
          <SDGs sdgs={creditClass.sdgs} />
        </Section>
      )}
    </>
  );
};

export { CreditClassOverviewSection };
