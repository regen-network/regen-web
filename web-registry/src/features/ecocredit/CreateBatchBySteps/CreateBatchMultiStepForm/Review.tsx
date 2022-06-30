import React from 'react';
import { useFormikContext } from 'formik';
import { makeStyles } from '@mui/styles';

import { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { useMultiStep } from '../../../../components/templates/MultiStep';
import { CreateBatchFormValues } from './CreateBatchMultiStepForm';
import { CreditBasicsFormValues } from './CreditBasics';
import { RecipientFormValues } from './Recipients';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import EditIcon from 'web-components/lib/components/icons/EditIcon';
import {
  Body,
  Label,
  Subtitle,
} from 'web-components/lib/components/typography';
import { Box, Link } from '@mui/material';
import {
  formatDate,
  getFormattedNumber,
} from 'web-components/lib/utils/format';
import { Option } from 'web-components/lib/components/inputs/SelectTextField';

// TODO: Only covers case C01

const useStyles = makeStyles((theme: Theme) => ({
  infoCard: {
    marginBottom: theme.spacing(0),
  },
  recipientsCard: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(0),
  },
}));

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
  const styles = useStyles();
  const { handleActiveStep } = useMultiStep();
  const metadata = data.metadata as VCSBatchMetadataLD;

  return (
    <OnBoardingCard className={styles.infoCard}>
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
        value={dataDisplay?.creditClass?.label || data.classId}
      />
      <ItemDisplay
        name={'Project'}
        value={dataDisplay?.project?.label || metadata['regen:vcsProjectId']}
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
    </OnBoardingCard>
  );
}

type RecipientInfoProps = {
  data: RecipientFormValues;
  index: number;
};

function RecipientInfo({ data, index }: RecipientInfoProps): JSX.Element {
  const styles = useStyles();
  const { handleActiveStep } = useMultiStep();
  return (
    <OnBoardingCard className={styles.recipientsCard}>
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

interface ButtonProps {
  onClick: () => void;
}

function EditButton({ onClick }: ButtonProps): JSX.Element {
  return (
    <OutlinedButton
      size="small"
      sx={{
        border: 'none !important',
        maxWidth: '100px',
        alignSelf: 'flex-end',
      }}
      onClick={onClick}
      startIcon={<EditIcon sx={{ height: 13, width: 13 }} />}
    >
      <Label size="sm" sx={{ color: 'info.dark' }}>
        Edit
      </Label>
    </OutlinedButton>
  );
}
