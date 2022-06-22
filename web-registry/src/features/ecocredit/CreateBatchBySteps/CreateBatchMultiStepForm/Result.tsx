import React from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { useNavigate } from 'react-router-dom';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import {
  // Body,
  Label,
  Subtitle,
  Title,
} from 'web-components/lib/components/typography';
import { Box } from '@mui/material';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import { CardItem } from 'web-components/lib/components/modal/TxModal';
import { truncate } from 'web-components/lib/utils/truncate';
import { Link } from '../../../../components/atoms';
import { getAccountUrl, getHashUrl } from '../../../../lib/block-explorer';

type ResultProps = {
  response?: DeliverTxResponse;
  error?: Error | string;
};

export default function Result({
  response,
  error,
}: ResultProps): React.ReactElement {
  const navigate = useNavigate();

  if (error)
    return (
      <>
        <h1>Some error!</h1>
      </>
    );

  if (response)
    // eslint-disable-next-line no-console
    console.log('** Finished response', response);

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

  return (
    <>
      <OnBoardingCard>
        <Title variant="h5">Create Credit Batch</Title>
        <CardItem
          label="batch denom"
          value={{ name: receiveBatchDenom.value.replace(/"/g, '') }}
          linkComponent={Link}
        />
        <RecipientsCardItem label="recipient(s)" values={recipients} />
        <CardItem
          label="hash"
          value={{
            name: truncate(response?.transactionHash),
            url: getHashUrl(response?.transactionHash),
          }}
          linkComponent={Link}
        />
      </OnBoardingCard>
      <OutlinedButton onClick={() => navigate('/ecocredits/dashboard')}>
        SEE CREDIT BATCH
      </OutlinedButton>
    </>
  );
}

type LinkItem = {
  name: string;
  url: string;
};

type RecipientsCardItemProps = {
  label: string;
  values: LinkItem[];
};

const RecipientsCardItem: React.FC<RecipientsCardItemProps> = ({
  label,
  values,
}) => {
  return (
    <Box sx={{ pt: 5 }}>
      <Label size="sm" sx={{ pb: [3, 2.25] }}>
        {label}
      </Label>
      <Subtitle size="lg" mobileSize="sm" color={'info.dark'}>
        {values.map((recipient, index) => (
          <Link
            key={`recipient-link-${index}`}
            sx={{ color: 'secondary.main' }}
            href={recipient.url}
            target="_blank"
          >
            {recipient.name}
            {values.length > index + 1 && ', '}
          </Link>
        ))}
      </Subtitle>
    </Box>
  );
};
