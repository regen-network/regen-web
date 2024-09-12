import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { Account } from 'web-components/src/components/user/UserInfo';

import { Stakeholders } from 'components/organisms/Stakeholders/Stakeholders';

type Props = {
  admin?: Account;
  projectDeveloper?: Account;
  projectVerifier?: Account;
  program?: Account;
  partners?: Account[];
};

export const ProjectDetailsStakeholders: React.FC<Props> = ({
  program,
  admin,
  projectDeveloper,
  projectVerifier,
  partners,
}) => {
  const { _ } = useLingui();

  const stakeholders = [
    {
      accounts: program,
      title: _(msg`program`),
      tooltip: (
        <Trans>
          A <b>program</b> involves the eligibility rules, monitoring and
          certification, and registration systems for credit trading and
          ownership tracking.
        </Trans>
      ),
    },
    {
      accounts: admin,
      title: _(msg`admin`),
      tooltip: (
        <Trans>
          <b>Project admin:</b> the entity who can update a given project on the
          blockchain.
        </Trans>
      ),
    },
    {
      accounts: projectDeveloper,
      title: _(msg`project developer`),
      tooltip: (
        <Trans>
          <b>Project developer:</b> the entity that is in charge of managing the
          project. The project developer can be the land owner, land steward, or
          a third party.
        </Trans>
      ),
    },
    {
      accounts: projectVerifier,
      title: _(msg`verifier`),
      tooltip: (
        <Trans>
          <b>Verifier:</b> A third party who provides a independent, impartial
          assessment of project plan and project reports (that is not the
          monitor).
        </Trans>
      ),
    },
    {
      accounts: partners,
      title: _(msg`partners`),
      tooltip: (
        <Trans>
          <b>Partners</b> can offer crucial financial support or monitor
          progress and ensure environmental standards are met.
        </Trans>
      ),
    },
  ];

  return <Stakeholders stakeholders={stakeholders} />;
};
