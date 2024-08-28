import React from 'react';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Avatar } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { BlockContent } from 'web-components/src/components/block-content';
import Card from 'web-components/src/components/cards/Card';
import { Title } from 'web-components/src/components/typography';

import CarbonCreditFruit from '../../assets/svgs/carbon-credit-fruit.svg';
import Sequestration from '../../assets/svgs/sequestration.svg';
import { CreditClassByUriQuery } from '../../generated/graphql';
import { Maybe, Scalars } from '../../generated/sanity-graphql';
import { LineItem } from './LineItem';

interface CreditClassDetailsColumnProps {
  dbClass: CreditClassByUriQuery['creditClassByUri'];
  nameRaw?: Maybe<Scalars['JSON']>;
  classes?: {
    root?: string;
  };
  className?: string;
}

const useStyles = makeStyles()(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.primary.main,
    borderColor: theme.palette.grey[100],
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(91.75),
      padding: theme.spacing(12, 8),
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: theme.spacing(12, 5.5),
    },
  },
  button: {
    marginTop: theme.spacing(1),
    width: theme.typography.pxToRem(232),
  },
  lineItem: {
    marginTop: theme.spacing(4),
  },
  images: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
    marginBottom: theme.spacing(4),
  },
  explainer: {
    width: theme.typography.pxToRem(130),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconContainer: {
    background: theme.palette.secondary.contrastText,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      width: theme.typography.pxToRem(76),
      height: theme.typography.pxToRem(76),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.typography.pxToRem(85),
      height: theme.typography.pxToRem(85),
    },
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  equals: {
    color: theme.palette.secondary.main,
    fontFamily: theme.typography.h1.fontFamily,
    fontSize: 40,
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: 900,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.typography.pxToRem(10),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.typography.pxToRem(13),
    },
  },
}));

function CreditClassDetailsColumn({
  dbClass,
  nameRaw,
  classes,
  className,
}: CreditClassDetailsColumnProps): JSX.Element {
  const { _ } = useLingui();
  const { classes: styles, cx } = useStyles();
  const creditClassVersion = dbClass?.creditClassVersionsById?.nodes[0];

  return (
    <div className={cx(classes?.root, className)}>
      <Card className={styles.card}>
        <Title variant="h4" sx={{ mb: 4 }}>
          <Trans>Credit Details</Trans>
        </Title>
        <div className={cx(styles.lineItem, styles.images)}>
          <div className={styles.explainer}>
            <Avatar className={styles.iconContainer}>
              <img
                className={styles.icon}
                src={CarbonCreditFruit}
                alt={_(msg`carbon credit`)}
              />
            </Avatar>
            <Title variant="h6" align="center">
              <Trans>1 Credit</Trans>
            </Title>
          </div>
          <span className={styles.equals}>=</span>
          <div className={styles.explainer}>
            <Avatar className={styles.iconContainer}>
              <img
                className={styles.icon}
                src={Sequestration}
                alt={_(msg`ton of carbon`)}
              />
            </Avatar>
            <Title variant="h6" align="center">
              <Trans>1 Ton of CO2e</Trans>
            </Title>
          </div>
        </div>
        {nameRaw && (
          <LineItem
            label={_(msg`credit name`)}
            data={<BlockContent content={nameRaw} />}
          />
        )}
        {creditClassVersion?.metadata?.[
          'https://schema.regen.network#ecosystemType'
        ] && (
          <LineItem
            label="ecotype"
            data={
              creditClassVersion?.metadata?.[
                'https://schema.regen.network#ecosystemType'
              ]
            }
          />
        )}
        {creditClassVersion?.metadata?.[
          'https://schema.regen.network#offsetGenerationMethod'
        ] && (
          <LineItem
            label={_(msg`offset generation method`)}
            data={
              creditClassVersion?.metadata?.[
                'https://schema.regen.network#offsetGenerationMethod'
              ]?.[0]
            }
          />
        )}
      </Card>
    </div>
  );
}

export { CreditClassDetailsColumn };
