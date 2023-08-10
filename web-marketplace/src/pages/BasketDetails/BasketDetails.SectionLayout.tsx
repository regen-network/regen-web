import Section from 'web-components/lib/components/section';

import { useSectionLayoutStyles } from './BasketDetails.styles';

export const BasketDetailsSectionLayout: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const { classes: styles } = useSectionLayoutStyles();

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
