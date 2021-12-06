import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';

import { Theme } from 'web-components/lib/theme/muiTheme';
import ImageActionCard from 'web-components/lib/components/cards/ImageActionCard';
import { BlockContent } from 'web-components/lib/components/block-content';

import { CreditClass } from '../../mocks';
import { getImgSrc } from '../../lib/imgSrc';
import {
  CreditClass as CreditClassContent,
  Maybe,
} from '../../generated/sanity-graphql';

type Props = {
  btnText: string;
  creditClasses: CreditClass[];
  creditClassesContent?: Maybe<Array<CreditClassContent>>;
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

const CreditClassCards: React.FC<Props> = ({
  justifyContent = 'center',
  ...props
}) => {
  const navigate = useNavigate();
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Grid
      container
      justifyContent={justifyContent}
      className={clsx(styles.root, props.classes && props.classes.root)}
      spacing={isMobile ? 0 : 5}
    >
      {props.creditClasses.map((c, i) => {
        const creditClassContent = props.creditClassesContent?.find(
          creditClass => creditClass.path === c.id,
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
              description={
                <BlockContent
                  content={creditClassContent?.shortDescriptionRaw}
                />
              }
              imgSrc={getImgSrc(c.imgSrc)}
              onClick={() => {
                const path =
                  creditClassContent?.path &&
                  `/credit-classes/${creditClassContent?.path}`;
                if (path) {
                  navigate(path);
                }
              }}
              title={<BlockContent content={creditClassContent?.nameRaw} />}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export { CreditClassCards };
