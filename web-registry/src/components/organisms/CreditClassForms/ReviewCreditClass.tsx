import { ScrollableCodebox } from 'components/molecules/ScrollableCodebox';
import { useFormikContext } from 'formik';
import { ReactNode } from 'react';
import { FlexCol } from 'web-components/lib/components/box';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import {
  Body,
  Label,
  Subtitle,
} from 'web-components/lib/components/typography';

import type { CreditClassValues } from './CreditClassForm';

export const ReviewCreditClass = (): JSX.Element => {
  const { values } = useFormikContext<CreditClassValues>();
  return (
    <OnBoardingCard>
      <Label size="sm">Credit class info</Label>
      <Item label="Admin">
        <Body>{values.admin}</Body>
      </Item>
      <Item label="Issuers">
        {values.issuers.map((item, i) => (
          <Body key={i} sx={{ mb: 2 }}>
            {item}
          </Body>
        ))}
      </Item>
      <Item label="Credit Type">
        <Body>{values.creditTypeAbbr}</Body>
      </Item>
      <Item label="Metadata">
        <ScrollableCodebox code={values.metadata} />
      </Item>
    </OnBoardingCard>
  );
};

const Item = (props: { label: string; children: ReactNode }): JSX.Element => (
  <FlexCol sx={{ alignItems: 'flex-start', mt: [6, 8], width: '100%' }}>
    <Subtitle size="lg" sx={{ pb: 2 }}>
      {props.label}
    </Subtitle>
    {props.children}
  </FlexCol>
);
