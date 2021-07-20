import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { OverviewCard } from 'web-components/lib/components/cards/OverviewCard';

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

const OverviewCards: React.FC<{ cards: Card[] }> = props => {
  const styles = useStyles();
  return (
    <Grid container spacing={4} className={styles.wrap}>
      {props.cards.map((card, i) => (
        <Grid item xs={12} sm={6} md={4} key={i} className={styles.item}>
          <OverviewCard
            className={styles.overviewCard}
            icon={<img src={require(`../../assets/${card.icon}`)} alt={card.description} />}
            item={{ title: card.title, description: card.description }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export { OverviewCards };
