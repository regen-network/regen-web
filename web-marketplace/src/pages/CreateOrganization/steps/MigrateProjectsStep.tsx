import React from 'react';
import { Trans } from '@lingui/macro';
import { Center } from 'web-components/src/components/box';

export const MigrateProjectsStep: React.FC = () => {
  return (
    <Center>
      <div className="text-center space-y-6">
        <p className="text-lg">
          <Trans>Link or migrate existing projects to your organization.</Trans>
        </p>
      </div>
    </Center>
  );
};
