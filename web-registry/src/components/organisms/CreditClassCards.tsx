import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';

import ImageActionCard from 'web-components/lib/components/cards/ImageActionCard';

import { BasicCreditClass } from '../../mocks';
import { getImgSrc } from '../../lib/imgSrc';

type Props = {
  btnText: string;
  creditClasses: BasicCreditClass[];
  onClickCard: (c: BasicCreditClass) => void;
  justify?: 'center' | 'space-around' | 'space-between' | 'space-evenly' | 'flex-end' | 'flex-start';
  classes?: {
    root?: string;
    card?: string;
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      width: 'unset',
    },
  },
  card: {
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 0),
    },
  },
}));

const CreditClassCards: React.FC<Props> = ({ justify = 'center', ...props }) => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Grid
      container
      justify={justify}
      className={clsx(styles.root, props.classes && props.classes.root)}
      spacing={isMobile ? 0 : 5}
    >
      {props.creditClasses.map((c, i) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={i}
          className={clsx(styles.card, props.classes && props.classes.card)}
        >
          <ImageActionCard
            key={i}
            btnText={props.btnText}
            description={c.description}
            imgSrc={getImgSrc(c.imgSrc)}
            onClick={() => props.onClickCard(c)}
            title={c.name}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export { CreditClassCards };
