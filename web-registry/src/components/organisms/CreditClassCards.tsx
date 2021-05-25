import React from 'react';
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

const CreditClassCards: React.FC<Props> = ({ justify = 'center', ...props }) => {
  return (
    <Grid container justify={justify} className={props.classes && props.classes.root} spacing={5}>
      {props.creditClasses.map((c, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <ImageActionCard
            key={i}
            btnText="Learn More"
            description={c.description}
            imgSrc={getImgSrc(c.imgSrc)}
            onClick={() => props.onClickCard(c)}
            title={c.title}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export { CreditClassCards };
