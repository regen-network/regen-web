import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Grid } from '@mui/material';

import Section from 'web-components/src/components/section';
import { Title } from 'web-components/src/components/typography';
import { Account } from 'web-components/src/components/user/UserInfo';

import { Stakeholders } from 'components/organisms/Stakeholders/Stakeholders';

type Props = {
  admin?: Account;
  projectDeveloper?: Account;
  projectVerifier?: Account;
  program?: Account;
  partners?: Account[];
  projectOwner?: Account;
  projectOperator?: Account;
  projectMonitor?: Account;
};

export const ProjectDetailsStakeholders: React.FC<Props> = ({
  program,
  admin,
  projectDeveloper,
  projectVerifier,
  partners,
  projectOwner,
  projectOperator,
  projectMonitor,
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
      accounts: projectOperator,
      title: _(msg`operator`),
      tooltip: (
        <Trans>
          A project operator is responsible for implementing and managing the
          project, ensuring it meets sustainability and regulatory standards.
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
      accounts: projectMonitor,
      title: _(msg`monitor`),
      tooltip: (
        <Trans>
          A monitor tracks and verifies the environmental impact and performance
          of the project to ensure compliance and transparency.
        </Trans>
      ),
    },
    {
      accounts: projectOwner,
      title: _(msg`owner`),
      tooltip: (
        <Trans>
          A project owner manages the area of the conservation project and the
          associated biodiversity units.
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

  return (
    <Section className="pt-0 mb-[80px] sm:mb-[100px]">
      <div className="flex flex-col">
        <Title variant="h2" py={3} className="mb-30 sm:mb-50 py-0">
          {_(msg`Stakeholders`)}
        </Title>
        <Stakeholders stakeholders={stakeholders} />
      </div>
    </Section>
  );
};
