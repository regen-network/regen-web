import React from 'react';
import { useFormikContext } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';

import { CreateBatchFormValues } from './CreateBatchMultiStepForm';
import { CreditBasicsFormValues } from './CreditBasics';
import { RecipientFormValues } from './Recipients';
import { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';

// TODO: Only covers case C01

export default function Review(): JSX.Element {
  const { values } = useFormikContext<CreateBatchFormValues>();

  return (
    <>
      <CreditBatchInfo data={values as CreditBasicsFormValues} />
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
};

function CreditBatchInfo({ data }: CreditBatchInfoProps): JSX.Element {
  const metadata = data.metadata as VCSBatchMetadataLD;

  return (
    <OnBoardingCard>
      <h3>CREDIT BATCH INFO</h3>
      <button>Edit</button>
      <h4>Credit Class</h4>
      <p>{data.classId}</p>
      <h4>Project</h4>
      <p>{metadata['regen:vcsProjectId']}</p>
      <h4>Start and end date</h4>
      <p>
        {data.startDate} - {data.endDate}
      </p>
      <h4>VCS retirement serial number</h4>
      <p>{metadata['regen:vcsRetirementSerialNumber']}</p>
    </OnBoardingCard>
  );
}

type RecipientInfoProps = {
  data: RecipientFormValues;
  index: number;
};

function RecipientInfo({ data, index }: RecipientInfoProps): JSX.Element {
  return (
    <OnBoardingCard>
      <h3>RECIPIENT {index}</h3>
      <button>Edit</button>
      <h4>Recipient Address</h4>
      <p>{data.recipient}</p>
      <h4>Amount tradable</h4>
      <p>{data.tradableAmount}</p>
    </OnBoardingCard>
  );
}
