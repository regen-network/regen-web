import { useFormikContext } from 'formik';

import { Box } from 'web-components/src/components/box';
import {
  ItemDisplay,
  ReviewCard,
} from 'web-components/src/components/cards/ReviewCard';

import { ScrollableCodebox } from 'components/molecules/ScrollableCodebox';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import type { CreditClassValues } from './CreditClassForm';

export const CreditClassReview = (): JSX.Element => {
  const { values } = useFormikContext<CreditClassValues>();
  const { handleBack } = useMultiStep();
  return (
    <ReviewCard
      title="Credit Class Info"
      onEditClick={handleBack}
      sx={{ mt: [8, 10] }}
    >
      <ItemDisplay name="Admin">{values.admin}</ItemDisplay>
      <ItemDisplay name="Issuers">
        {values.issuers.map((item, i) => (
          <Box key={`${item} + ${i}`} sx={{ mb: 2 }}>
            {item}
          </Box>
        ))}
      </ItemDisplay>
      <ItemDisplay name="Credit Type">{values.creditTypeAbbr}</ItemDisplay>
      <ItemDisplay name="Metadata">
        <ScrollableCodebox code={values.metadata} sx={{ mt: 2 }} />
      </ItemDisplay>
    </ReviewCard>
  );
};
