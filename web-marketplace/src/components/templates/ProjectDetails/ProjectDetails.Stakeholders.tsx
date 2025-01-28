import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

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
          <b>Project admin:</b> The entity responsible for technical management,
          content editing, and managing participant access for contributions.
        </Trans>
      ),
    },
    {
      accounts: projectDeveloper,
      title: _(msg`project developer`),
      tooltip: (
        <Trans>
          <b>Project developer:</b> The entity in charge of managing the
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
          <b>Project operator:</b> The entity responsible for implementing and
          managing the project, ensuring it meets sustainability and regulatory
          standards.
        </Trans>
      ),
    },
    {
      accounts: projectVerifier,
      title: _(msg`verifier`),
      tooltip: (
        <Trans>
          <b>Verifier:</b> The third party entity responsible for providing a
          independent, impartial assessment of project plan and project reports
          (that is not the monitor).
        </Trans>
      ),
    },
    {
      accounts: projectMonitor,
      title: _(msg`monitor`),
      tooltip: (
        <Trans>
          <b>Monitor:</b> The entity who tracks and verifies the environmental
          impact and performance of the project to ensure compliance and
          transparency.
        </Trans>
      ),
    },
    {
      accounts: projectOwner,
      title: _(msg`custodian`),
      tooltip: (
        <Trans>
          <b>Custodian:</b> The entity, also the project landowner, who has
          historically managed the territory. It is now part of the project
          stakeholders and receives benefits from project success.
        </Trans>
      ),
    },
    {
      accounts: partners,
      title: _(msg`partners`),
      tooltip: (
        <Trans>
          <b>Partners:</b> can offer crucial financial support or monitor
          progress and ensure environmental standards are met.
        </Trans>
      ),
    },
  ];

  const hasStakeholders = stakeholders.some(
    stakeholder =>
      stakeholder.accounts &&
      (Array.isArray(stakeholder.accounts)
        ? stakeholder.accounts.length > 0
        : Boolean(stakeholder.accounts)),
  );

  return (
    <>
      {hasStakeholders && (
        <Section className="pt-0 mb-[80px] sm:mb-[100px]">
          <div className="flex flex-col">
            <Title variant="h2" py={3} className="mb-30 sm:mb-50 py-0">
              {_(msg`Stakeholders`)}
            </Title>
            <Stakeholders stakeholders={stakeholders} />
          </div>
        </Section>
      )}
    </>
  );
};
