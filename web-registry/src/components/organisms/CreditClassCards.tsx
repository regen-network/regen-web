import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ImageActionCard from 'web-components/lib/components/cards/ImageActionCard';

import { BasicCreditClass } from '../../mocks';
import { getImgSrc } from '../../lib/imgSrc';

type Props = {
  creditClasses: BasicCreditClass[];
  onClickCard: (c: BasicCreditClass) => void;
  justify?: 'center' | 'space-around' | 'space-between' | 'space-evenly' | 'flex-end' | 'flex-start';
  classes?: {
    root?: string;
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    '&:first-of-type': {
      marginLeft: 0,
    },
    '&:last-of-type': {
      marginRight: 0,
    },
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2, 0),
    },
  },
}));

const CreditClassCards: React.FC<Props> = ({ justify = 'center', ...p }) => {
  const styles = useStyles();
  return (
    <Grid container justify={justify} className={p.classes && p.classes.root}>
      {p.creditClasses.map((c, i) => (
        <ImageActionCard
          key={i}
          className={styles.card}
          description={c.description}
          imgSrc={getImgSrc(c.imgSrc)}
          onClick={() => p.onClickCard(c)}
          title={c.title}
        />
      ))}
    </Grid>
  );
};

export { CreditClassCards };
