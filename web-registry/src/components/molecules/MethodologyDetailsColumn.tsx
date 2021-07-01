import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import cx from 'clsx';

import Card from 'web-components/lib/components/cards/Card';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import { Methodology } from 'web-components/lib/components/methodologies';

import { Label } from '../atoms/Label';

interface MethodologyDetailsColumnProps {
  methodology: Methodology;
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
    backgroundColor: theme.palette.grey[50],
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      padding: theme.spacing(8, 5.5),
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(91.75),
      padding: theme.spacing(8),
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
}));

function MethodologyDetailsColumn({
  methodology,
  classes,
  className,
}: MethodologyDetailsColumnProps): JSX.Element {
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
          Methodology Details
        </Title>
        {methodology.name && <LineItem label="methodology name" data={methodology.name} />}
        {methodology.version && <LineItem label="version" data={methodology.version} />}
        {methodology.methodologyDesigner && (
          <LineItem label="methodology designer" data={methodology.methodologyDesigner} />
        )}
        {methodology.uncertaintyDeductions && (
          <LineItem label="uncertainty deductions" data={methodology.uncertaintyDeductions} />
        )}
        {methodology.measurementApproach && (
          <LineItem label="measurement approach" data={methodology.measurementApproach} />
        )}
      </Card>
    </div>
  );
}

export { MethodologyDetailsColumn };
