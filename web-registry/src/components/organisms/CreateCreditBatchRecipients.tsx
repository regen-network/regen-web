import React from 'react';
import { styled } from '@mui/system';

import {
  FormValues,
  RecipientForm,
} from 'web-components/lib/components/form/RecipientForm';
import Title from 'web-components/lib/components/title';

export const CreateCreditBatchRecipients: React.FC = () => {
  return (
    <SectionContainer>
      <Section>
        <Title sx={{ pb: [7.5, 10] }} variant="h3" align="center">
          Recipients
        </Title>
        <Card>
          <RecipientForm
            sender={''}
            batchDenom={''}
            availableTradableAmount={0}
            onSubmit={function (values: FormValues): Promise<void> {
              throw new Error('Function not implemented.');
            }}
            mapboxToken={''}
          />
        </Card>
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

const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(10),
  border: `1px solid ${theme.palette.grey[100]}`,
  borderRadius: '5px',
  backgroundColor: theme.palette.primary.main,
}));
