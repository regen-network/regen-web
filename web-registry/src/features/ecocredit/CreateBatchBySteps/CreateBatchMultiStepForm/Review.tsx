import React from 'react';
import { useFormikContext } from 'formik';

import { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';

import { useMultiStep } from '../../../../components/templates/MultiStep';
import { CreateBatchFormValues } from './CreateBatchMultiStepForm';
import { CreditBasicsFormValues } from './CreditBasics';
import { RecipientFormValues } from './Recipients';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
// import TrashIcon from 'web-components/lib/components/icons/TrashIcon';
import {
  Body,
  Label,
  Subtitle,
} from 'web-components/lib/components/typography';
import { Box, Link } from '@mui/material';
import { formatDate } from 'web-components/lib/utils/format';
import { Option } from 'web-components/lib/components/inputs/SelectTextField';

// TODO: Only covers case C01

export default function Review(): JSX.Element {
  const { values, validateForm, isValid } =
    useFormikContext<CreateBatchFormValues>();
  const { dataDisplay, handleResetReview } = useMultiStep();

  // validate form on mount
  React.useEffect(() => {
    validateForm();
  }, [validateForm]);

  // check isValid change to reset in case is not valid
  React.useEffect(() => {
    if (!isValid) handleResetReview(values);
  }, [handleResetReview, isValid, values]);

  return (
    <>
      <CreditBatchInfo
        data={values as CreditBasicsFormValues}
        dataDisplay={dataDisplay}
        // reviewDisplay={reviewDisplay}
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
    <OnBoardingCard>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Label size="sm">Credit batch info</Label>
        <EditButton onClick={() => handleActiveStep(0)} />
      </Box>
      <ItemDisplay
        name={'Credit Class'}
        value={dataDisplay.creditClass.label}
      />
      <ItemDisplay name={'Project'} value={dataDisplay.project.label} />
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
        />
      ))}
    </OnBoardingCard>
  );
}

type RecipientInfoProps = {
  data: RecipientFormValues;
  index: number;
};

function RecipientInfo({ data, index }: RecipientInfoProps): JSX.Element {
  const { handleActiveStep } = useMultiStep();
  return (
    <OnBoardingCard>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Label size="sm">Recipient {index}</Label>
        <EditButton onClick={() => handleActiveStep(1)} />
      </Box>
      <ItemDisplay name={'Recipient address'} value={data.recipient} />
      <ItemDisplay name={'Amount tradable'} value={data.tradableAmount} />
      {data.withRetire && (
        <>
          <ItemDisplay name={'Amount retired'} value={data.retiredAmount} />
          {data.note && (
            <ItemDisplay name={'Retirement note'} value={data.note} />
          )}
          {data.retirementLocation && (
            <ItemDisplay
              name={'Retirement location'}
              value={data.retirementLocation}
            />
          )}
        </>
      )}
    </OnBoardingCard>
  );
}

type ItemDisplayProps = {
  name: string;
  value: string | number;
};

function ItemDisplay({ name, value }: ItemDisplayProps): JSX.Element {
  return (
    <>
      <Subtitle size="lg" sx={{ mt: 9, mb: 2 }}>
        {name}
      </Subtitle>
      <Body size="lg">{value}</Body>
    </>
  );
}

type AdditionalCertificationDisplayProps = {
  name: string;
  url?: string;
};

function AdditionalCertificationDisplay({
  name,
  url,
}: AdditionalCertificationDisplayProps): JSX.Element {
  return (
    <>
      <Subtitle size="lg" sx={{ mt: 9, mb: 2 }}>
        Additional certification url
      </Subtitle>
      {url ? (
        <Link sx={{ color: 'secondary.main' }} href={url} target="_blank">
          {url}
        </Link>
      ) : (
        <Body size="lg">{name}</Body>
      )}
    </>
  );
}

interface ButtonProps {
  onClick: () => void;
}

function EditButton({ onClick }: ButtonProps): JSX.Element {
  // const theme = useTheme<Theme>();
  return (
    <OutlinedButton
      size="small"
      sx={{
        border: 'none !important',
        maxWidth: '100px',
        alignSelf: 'flex-end',
      }}
      onClick={onClick}
      startIcon={'✏️'}
      // <TrashIcon color={theme.palette.secondary.main} />
    >
      <Label size="sm" sx={{ color: 'info.dark' }}>
        Edit
      </Label>
    </OutlinedButton>
  );
}
