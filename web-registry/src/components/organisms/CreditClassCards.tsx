import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';

import { Theme } from 'web-components/lib/theme/muiTheme';
import ImageActionCard from 'web-components/lib/components/cards/ImageActionCard';
import {
  BlockContent,
  blocksToText,
} from 'web-components/lib/components/block-content';

import { AllCreditClassQuery } from '../../generated/sanity-graphql';
import { getSanityImgSrc } from '../../lib/imgSrc';
import { onChainClassRegExp } from '../../lib/ledger';

type Props = {
  btnText: string;
  creditClassesContent?: AllCreditClassQuery['allCreditClass'];
  justifyContent?:
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | 'flex-end'
    | 'flex-start';
  classes?: {
    root?: string;
    card?: string;
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: 'unset',
    },
  },
  card: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 0),
    },
  },
}));

const CreditClassCards: React.FC<Props> = ({
  justifyContent = 'center',
  ...props
}) => {
  const navigate = useNavigate();
  const styles = useStyles();
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      container
      justifyContent={justifyContent}
      className={clsx(styles.root, props.classes && props.classes.root)}
      spacing={isMobile ? 0 : 5}
    >
      {props.creditClassesContent?.map((c, i) => {
        const isOnChainClass = c.path && onChainClassRegExp.test(c.path);
        const title = isOnChainClass ? (
          `${blocksToText(c?.nameRaw)} (${c.path})`
        ) : (
          <BlockContent content={c?.nameRaw} />
        );
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
              description={<BlockContent content={c?.shortDescriptionRaw} />}
              imgSrc={getSanityImgSrc(c?.image)}
              onClick={() => {
                const path = c?.path && `/credit-classes/${c?.path}`;
                if (path) {
                  navigate(path);
                }
              }}
              title={title}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export { CreditClassCards };
