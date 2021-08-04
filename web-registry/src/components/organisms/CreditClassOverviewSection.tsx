import React from 'react';
import { makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import cx from 'clsx';

import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';
import { OverviewCard } from 'web-components/lib/components/cards/OverviewCard';
import { BlockContent } from 'web-components/lib/components/block-content';

import { CardFieldsFragment, Sdg, Maybe, Scalars } from '../../generated/sanity-graphql';
import { SDGs } from './SDGs';
import { CreditClassDetailsColumn } from '../molecules/CreditClassDetailsColumn';
import { CreditClass } from '../../mocks/mocks';

interface CreditClassOverviewSectionProps {
  creditClass: CreditClass;
  className?: string;
  nameRaw?: Maybe<Scalars['JSON']>;
  overviewCards?: Maybe<Array<Maybe<CardFieldsFragment>>>;
  sdgs?: Maybe<Array<Maybe<Sdg>>>;
}

const useStyles = makeStyles(theme => ({
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

const OverviewCards: React.FC<{ cards?: Maybe<Array<Maybe<CardFieldsFragment>>> }> = props => {
  const styles = useStyles();
  return (
    <Grid container spacing={4} className={styles.cardWrap}>
      {props.cards?.map((card, i) => (
        <Grid item sm={12} lg={6} key={i} className={styles.cardItem}>
          <OverviewCard
            className={styles.overviewCard}
            icon={
              card?.icon?.asset?.url ? <img src={card.icon.asset.url} alt={card?.title || ''} /> : undefined
            }
            item={{ title: card?.title || '', description: <BlockContent content={card?.descriptionRaw} /> }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const CreditClassOverviewSection: React.FC<CreditClassOverviewSectionProps> = ({
  creditClass,
  className,
  nameRaw,
  overviewCards,
  sdgs,
}) => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Section
        classes={{ root: cx(styles.sectionRoot, className), title: styles.title }}
        title="Overview"
        titleVariant="h2"
        titleAlign="left"
      >
        <div className={styles.overview}>
          <OverviewCards cards={overviewCards} />
          {isMobile && sdgs && (
            <div className={styles.sdgsMobile}>
              <Title className={styles.title} variant="h2" align="left">
                SDGs
              </Title>
              <SDGs sdgs={sdgs} />
            </div>
          )}
          <CreditClassDetailsColumn nameRaw={nameRaw} creditClass={creditClass} />
        </div>
      </Section>
      {!isMobile && sdgs && (
        <Section classes={{ root: styles.sdgsSection, title: styles.title }} title="SDGs" titleAlign="left">
          <SDGs sdgs={sdgs} />
        </Section>
      )}
    </>
  );
};

export { CreditClassOverviewSection };
