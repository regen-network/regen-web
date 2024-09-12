import { Link as RouterLink } from 'react-router-dom';
import { Trans } from '@lingui/macro';

import { Body } from 'web-components/src/components/typography';

type Props = {
  exampleProjectUrl: string;
};

export const ExampleProjectLink = ({ exampleProjectUrl }: Props) => {
  return (
    <Body sx={{ pt: 2, pb: 1 }}>
      <Trans>
        See an example{' '}
        <RouterLink to={exampleProjectUrl} target="_blank">
          project page»
        </RouterLink>
      </Trans>
    </Body>
  );
};
