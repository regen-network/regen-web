import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';

import ImageActionCard from 'web-components/lib/components/cards/ImageActionCard';
import { BlockContent } from 'web-components/lib/components/block-content';

import { CreditClass } from '../../mocks';
import { getImgSrc } from '../../lib/imgSrc';
import { openLink } from '../../lib/button';
import { CreditClass as CreditClassContent, Maybe } from '../../generated/sanity-graphql';

type Props = {
  btnText: string;
  creditClasses: CreditClass[];
  creditClassesContent?: Maybe<Array<CreditClassContent>>;
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
      {props.creditClasses.map((c, i) => {
        const creditClassContent = props.creditClassesContent?.find(creditClass => creditClass.path === c.id);
        return (
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
              description={<BlockContent content={creditClassContent?.shortDescriptionRaw} />}
              imgSrc={getImgSrc(c.imgSrc)}
              onClick={() => openLink(`/credit-classes/${creditClassContent?.path}`, true)}
              title={<BlockContent content={creditClassContent?.nameRaw} />}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export { CreditClassCards };
