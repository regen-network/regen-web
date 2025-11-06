import { plural, Trans } from '@lingui/macro';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import { Body, Title } from 'web-components/src/components/typography';

type OrganizationCreatedModalProps = RegenModalProps & {
  numberOfMigratedProjects: number;
};
export const OrganizationCreatedModal = ({
  open,
  onClose,
  numberOfMigratedProjects,
}: OrganizationCreatedModalProps) => (
  <Modal open={open} onClose={onClose}>
    <Title variant="h4" className="pb-20 text-center">
      <Trans>Organization has been created!</Trans>
    </Title>
    {numberOfMigratedProjects > 0 && (
      <Body size="lg" className="text-center pb-20 italic font-bold">
        <Trans>
          {plural(numberOfMigratedProjects, {
            one: `${numberOfMigratedProjects} project`,
            other: `${numberOfMigratedProjects} projects`,
          })}
          , with all associated credits and sell orders,{' '}
          {plural(numberOfMigratedProjects, {
            one: `was`,
            other: `were`,
          })}{' '}
          migrated to your new organization account.
        </Trans>
      </Body>
    )}
    <Body size="lg" className="text-center">
      <Trans>
        Please note: this organization is represented on-chain by a DAO
        (Decentralized Autonomous Organization). You can{' '}
        <a href="TODO" target="_blank" rel="noreferrer noopener">
          learn more about DAOs in our documentation
        </a>
        , including how they work and the ways you can participate.
      </Trans>
    </Body>
    <div className="pt-50 flex justify-end">
      <ContainedButton onClick={onClose}>
        <Trans>view org profile</Trans>
      </ContainedButton>
    </div>
  </Modal>
);
