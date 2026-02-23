import React from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
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
import { getCreditBatchPath } from 'lib/bridge';
import { SEE_LESS, SEE_MORE } from 'lib/constants/shared.constants';

import { Link } from 'components/atoms';

// We need to extract batch denom and recipients from the
// transaction response logs for displaying results
function parseSuccessResponse(
  response: DeliverTxResponse,
): Omit<SuccessProps, 'txHash'> {
  // get the batch denom from the `EventCreateBatch` event log
  let batchDenom = '';
  const eventCreateBatch = response.events.find(event =>
    event.type.includes('.EventCreateBatch'),
  );

  const batchDenomRaw =
    eventCreateBatch &&
    eventCreateBatch.attributes?.find(obj => obj.key === 'batch_denom');
  if (batchDenomRaw) batchDenom = batchDenomRaw.value.replace(/"/g, '');

  // get the recipients from the `EventTransfer` event log
  let recipients: Recipient[] = [];
  const eventsTransfer = response.events.filter(event =>
    event.type.includes('.EventTransfer'),
  );

  const recipientsLog = eventsTransfer.flatMap(event =>
    event.attributes?.filter(obj => obj.key === 'recipient'),
  );

  if (recipientsLog)
    recipients = recipientsLog.map(({ value }) => {
      const recipientAddress = value.replace(/"/g, '');
      return {
        name: truncate(recipientAddress),
        url: getAccountUrl(recipientAddress),
      };
    });

  return { batchDenom, recipients };
}

type ResultProps = {
  response?: DeliverTxResponse;
  error?: string;
};

/**
 * Handles the final step of the credit creation flow, processing
 * the transaction response and displaying either success details
 * or error information.
 */
export default function Result({
  response,
  error,
}: ResultProps): React.ReactElement {
  const { _ } = useLingui();
  const [responseProcessed, setResponseProcessed] = React.useState<
    SuccessProps | string
  >();
  React.useEffect(() => {
    if (!response || response.code !== 0) return;
    const { batchDenom, recipients } = parseSuccessResponse(response);
    if (!batchDenom) setResponseProcessed(_(msg`Could not parse batch denom`));
    else
      setResponseProcessed({
        batchDenom,
        recipients,
        txHash: response.transactionHash,
      });
  }, [response, _]);

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

// Displays successful transaction details including batch denom,
// recipients, and transaction hash.
const SuccessResult = ({
  batchDenom,
  recipients,
  txHash,
}: SuccessProps): React.ReactElement => {
  const { _ } = useLingui();

  return (
    <>
      <OnBoardingCard>
        <Title variant="h5">
          <Trans>Create Credit Batch</Trans>
        </Title>
        <CardItem
          seeMoreText={_(SEE_MORE)}
          seeLessText={_(SEE_LESS)}
          label={_(msg`batch denom`)}
          value={{
            name: batchDenom,
            url: getCreditBatchPath(batchDenom),
          }}
          linkComponent={Link}
        />
        <CardItemList
          label={`recipient${(recipients && recipients.length) > 1 ? 's' : ''}`}
          values={recipients || []}
        />
        <CardItem
          seeMoreText={_(SEE_MORE)}
          seeLessText={_(SEE_LESS)}
          label="hash"
          value={{
            name: truncate(txHash),
            url: getHashUrl(txHash),
          }}
          linkComponent={Link}
        />
      </OnBoardingCard>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <OutlinedButton component={Link} href={getCreditBatchPath(batchDenom)}>
          <Trans>SEE CREDIT BATCH</Trans>
        </OutlinedButton>
      </Box>
    </>
  );
};

type ErrorResultProps = {
  error: string;
};

// Shows error details when credit batch creation fails,
// allowing users to navigate back
const ErrorResult = ({ error }: ErrorResultProps): React.ReactElement => {
  const { _ } = useLingui();

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
          <Trans>Sorry, your transaction was not successful.</Trans>
        </Title>
      </Box>
      <OnBoardingCard>
        <Title variant="h5">
          <Trans>Create Credit Batch</Trans>
        </Title>
        <CardItem
          seeMoreText={_(SEE_MORE)}
          seeLessText={_(SEE_LESS)}
          color="error.main"
          label="error"
          value={{ name: error }}
          linkComponent={Link}
        />
      </OnBoardingCard>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <OutlinedButton href="/dashboard/portfolio" component={Link}>
          <Trans>SEE ALL CREDIT BATCHES</Trans>
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
  /** List of recipients. See {@link LinkItem} */
  values: LinkItem[];
};

// Displays a list of recipients
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
