import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from 'tss-react/mui';

import { BlockContent } from 'web-components/src/components/block-content';
import { OverviewCard } from 'web-components/src/components/cards/OverviewCard';

import { CardFieldsFragment, Maybe } from '../../generated/sanity-graphql';

const useStyles = makeStyles()(theme => ({
  wrap: {
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      overflow: 'scroll',
    },
  },
  item: {
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
  },
  overviewCard: {
    width: '100%',
    height: '100%',
  },
}));

const OverviewCards: React.FC<
  React.PropsWithChildren<{
    cards?: Maybe<Array<Maybe<CardFieldsFragment>>>;
  }>
> = props => {
  const { classes: styles } = useStyles();
  return (
    <Grid container spacing={4} className={styles.wrap}>
      {props.cards?.map((card, i) => (
        <Grid item xs={12} sm={6} md={4} key={i} className={styles.item}>
          <OverviewCard
            className={styles.overviewCard}
            icon={
              card?.icon?.asset?.url ? (
                <img src={card.icon.asset.url} alt={card?.title || ''} />
              ) : undefined
            }
            item={{
              title: card?.title || '',
              description: <BlockContent content={card?.descriptionRaw} />,
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export { OverviewCards };
