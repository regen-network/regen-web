import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { Link } from '@mui/material';

import { Body, Subtitle } from 'web-components/lib/components/typography';
import {
  formatDate,
  getFormattedNumber,
} from 'web-components/lib/utils/format';
import { Option } from 'web-components/lib/components/inputs/SelectTextField';
import { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';
import { ReviewCard } from 'web-components/lib/components/cards/ReviewCard/ReviewCard';
import { ItemDisplay } from 'web-components/lib/components/cards/ReviewCard/ReviewCard.ItemDisplay';

import { useMultiStep } from '../../../../components/templates/MultiStep';
import { CreateBatchFormValues } from './CreateBatchMultiStepForm';
import { CreditBasicsFormValues } from './CreditBasics';
import { RecipientFormValues } from './Recipients';

// TODO: Only covers case C01

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
  data: CreditBasicsFormValues;
  dataDisplay: {
    creditClass: Option;
    project: Option;
  };
};

function CreditBatchInfo({
  data,
  dataDisplay,
}: CreditBatchInfoProps): JSX.Element {
  const { handleActiveStep } = useMultiStep();
  const metadata = data.metadata as VCSBatchMetadataLD;

  return (
    <ReviewCard
      title="Credit Batch Info"
      onEditClick={() => handleActiveStep(0)}
    >
      <ItemDisplay
        name={'Project'}
        value={dataDisplay?.project?.label || data.projectId}
      />
      <ItemDisplay
        name={'Start and end date'}
        value={`${formatDate(data.startDate)} - ${formatDate(data.endDate)}`}
      />
      <ItemDisplay
        name={'VCS retirement serial number'}
        value={metadata['regen:vcsRetirementSerialNumber']}
      />
      {metadata['regen:additionalCertifications']?.map((cert, index) => (
        <AdditionalCertificationDisplay
          key={`additional-certification-${index}`}
          name={cert['schema:name']}
          url={cert['schema:url']['@value']}
          index={
            metadata['regen:additionalCertifications']?.length > 1
              ? `${index + 1}`
              : undefined
          }
        />
      ))}
    </ReviewCard>
  );
}

type RecipientInfoProps = {
  data: RecipientFormValues;
  index: number;
};

function RecipientInfo({ data, index }: RecipientInfoProps): JSX.Element {
  const { handleActiveStep } = useMultiStep();
  return (
    <ReviewCard
      title={`Recipient ${index}`}
      onEditClick={() => handleActiveStep(1)}
    >
      <ItemDisplay name={'Recipient address'} value={data.recipient} />
      <ItemDisplay
        name={'Amount tradable'}
        value={getFormattedNumber(data.tradableAmount)}
      />
      {data.withRetire && (
        <>
          <ItemDisplay
            name={'Amount retired'}
            value={getFormattedNumber(data.retiredAmount)}
          />
          {data.note && (
            <ItemDisplay name={'Retirement note'} value={data.note} />
          )}
          {data.retirementJurisdiction && (
            <ItemDisplay
              name={'Retirement location'}
              value={data.retirementJurisdiction}
            />
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

function AdditionalCertificationDisplay({
  name,
  url,
  index,
}: AdditionalCertificationDisplayProps): JSX.Element {
  return (
    <>
      <Subtitle size="lg" sx={{ mt: 9, mb: 2 }}>
        Additional certification {index}
      </Subtitle>
      <Body size="lg">{name}</Body>

      {url && (
        <>
          <Subtitle size="lg" sx={{ mt: 9, mb: 2 }}>
            Additional certification {index} url
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
