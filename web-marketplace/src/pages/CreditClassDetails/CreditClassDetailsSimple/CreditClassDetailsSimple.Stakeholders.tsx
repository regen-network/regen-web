import { Party } from 'web-components/lib/components/user/UserInfo';

import { Stakeholders } from 'components/organisms/Stakeholders/Stakeholders';

interface Props {
  program?: Party;
  admin?: Party;
  issuers?: Party[];
}

export const CreditClassDetailsStakeholders = ({
  admin,
  issuers,
  program,
}: Props) => {
  const stakeholders = [
    {
      parties: program,
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
      parties: admin,
      title: 'admin',
      tooltip: (
        <>
          <b>Credit class admin:</b> the entity who can update a given credit
          class.
        </>
      ),
    },
    {
      parties: issuers,
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
