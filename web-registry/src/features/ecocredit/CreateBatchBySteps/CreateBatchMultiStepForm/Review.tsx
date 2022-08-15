import React, { useEffect } from 'react';
import { Link } from '@mui/material';
import { useFormikContext } from 'formik';

import { ReviewCard } from 'web-components/lib/components/cards/ReviewCard/ReviewCard';
import { ItemDisplay } from 'web-components/lib/components/cards/ReviewCard/ReviewCard.ItemDisplay';
import { Option } from 'web-components/lib/components/inputs/SelectTextField';
import { Body, Subtitle } from 'web-components/lib/components/typography';
import { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';
import {
  formatDate,
  getFormattedNumber,
} from 'web-components/lib/utils/format';

import { useMultiStep } from 'components/templates/MultiStepTemplate';

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
      sx={{ mt: [8, 10] }}
    >
      <ItemDisplay name={'Project'}>
        {dataDisplay?.project?.label || data.projectId}
      </ItemDisplay>
      <ItemDisplay name={'Start and end date'}>
        {`${formatDate(data.startDate)} - ${formatDate(data.endDate)}`}
      </ItemDisplay>
      <ItemDisplay name={'VCS retirement serial number'}>
        {metadata['regen:vcsRetirementSerialNumber']}
      </ItemDisplay>
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
      <ItemDisplay name={'Recipient address'}>{data.recipient}</ItemDisplay>
      <ItemDisplay name={'Amount tradable'}>
        {getFormattedNumber(data.tradableAmount)}
      </ItemDisplay>
      {data.withRetire && (
        <>
          <ItemDisplay name={'Amount retired'}>
            {getFormattedNumber(data.retiredAmount)}
          </ItemDisplay>
          {data.note && (
            <ItemDisplay name={'Retirement note'}>{data.note}</ItemDisplay>
          )}
          {data.retirementJurisdiction && (
            <ItemDisplay name={'Retirement location'}>
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
