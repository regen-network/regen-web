import React from 'react';
import { makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import cx from 'clsx';

import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';

import { CardFieldsFragment, Sdg, Maybe, Scalars } from '../../generated/sanity-graphql';
import { SDGs } from './SDGs';
import { CreditClassDetailsColumn } from '../molecules/CreditClassDetailsColumn';
import { OverviewCards } from '../molecules/OverviewCards';
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
          <OverviewCards cards={overviewCards} classes={{ root: styles.cardWrap, item: styles.cardItem }} />
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
