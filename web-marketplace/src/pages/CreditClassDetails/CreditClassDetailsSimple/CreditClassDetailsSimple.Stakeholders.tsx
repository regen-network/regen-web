import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { Account } from 'web-components/src/components/user/UserInfo';

import { Stakeholders } from 'components/organisms/Stakeholders/Stakeholders';

interface Props {
  program?: Account;
  admin?: Account;
  issuers?: Account[];
}

export const CreditClassDetailsStakeholders = ({
  admin,
  issuers,
  program,
}: Props) => {
  const { _ } = useLingui();

  const stakeholders = [
    {
      accounts: program,
      title: _(msg`program`),
      tooltip: (
        <>
          <Trans>
            A <b>program</b> involves the eligibility rules, monitoring and
            certification, and registration systems for credit trading and
            ownership tracking.
          </Trans>
        </>
      ),
    },
    {
      accounts: admin,
      title: _(msg`admin`),
      tooltip: (
        <>
          <Trans>
            <b>Credit class admin:</b> the entity who can update a given credit
            class.
          </Trans>
        </>
      ),
    },
    {
      accounts: issuers,
      title: _(msg`issuers`),
      tooltip: (
        <>
          <Trans>
            <b>Credit class issuer:</b> the entity who can issue credit batches
            under the given credit class.
          </Trans>
        </>
      ),
    },
  ];

  return <Stakeholders stakeholders={stakeholders} />;
};
