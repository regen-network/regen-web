import { Account } from 'web-components/lib/components/user/UserInfo';

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
  const stakeholders = [
    {
      accounts: program,
      title: 'program',
      tooltip: (
        <>
          A <b>program</b> involves the eligibility rules, monitoring and
          certification, and registration systems for credit trading and
          ownership tracking.
        </>
      ),
    },
    {
      accounts: admin,
      title: 'admin',
      tooltip: (
        <>
          <b>Credit class admin:</b> the entity who can update a given credit
          class.
        </>
      ),
    },
    {
      accounts: issuers,
      title: 'issuers',
      tooltip: (
        <>
          <b>Credit class issuer:</b> the entity who can issue credit batches
          under the given credit class.
        </>
      ),
    },
  ];

  return <Stakeholders stakeholders={stakeholders} minSm={6} />;
};
