import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'clsx';

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
    [theme.breakpoints.down('sm')]: {
      minWidth: theme.spacing(69.5),
      minHeight: theme.spacing(40.75),
    },
  },
}));

const OverviewCards: React.FC<{
  cards?: Maybe<Array<Maybe<CardFieldsFragment>>>;
  classes?: { root: string; item: string };
}> = props => {
  const styles = useStyles();
  return (
    <Grid container spacing={4} className={cx(props.classes?.root, styles.wrap)}>
      {props.cards?.map((card, i) => (
        <Grid item xs={12} sm={6} md={4} key={i} className={cx(props.classes?.item, styles.item)}>
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
