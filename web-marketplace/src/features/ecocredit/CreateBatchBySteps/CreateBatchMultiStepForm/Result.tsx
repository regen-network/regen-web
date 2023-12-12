import React from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { Box } from '@mui/material';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import { BrokenLinkIcon } from 'web-components/src/components/icons/BrokenLinkIcon';
import { CardItem } from 'web-components/src/components/modal/TxModal';
import {
  Label,
  Subtitle,
  Title,
} from 'web-components/src/components/typography';
import { truncate } from 'web-components/src/utils/truncate';

import { getAccountUrl, getHashUrl } from 'lib/block-explorer';

import { Link } from 'components/atoms';

function parseSuccessResponseLog(
  responseLogEvents: [any],
): Omit<SuccessProps, 'txHash'> {
  // get the batch denom from the `EventCreateBatch` event log
  let batchDenom = '';
  try {
    const eventCreateBatch =
      responseLogEvents &&
      responseLogEvents.find((event: any) =>
        event.type.includes('.EventCreateBatch'),
      );

    const batchDenomRaw =
      eventCreateBatch &&
      eventCreateBatch.attributes?.find(
        (obj: any) => obj.key === 'batch_denom',
      );

    batchDenom = batchDenomRaw.value.replace(/"/g, '');
  } catch (err) {}

  // get the recipients from the `EventTransfer` event log
  let recipients = [];
  try {
    const eventTransfer =
      responseLogEvents &&
      responseLogEvents.find((event: any) =>
        event.type.includes('.EventTransfer'),
      );

    const recipientsLog =
      eventTransfer &&
      eventTransfer.attributes?.filter((obj: any) => obj.key === 'recipient');

    recipients = recipientsLog.map(({ value }: { value: string }) => {
      const recipientAddress = value.replace(/"/g, '');
      return {
        name: truncate(recipientAddress),
        url: getAccountUrl(recipientAddress),
      };
    });
  } catch (err) {}

  return { batchDenom, recipients };
}

type ResultProps = {
  response?: DeliverTxResponse;
  error?: string;
};

export default function Result({
  response,
  error,
}: ResultProps): React.ReactElement {
  const [responseProcessed, setResponseProcessed] = React.useState<
    SuccessProps | string
  >();

  // if response, check if false "success" response because `unauthorized` error
  // if we can parse rawLog, then we assume it is a success response
  // if fails parsing rawLog, is because it is already a string with the error message
  React.useEffect(() => {
    if (!response) return;

    try {
      // Parsing the response, specifically the content in the key `rawLog`
      // is an array with a single element, and this is an object with a single key `events`
      const responseLog = response.rawLog && JSON.parse(response.rawLog);
      const responseLogEvents: [any] = responseLog && responseLog[0].events;
      const { batchDenom, recipients } =
        parseSuccessResponseLog(responseLogEvents);

      setResponseProcessed({
        batchDenom,
        recipients,
        txHash: response.transactionHash,
      });
    } catch (e) {
      setResponseProcessed(response.rawLog);
    }
  }, [response]);

  if (error) return <ErrorResult error={error} />;

  if (typeof responseProcessed === 'string')
    return <ErrorResult error={responseProcessed} />;

  return response ? (
    <SuccessResult
      batchDenom={responseProcessed?.batchDenom || ''}
      recipients={responseProcessed?.recipients || []}
      txHash={responseProcessed?.txHash || ''}
    />
  ) : (
    <div />
  );
}

type Recipient = { name: string; url: string };

type SuccessProps = {
  batchDenom: string;
  recipients: Recipient[] | [];
  txHash: string;
};

const SuccessResult = ({
  batchDenom,
  recipients,
  txHash,
}: SuccessProps): React.ReactElement => {
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
          label={`recipient${(recipients && recipients.length) > 1 ? 's' : ''}`}
          values={recipients || []}
        />
        <CardItem
          label="hash"
          value={{
            name: truncate(txHash),
            url: getHashUrl(txHash),
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
        <OutlinedButton href="/profile/portfolio" component={Link}>
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

const CardItemList: React.FC<React.PropsWithChildren<CardItemListProps>> = ({
  label,
  values,
}) => {
  return (
    <Box sx={{ pt: 5 }}>
      <Label size="sm" sx={{ pb: [3, 2.25] }}>
        {label}
      </Label>
      <Subtitle size="lg" mobileSize="sm" color={'info.dark'}>
        {!values.length
          ? '-'
          : values.map((item, index) => (
              <Link
                key={`card-item-link-${index}`}
                sx={{ color: 'secondary.main' }}
                href={item.url}
                target="_blank"
              >
                {item.name}
                {values.length > index + 1 && ', '}
              </Link>
            ))}
      </Subtitle>
    </Box>
  );
};
