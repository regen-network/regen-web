import { Account } from 'web-components/lib/components/user/UserInfo';

import { Stakeholders } from 'components/organisms/Stakeholders/Stakeholders';

type Props = {
  admin?: Account;
  projectDeveloper?: Account;
  projectVerifier?: Account;
  program?: Account;
};

export const ProjectDetailsStakeholders: React.FC<Props> = ({
  program,
  admin,
  projectDeveloper,
  projectVerifier,
}) => {
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
          <b>Project admin:</b> the entity who can update a given project on the
          blockchain.
        </>
      ),
    },
    {
      accounts: projectDeveloper,
      title: 'project developer',
      tooltip: (
        <>
          <b>Project developer:</b> the entity that is in charge of managing the
          project. The project developer can be the land owner, land steward, or
          a third party.
        </>
      ),
    },
    {
      accounts: projectVerifier,
      title: 'verifier',
      tooltip: (
        <>
          <b>Verifier:</b> A third party who provides a independent, impartial
          assessment of project plan and project reports (that is not the
          monitor).
        </>
      ),
    },
  ];

  return <Stakeholders stakeholders={stakeholders} minSm={4} />;
};
