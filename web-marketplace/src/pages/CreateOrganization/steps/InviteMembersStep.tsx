import React from 'react';
import { Trans } from '@lingui/macro';

import { Center } from 'web-components/src/components/box';

export const InviteMembersStep: React.FC = () => {
  return (
    <Center>
      <div className="text-center space-y-6">
        <p className="text-lg">
          <Trans>Invite teammates to collaborate on your organization.</Trans>
        </p>
      </div>
    </Center>
  );
};
