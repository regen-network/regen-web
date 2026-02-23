import { Trans } from '@lingui/react/macro';

import { Link } from 'components/atoms/Link';

export const RoleTooltip = ({ docsUrl }: { docsUrl: string }) => {
  return (
    <Trans>
      Learn more about roles{' '}
      <Link href={docsUrl} className="text-sc-text-link font-bold">
        in our docs
      </Link>
    </Trans>
  );
};
