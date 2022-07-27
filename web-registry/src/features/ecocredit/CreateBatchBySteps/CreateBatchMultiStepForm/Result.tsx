import React from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { Box } from '@mui/material';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import { BrokenLinkIcon } from 'web-components/lib/components/icons/BrokenLinkIcon';
import { CardItem } from 'web-components/lib/components/modal/TxModal';
import {
  Label,
  Subtitle,
  Title,
} from 'web-components/lib/components/typography';
import { truncate } from 'web-components/lib/utils/truncate';

import { getAccountUrl, getHashUrl } from 'lib/block-explorer';

import { Link } from 'components/atoms';

type ResultProps = {
  response?: DeliverTxResponse;
  error?: string;
};

export default function Result({
  response,
  error,
}: ResultProps): React.ReactElement {
  if (error) return <ErrorResult error={error} />;
  return response ? <SuccessResult response={response} /> : <div />;
}

type SuccessProps = {
  response: DeliverTxResponse;
};

const SuccessResult = ({ response }: SuccessProps): React.ReactElement => {
  // Parsing the response...
  const responseLog = response?.rawLog && JSON.parse(response?.rawLog);
  const responseLogEvents = responseLog && responseLog[0].events;

  const eventCreateBatch =
    responseLogEvents &&
    responseLogEvents.find((event: any) =>
      event.type.includes('.EventCreateBatch'),
    );

  const receiveBatchDenom =
    eventCreateBatch &&
    eventCreateBatch.attributes?.find((obj: any) => obj.key === 'batch_denom');

  const eventReceive =
    responseLogEvents &&
    responseLogEvents.find((event: any) =>
      event.type.includes('.EventReceive'),
    );

  const recipientsLog =
    eventReceive &&
    eventReceive.attributes?.filter((obj: any) => obj.key === 'recipient');
  const recipients = recipientsLog.map(({ value }: { value: string }) => {
    const recipientAddress = value.replace(/"/g, '');
    return {
      name: truncate(recipientAddress),
      url: getAccountUrl(recipientAddress),
    };
  });

  const batchDenom = receiveBatchDenom.value.replace(/"/g, '');

  return (
    <>
      <OnBoardingCard>
        <Title variant="h5">Create Credit Batch</Title>
        <CardItem
          label="batch denom"
          value={{
            name: batchDenom,
            url: `/credit-batches/${batchDenom}`,
          }}
          linkComponent={Link}
        />
        <CardItemList
          label={`recipient${recipients.length > 1 ? 's' : ''}`}
          values={recipients}
        />
        <CardItem
          label="hash"
          value={{
            name: truncate(response?.transactionHash),
            url: getHashUrl(response?.transactionHash),
          }}
          linkComponent={Link}
        />
      </OnBoardingCard>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <OutlinedButton component={Link} href={`/credit-batches/${batchDenom}`}>
          SEE CREDIT BATCH
        </OutlinedButton>
      </Box>
    </>
  );
};

type ErrorResultProps = {
  error: string;
};

const ErrorResult = ({ error }: ErrorResultProps): React.ReactElement => {
  return (
    <>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <BrokenLinkIcon sx={{ pb: 4.5 }} />
        <Title
          sx={{
            lineHeight: {
              xs: '150%',
              sm: '140%',
            },
            px: {
              sm: 10,
              xs: 6.5,
            },
          }}
          align="center"
          variant="h3"
        >
          Sorry, your transaction was not successful.
        </Title>
      </Box>
      <OnBoardingCard>
        <Title variant="h5">Create Credit Batch</Title>
        <CardItem
          color="error.main"
          label="error"
          value={{ name: error }}
          linkComponent={Link}
        />
      </OnBoardingCard>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <OutlinedButton href="/ecocredits/dashboard" component={Link}>
          SEE ALL CREDIT BATCHES
        </OutlinedButton>
      </Box>
    </>
  );
};

type LinkItem = {
  name: string;
  url: string;
};

type CardItemListProps = {
  label: string;
  values: LinkItem[];
};

const CardItemList: React.FC<CardItemListProps> = ({ label, values }) => {
  return (
    <Box sx={{ pt: 5 }}>
      <Label size="sm" sx={{ pb: [3, 2.25] }}>
        {label}
      </Label>
      <Subtitle size="lg" mobileSize="sm" color={'info.dark'}>
        {values.map((item, index) => (
          <Link
            key={`card-item-link-${index}`}
            sx={{ color: 'secondary.main' }}
            href={item.url}
          >
            {item.name}
            {values.length > index + 1 && ', '}
          </Link>
        ))}
      </Subtitle>
    </Box>
  );
};
