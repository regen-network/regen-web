import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useFormikContext } from 'formik';

import { Box } from 'web-components/src/components/box';
import {
  ItemDisplay,
  ReviewCard,
} from 'web-components/src/components/cards/ReviewCard';

import { EDIT_TEXT } from 'lib/constants/shared.constants';

import { ScrollableCodebox } from 'components/molecules/ScrollableCodebox';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import type { CreditClassValues } from './CreditClassForm';

export const CreditClassReview = (): JSX.Element => {
  const { _ } = useLingui();
  const { values } = useFormikContext<CreditClassValues>();
  const { handleBack } = useMultiStep();
  return (
    <ReviewCard
      title={_(msg`Credit Class Info`)}
      onEditClick={handleBack}
      editText={_(EDIT_TEXT)}
      sx={{ mt: [8, 10] }}
    >
      <ItemDisplay name={_(msg`Admin`)}>{values.admin}</ItemDisplay>
      <ItemDisplay name={_(msg`Issuers`)}>
        {values.issuers.map((item, i) => (
          <Box key={`${item} + ${i}`} sx={{ mb: 2 }}>
            {item}
          </Box>
        ))}
      </ItemDisplay>
      <ItemDisplay name={_(msg`Credit Type`)}>
        {values.creditTypeAbbr}
      </ItemDisplay>
      <ItemDisplay name={_(msg`Metadata`)}>
        <ScrollableCodebox code={values.metadata} sx={{ mt: 2 }} />
      </ItemDisplay>
    </ReviewCard>
  );
};
