import React, { useState } from 'react';
import { styled } from '@mui/system';

import {
  FormValues,
  RecipientsForm,
} from 'web-components/lib/components/form/RecipientsForm';
import Title from 'web-components/lib/components/title';

// TODO: add props for the form
type Props = {
  issuer: string;
};

export const CreateCreditBatchRecipients: React.FC<Props> = ({ issuer }) => {
  // TODO: this state corresponds to the parent container managing the process
  const [recipients, setRecipients] = useState<FormValues[]>([]);
  const handleSave = (values: FormValues): void => {
    // eslint-disable-next-line no-console
    console.log('handle save', values);
    setRecipients(prev => [...prev, values]);
  };

  // eslint-disable-next-line no-console
  console.log('*** recipients', recipients);

  return (
    <SectionContainer>
      <Section>
        <Title sx={{ pb: [7.5, 10] }} variant="h3" align="center">
          Recipients
        </Title>
        <RecipientsForm
          sender={issuer}
          batchDenom={'denom11192e1e7d9182e3'}
          availableTradableAmount={10}
          onSubmit={handleSave}
          mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN || ''}
        />
      </Section>
    </SectionContainer>
  );
};

const SectionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
  backgroundColor: theme.palette.grey[50],
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const Section = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  justifyContent: 'center',
  padding: theme.spacing(0, 5),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(30, 5),
    maxWidth: theme.breakpoints.values.sm,
  },
}));
