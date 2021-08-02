import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { OverviewCard } from 'web-components/lib/components/cards/OverviewCard';
import { BlockContent } from 'web-components/lib/components/block-content';
import { Maybe, CardFieldsFragment } from '../../generated/sanity-graphql';

const useStyles = makeStyles(theme => ({
  wrap: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      overflow: 'scroll',
    },
  },
  item: {
    [theme.breakpoints.down('xs')]: {
      width: '95%',
    },
  },
  overviewCard: {
    width: '100%',
    height: '100%',
  },
}));

type Card = {
  title: string;
  description: string;
  icon: string;
};

const OverviewCards: React.FC<{ cards?: Maybe<Array<Maybe<CardFieldsFragment>>> }> = props => {
  const styles = useStyles();
  return (
    <Grid container spacing={4} className={styles.wrap}>
      {props.cards?.map((card, i) => (
        <Grid item xs={12} sm={6} md={4} key={i} className={styles.item}>
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

export { OverviewCards };
