import { useEffect } from 'react';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Link } from '@mui/material';
import { useFormikContext } from 'formik';

import { ReviewCard } from 'web-components/src/components/cards/ReviewCard/ReviewCard';
import { ItemDisplay } from 'web-components/src/components/cards/ReviewCard/ReviewCard.ItemDisplay';
import { Option } from 'web-components/src/components/inputs/SelectTextField';
import { Body, Subtitle } from 'web-components/src/components/typography';
import {
  formatDate,
  getFormattedNumber,
} from 'web-components/src/utils/format';

import { EDIT_TEXT } from 'lib/constants/shared.constants';

import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { CreateBatchFormValues } from './CreateBatchMultiStepForm';
import { CreditBasicsFormValues } from './CreditBasics';
import { RecipientFormValues } from './Recipients';

// TODO: Only covers case C01

/**
 * Handles the review step of the credit batch creation flow
 * displaying the collected information for the user to confirm before submission.
 */
export default function Review(): JSX.Element {
  const { values, validateForm, isValid } =
    useFormikContext<CreateBatchFormValues>();
  const { dataDisplay, handleResetReview } = useMultiStep();

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  useEffect(() => {
    if (!isValid) handleResetReview();
  }, [handleResetReview, isValid]);

  return (
    <>
      <CreditBatchInfo
        data={values as CreditBasicsFormValues}
        dataDisplay={dataDisplay}
      />
      {values.recipients.map((recipient, index) => (
        <RecipientInfo
          key={`recipient-${index + 1}`}
          data={recipient as RecipientFormValues}
          index={index + 1}
        />
      ))}
    </>
  );
}

type CreditBatchInfoProps = {
  /** Data from the credit basics form. See {@link CreditBasicsFormValues} */
  data: CreditBasicsFormValues;
  /** Complementary data to display in review step. See {@link Option}*/
  dataDisplay: {
    creditClass: Option;
    project: Option;
  };
};

// Displays credit batch information for review
function CreditBatchInfo({
  data,
  dataDisplay,
}: CreditBatchInfoProps): JSX.Element {
  const { _ } = useLingui();
  const { handleActiveStep } = useMultiStep();
  const metadata = data.metadata;

  return (
    <ReviewCard
      title={_(msg`Credit Batch Info`)}
      onEditClick={() => handleActiveStep(0)}
      editText={_(EDIT_TEXT)}
      sx={{ mt: [8, 10] }}
    >
      <ItemDisplay name={_(msg`Project`)}>
        {dataDisplay?.project?.label || data.projectId}
      </ItemDisplay>
      <ItemDisplay name={_(msg`Start and end date`)}>
        {`${formatDate(data.startDate)} - ${formatDate(data.endDate)}`}
      </ItemDisplay>
      {metadata?.['regen:vcsRetirementSerialNumber'] && (
        <ItemDisplay name={_(msg`VCS retirement serial number`)}>
          {metadata['regen:vcsRetirementSerialNumber']}
        </ItemDisplay>
      )}
      {metadata?.['regen:additionalCertifications']?.map(
        (cert: any, index: number) => (
          <AdditionalCertificationDisplay
            key={`additional-certification-${index}`}
            name={cert?.['schema:name'] || ''}
            url={cert?.['schema:url']?.['@value']}
            index={
              metadata?.['regen:additionalCertifications']?.length > 1
                ? `${index + 1}`
                : undefined
            }
          />
        ),
      )}
    </ReviewCard>
  );
}

type RecipientInfoProps = {
  data: RecipientFormValues;
  index: number;
};

// Displays recipient information for review
function RecipientInfo({ data, index }: RecipientInfoProps): JSX.Element {
  const { _ } = useLingui();
  const { handleActiveStep } = useMultiStep();
  return (
    <ReviewCard
      title={_(msg`Recipient ${index}`)}
      editText={_(EDIT_TEXT)}
      onEditClick={() => handleActiveStep(1)}
    >
      <ItemDisplay name={_(msg`Recipient address`)}>
        {data.recipient}
      </ItemDisplay>
      <ItemDisplay name={_(msg`Amount tradable`)}>
        {getFormattedNumber(data.tradableAmount)}
      </ItemDisplay>
      {data.withRetire && (
        <>
          <ItemDisplay name={_(msg`Amount retired`)}>
            {getFormattedNumber(data.retiredAmount)}
          </ItemDisplay>
          {data.note && (
            <ItemDisplay name={_(msg`Retirement note`)}>
              {data.note}
            </ItemDisplay>
          )}
          {data.retirementJurisdiction && (
            <ItemDisplay name={_(msg`Retirement location`)}>
              {data.retirementJurisdiction}
            </ItemDisplay>
          )}
        </>
      )}
    </ReviewCard>
  );
}

type AdditionalCertificationDisplayProps = {
  name: string;
  url?: string;
  index?: string;
};

// Displays additional certification details, including name and URL
function AdditionalCertificationDisplay({
  name,
  url,
  index,
}: AdditionalCertificationDisplayProps): JSX.Element {
  return (
    <>
      <Subtitle size="lg" sx={{ mt: 9, mb: 2 }}>
        <Trans>Additional certification {index}</Trans>
      </Subtitle>
      <Body size="lg">{name}</Body>

      {url && (
        <>
          <Subtitle size="lg" sx={{ mt: 9, mb: 2 }}>
            <Trans>Additional certification {index} url</Trans>
          </Subtitle>
          <Link
            sx={{ color: 'secondary.main', fontWeight: 'bold' }}
            href={url}
            target="_blank"
          >
            {url}
          </Link>
        </>
      )}
    </>
  );
}
