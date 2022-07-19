import { ScrollableCodebox } from 'components/molecules/ScrollableCodebox';
import { useMultiStep } from 'components/templates/MultiStepTemplate';
import { useFormikContext } from 'formik';
import { ReactNode } from 'react';
import { Flex, FlexCol } from 'web-components/lib/components/box';
import { TextButton } from 'web-components/lib/components/buttons/TextButton';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import EditIcon from 'web-components/lib/components/icons/EditIcon';
import {
  Body,
  Label,
  Subtitle,
} from 'web-components/lib/components/typography';

import type { CreditClassValues } from './CreditClassForm';

const Item = (props: { label: string; children: ReactNode }): JSX.Element => (
  <FlexCol sx={{ alignItems: 'flex-start', mt: [6, 8], width: '100%' }}>
    <Subtitle size="lg" sx={{ pb: 2 }}>
      {props.label}
    </Subtitle>
    {props.children}
  </FlexCol>
);

export const CreditClassReview = (): JSX.Element => {
  const { values } = useFormikContext<CreditClassValues>();
  const { handleBack } = useMultiStep();
  return (
    <OnBoardingCard>
      <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
        <Label size="sm">Credit class info</Label>
        <TextButton
          fontSize="sm"
          sx={{ color: 'info.dark' }}
          onClick={handleBack}
        >
          <EditIcon sx={{ height: 12 }} />
          {' EDIT'}
        </TextButton>
      </Flex>
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
