import React from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import cx from 'classnames';

import Section from 'web-components/src/components/section';
import Timeline from 'web-components/src/components/timeline';
import { getFormattedDate } from 'web-components/src/utils/format';

import { VIEW_ON_LEDGER_TEXT } from 'lib/constants/shared.constants';
import { useWallet } from 'lib/wallet/wallet';

interface InputProps {
  events: any;
  txClient: ServiceClientImpl | undefined;
  viewOnLedger: any;
}

export function ProjectTimeline({
  events,
  txClient,
  viewOnLedger,
}: InputProps): JSX.Element {
  const { _ } = useLingui();
  const { isKeplrMobileWeb } = useWallet();

  return (
    <Box
      className={cx('topo-background-alternate', isKeplrMobileWeb && 'dark')}
      sx={{ pb: { xs: 17, sm: 22.25 } }}
    >
      <Section titleVariant="h2" title={_(msg`Timeline`)} titleAlign="left">
        <Box sx={{ mt: { xs: 10, sm: 12 } }}>
          <Timeline
            viewLedgerText={_(VIEW_ON_LEDGER_TEXT)}
            txClient={txClient}
            onViewOnLedger={viewOnLedger}
            events={events.map((node: any) => ({
              date: getFormattedDate(node?.date, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
              summary: node?.summary || '',
              description: node?.description || '',
              creditVintage: node?.creditVintageByEventId,
            }))}
          />
        </Box>
      </Section>
    </Box>
  );
}
