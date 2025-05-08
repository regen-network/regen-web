import { Trans } from '@lingui/macro';

import Section from 'web-components/src/components/section';

import { useSectionLayoutStyles } from './BasketDetails.styles';

export const BasketDetailsSectionLayout: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const { classes: styles } = useSectionLayoutStyles();

  return (
    <Section
      title={<Trans>Ecocredits</Trans>}
      titleVariant="h3"
      titleAlign="left"
      classes={styles}
    >
      {children}
    </Section>
  );
};
