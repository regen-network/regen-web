import React from 'react';
import { Trans } from '@lingui/macro';
import { Center } from 'web-components/src/components/box';

export const PersonalInfoStep: React.FC = () => {
  return (
    <Center>
      <div className="text-center space-y-6">
        <p className="text-lg">
          <Trans>Provide personal contact information for this organization.</Trans>
        </p>
      </div>
    </Center>
  );
};
