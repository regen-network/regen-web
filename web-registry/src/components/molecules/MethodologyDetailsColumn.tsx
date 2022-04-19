import React from 'react';
import { makeStyles } from '@mui/styles';
import cx from 'clsx';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Card from 'web-components/lib/components/cards/Card';
import { Title } from 'web-components/lib/components/typography';
import { BlockContent } from 'web-components/lib/components/block-content';

import { Methodology } from '../../mocks/mocks';
import { LineItem } from './LineItem';
import { Maybe, Scalars } from '../../generated/sanity-graphql';

interface MethodologyDetailsColumnProps {
  nameRaw?: Maybe<Scalars['JSON']>;
  methodology: Methodology;
  classes?: {
    root?: string;
  };
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.grey[50],
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: theme.spacing(8, 5.5),
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(91.75),
      padding: theme.spacing(8),
    },
  },
}));

function MethodologyDetailsColumn({
  nameRaw,
  methodology,
  classes,
  className,
}: MethodologyDetailsColumnProps): JSX.Element {
  const styles = useStyles();

  return (
    <div className={cx(classes?.root, className)}>
      <Card className={styles.card}>
        <Title variant="h4" sx={{ mb: 4 }}>
          Methodology Details
        </Title>
        {nameRaw && (
          <LineItem
            label="methodology name"
            data={<BlockContent content={nameRaw} />}
          />
        )}
        {methodology.version && (
          <LineItem label="version" data={methodology.version} />
        )}
        {methodology.methodologyDesigner && (
          <LineItem
            label="methodology designer"
            data={methodology.methodologyDesigner}
          />
        )}
        {methodology.uncertaintyDeductions && (
          <LineItem
            label="uncertainty deductions"
            data={methodology.uncertaintyDeductions}
          />
        )}
        {methodology.measurementApproach && (
          <LineItem
            label="measurement approach"
            data={methodology.measurementApproach}
          />
        )}
      </Card>
    </div>
  );
}

export { MethodologyDetailsColumn };
