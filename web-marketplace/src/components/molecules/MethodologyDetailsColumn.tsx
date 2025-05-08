import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import React from 'react';
import { useLingui } from '@lingui/react';
import { makeStyles } from 'tss-react/mui';

import { BlockContent } from 'web-components/src/components/block-content';
import Card from 'web-components/src/components/cards/Card';
import { Title } from 'web-components/src/components/typography';
import { Theme } from 'web-components/src/theme/muiTheme';

import { Maybe, Scalars } from '../../generated/sanity-graphql';
import { Methodology } from '../../mocks/mocks';
import { LineItem } from './LineItem';

interface MethodologyDetailsColumnProps {
  nameRaw?: Maybe<Scalars['JSON']>;
  methodology: Methodology;
  classes?: {
    root?: string;
  };
  className?: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
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
  const { _ } = useLingui();
  const { classes: styles, cx } = useStyles();

  return (
    <div className={cx(classes?.root, className)}>
      <Card className={styles.card}>
        <Title variant="h4" sx={{ mb: 4 }}>
          <Trans>Methodology Details</Trans>
        </Title>
        {nameRaw && (
          <LineItem
            label={_(msg`methodology name`)}
            data={<BlockContent content={nameRaw} />}
          />
        )}
        {methodology.version && (
          <LineItem label="version" data={methodology.version} />
        )}
        {methodology.methodologyDesigner && (
          <LineItem
            label={_(msg`methodology designer`)}
            data={methodology.methodologyDesigner}
          />
        )}
        {methodology.uncertaintyDeductions && (
          <LineItem
            label={_(msg`uncertainty deductions`)}
            data={methodology.uncertaintyDeductions}
          />
        )}
        {methodology.measurementApproach && (
          <LineItem
            label={_(msg`measurement approach`)}
            data={methodology.measurementApproach}
          />
        )}
      </Card>
    </div>
  );
}

export { MethodologyDetailsColumn };
