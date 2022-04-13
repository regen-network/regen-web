import React from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar } from '@mui/material';
import cx from 'clsx';

import Card from 'web-components/lib/components/cards/Card';
import { Title } from 'web-components/lib/components/typography';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import { BlockContent } from 'web-components/lib/components/block-content';

import { LineItem } from './LineItem';
import { CreditClass } from '../../mocks/mocks';
import { Maybe, Scalars } from '../../generated/sanity-graphql';
import CarbonCreditFruit from '../../assets/svgs/carbon-credit-fruit.svg';
import Sequestration from '../../assets/svgs/sequestration.svg';

interface CreditClassDetailsColumnProps {
  creditClass: CreditClass;
  nameRaw?: Maybe<Scalars['JSON']>;
  classes?: {
    root?: string;
  };
  className?: string;
}

const useStyles = makeStyles(theme => ({
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
  title: {
    marginBottom: theme.spacing(4),
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
  creditClass,
  nameRaw,
  classes,
  className,
}: CreditClassDetailsColumnProps): JSX.Element {
  const styles = useStyles();

  return (
    <div className={cx(classes?.root, className)}>
      <Card className={styles.card}>
        <Title className={styles.title} variant="h4">
          Credit Details
        </Title>
        <div className={cx(styles.lineItem, styles.images)}>
          <div className={styles.explainer}>
            <Avatar className={styles.iconContainer}>
              <img
                className={styles.icon}
                src={CarbonCreditFruit}
                alt="carbon credit"
              />
            </Avatar>
            <Title variant="h6" align="center">
              1 Credit
            </Title>
          </div>
          <span className={styles.equals}>=</span>
          <div className={styles.explainer}>
            <Avatar className={styles.iconContainer}>
              <img
                className={styles.icon}
                src={Sequestration}
                alt="ton of carbon"
              />
            </Avatar>
            <Title variant="h6" align="center">
              1 Ton of CO2e
            </Title>
          </div>
        </div>
        {nameRaw && (
          <LineItem
            label="credit name"
            data={<BlockContent content={nameRaw} />}
          />
        )}
        {creditClass.version && (
          <LineItem label="version" data={creditClass.version} />
        )}
        {creditClass.creditDesigner && (
          <LineItem label="credit designer" data={creditClass.creditDesigner} />
        )}
        {creditClass.ecoType && (
          <LineItem label="ecotype" data={creditClass.ecoType} />
        )}
        {creditClass.ecoServiceType && (
          <LineItem
            label="carbon removal or emission reduction"
            data={creditClass.ecoServiceType}
          />
        )}
        {creditClass.approvedMethodology && (
          <LineItem
            label="approved methodology"
            data={creditClass.approvedMethodology}
          />
        )}
        {creditClass.methodologyUrl && (
          <OutlinedButton
            size="small"
            classes={{ root: styles.button }}
            href={creditClass.methodologyUrl}
          >
            view methodology»
          </OutlinedButton>
        )}
      </Card>
    </div>
  );
}

export { CreditClassDetailsColumn };
