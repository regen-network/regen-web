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
import { Box } from '@mui/material';

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
      <ItemDisplay name={'Credit Class'} value={data.classId} />
      <ItemDisplay name={'Project'} value={metadata['regen:vcsProjectId']} />
      <ItemDisplay
        name={'Start and end date'}
        value={`${data.startDate} - ${data.endDate}`}
      />
      <ItemDisplay
        name={'VCS retirement serial number'}
        value={metadata['regen:vcsRetirementSerialNumber']}
      />
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
