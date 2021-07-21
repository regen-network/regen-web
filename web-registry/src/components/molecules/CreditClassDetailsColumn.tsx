import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import cx from 'clsx';

import Card from 'web-components/lib/components/cards/Card';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';

import { CreditClass } from '../../mocks/cms-duplicates';
import { Label } from '../atoms/Label';

interface CreditClassDetailsColumnProps {
  creditClass: CreditClass;
  classes?: {
    root?: string;
  };
  className?: string;
}

interface LineItemProps {
  label: string;
  data: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.primary.main,
    borderColor: theme.palette.grey[100],
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(91.75),
      padding: theme.spacing(12, 8),
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: theme.spacing(12, 5.5),
    },
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  lineItem: {
    marginTop: theme.spacing(4),
  },
  label: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.primary.contrastText,
    letterSpacing: '1px',
    lineHeight: '15px',
    marginBottom: theme.spacing(2),
  },
  data: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 400,
  },
  button: {
    marginTop: theme.spacing(1),
    width: theme.typography.pxToRem(232),
  },
  images: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
    marginBottom: theme.spacing(4),
  },
  explainer: {
    width: 130,
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
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.typography.pxToRem(13),
    },
  },
}));

function CreditClassDetailsColumn({
  creditClass,
  classes,
  className,
}: CreditClassDetailsColumnProps): JSX.Element {
  const styles = useStyles();

  const LineItem = ({ label, data }: LineItemProps): JSX.Element => (
    <div className={styles.lineItem}>
      <Label className={styles.label}>{label}</Label>
      <Description className={styles.data}>{ReactHtmlParser(data)}</Description>
    </div>
  );

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
                src={require(`../../assets/svgs/carbon-credit-fruit.svg`)}
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
                src={require(`../../assets/svgs/sequestration.svg`)}
                alt="ton of carbon"
              />
            </Avatar>
            <Title variant="h6" align="center">
              1 Ton of CO2e
            </Title>
          </div>
        </div>
        {creditClass.name && <LineItem label="credit name" data={creditClass.name} />}
        {creditClass.version && <LineItem label="version" data={creditClass.version} />}
        {creditClass.creditDesigner && <LineItem label="credit designer" data={creditClass.creditDesigner} />}
        {creditClass.ecoType && <LineItem label="ecotype" data={creditClass.ecoType} />}
        {creditClass.ecoServiceType && (
          <LineItem label="carbon removal or emission reduction" data={creditClass.ecoServiceType} />
        )}
        {creditClass.approvedMethodology && (
          <LineItem label="approved methodology" data={creditClass.approvedMethodology} />
        )}
        {creditClass.methodologyUrl && (
          <OutlinedButton classes={{ root: styles.button }} href={creditClass.methodologyUrl}>
            view methodology»
          </OutlinedButton>
        )}
      </Card>
    </div>
  );
}

export { CreditClassDetailsColumn };
