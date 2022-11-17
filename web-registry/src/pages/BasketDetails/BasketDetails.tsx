import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

import Section from 'web-components/lib/components/section';
import { Theme } from 'web-components/lib/theme/muiTheme';

import {
  BasketEcocreditsTable,
  BasketOverview,
} from '../../components/organisms';
import useBasketDetails from './hooks/useBasketDetails';

const BasketDetails: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { basketDenom } = useParams<{ basketDenom: string }>();
  const data = useBasketDetails(basketDenom);

  return (
    <>
      {data.overview && <BasketOverview {...data.overview} />}
      {data.creditBatches && (
        <SectionLayout>
          <BasketEcocreditsTable batches={data.creditBatches} />
        </SectionLayout>
      )}
    </>
  );
};

export { BasketDetails };

// The following component is of type layout, something
// provisional since this section will contain tabs soon

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(15, 5, 20),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(30, 5),
      maxWidth: theme.breakpoints.values.lg,
    },
  },
  title: {
    marginBottom: theme.spacing(8),
  },
}));

const SectionLayout: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { classes: styles } = useStyles();

  return (
    <Section
      title="Ecocredits"
      titleVariant="h3"
      titleAlign="left"
      classes={styles}
    >
      {children}
    </Section>
  );
};
