import { Trans } from '@lingui/react/macro';

export const RoleTooltip = ({ docsUrl }: { docsUrl: string }) => {
  return (
    <Trans>
      Learn more about roles{' '}
      <a
        href={docsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sc-text-link border-none bg-transparent cursor-pointer pl-0 font-bold"
      >
        in our docs
      </a>
    </Trans>
  );
};
