import { Trans } from '@lingui/react/macro';
import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import { Body, Title } from 'web-components/src/components/typography';
import { ProjectAccountSelector } from '../ProjectAccountSelector';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useMemo } from 'react';
import { useDaoOrganizations } from 'hooks/useDaoOrganizations';
import { AccountType } from 'generated/graphql';
import { getDefaultAvatar } from 'legacy-pages/Dashboard/Dashboard.utils';
import {
  UNNAMED,
  ORG,
} from '../DashboardNavigation/DashboardNavigation.constants';
import { AccountOption } from '../DashboardNavigation/DashboardNavigation.types';

type MigrateProjectSelectOrgModalProps = RegenModalProps & any;
export const MigrateProjectSelectOrgModal = ({
  open,
  onClose,
  migrateProject,
}: MigrateProjectSelectOrgModalProps) => {
  const { _ } = useLingui();
  const daoOrganizations = useDaoOrganizations();

  const organizationAccounts = useMemo(
    (): AccountOption[] =>
      daoOrganizations
        .filter(dao => !!dao)
        .map(dao => ({
          name: dao!.organizationByDaoAddress?.name || _(UNNAMED),
          address: dao!.address ?? '',
          type: ORG,
          image: getDefaultAvatar({ type: AccountType.Organization }),
          displayName: _(msg`Organization`),
        })),
    [daoOrganizations, _],
  );
  return (
    <Modal open={open} onClose={onClose}>
      <Title variant="h4">
        <Trans>
          Are you sure you want to migrate this project to your organization?
        </Trans>
      </Title>
      <Body size="lg">
        <Trans>
          Migrating this project to your organization will enable project
          collaboration between all members of your organization:
        </Trans>
      </Body>
      <ProjectAccountSelector
        accounts={organizationAccounts}
        selectedAddress={''}
        onSelect={function (id: string): void {
          console.log('id', id);
          migrateProject()
        }}
        label={_(msg`Choose organization`)}
      />
    </Modal>
  );
};
