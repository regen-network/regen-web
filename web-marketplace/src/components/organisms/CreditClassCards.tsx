import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useTheme } from '@mui/material';
import Grid, { GridProps } from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from 'tss-react/mui';

import { BlockContent } from 'web-components/src/components/block-content';
import { ImageActionCard } from 'web-components/src/components/cards/ImageActionCard';
import { ProgramImageChildren } from 'web-components/src/components/cards/ProjectCard/ProjectCard.ImageChildren';
import { Account } from 'web-components/src/components/user/UserInfo';
import { Theme } from 'web-components/src/theme/muiTheme';

import { DRAFT_TEXT } from 'lib/constants/shared.constants';

import { AllCreditClassQuery } from '../../generated/sanity-graphql';
import { getSanityImgSrc } from '../../lib/imgSrc';

type Props = {
  btnText: string;
  creditClassesContent?: AllCreditClassQuery['allCreditClass'];
  creditClassesProgram?: (Account | undefined)[];
  justifyContent?: GridProps['justifyContent'];
  classes?: {
    root?: string;
    card?: string;
  };
};

const useStyles = makeStyles()((theme: Theme) => ({
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

const CreditClassCards: React.FC<React.PropsWithChildren<Props>> = ({
  creditClassesContent,
  creditClassesProgram,
  justifyContent = 'center',
  btnText,
  classes,
}) => {
  const { _ } = useLingui();
  const navigate = useNavigate();
  const { classes: styles, cx } = useStyles();
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      container
      justifyContent={justifyContent}
      className={cx(styles.root, classes && classes.root)}
      spacing={isMobile ? 0 : 5}
    >
      {creditClassesContent?.map((c, i) => {
        const title = <BlockContent content={c?.nameRaw} />;

        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={i}
            className={cx(styles.card, classes && classes.card)}
          >
            <ImageActionCard
              key={i}
              btnText={btnText}
              description={<BlockContent content={c?.shortDescriptionRaw} />}
              imgSrc={getSanityImgSrc(c?.image)}
              onClick={() => {
                const path = c?.path && `/credit-classes/${c?.path}`;
                if (path) {
                  navigate(path);
                }
              }}
              title={title}
              imageChildren={
                <ProgramImageChildren program={creditClassesProgram?.[i]} />
              }
              draftText={_(DRAFT_TEXT)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export { CreditClassCards };
