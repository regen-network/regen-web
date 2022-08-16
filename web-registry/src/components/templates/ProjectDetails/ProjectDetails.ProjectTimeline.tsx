import React from 'react';
import { Box } from '@mui/material';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';

import Section from 'web-components/lib/components/section';
import Timeline from 'web-components/lib/components/timeline';
import { getFormattedDate } from 'web-components/lib/utils/format';

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
  return (
    <Box
      className="topo-background-alternate"
      sx={{ pb: { xs: 17, sm: 22.25 } }}
    >
      <Section titleVariant="h2" title="Timeline" titleAlign="left">
        <Box sx={{ mt: { xs: 10, sm: 12 } }}>
          <Timeline
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
