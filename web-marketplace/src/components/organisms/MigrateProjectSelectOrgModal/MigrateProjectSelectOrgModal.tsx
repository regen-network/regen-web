import { useMemo, useState } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { getDefaultAvatar } from 'legacy-pages/Dashboard/Dashboard.utils';
import { useMigrateProject } from 'legacy-pages/Dashboard/MyProjects/hooks/useMigrateProject';

import Modal from 'web-components/src/components/modal';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Body, Title } from 'web-components/src/components/typography';
import { RegenModalPropsWithOnClose } from 'web-components/src/types/shared/modalPropsWithOnClose';

import { AccountType } from 'generated/graphql';
import { WHOOPS_CANCEL } from 'lib/constants/shared.constants';

import { useDaoOrganizations } from 'hooks/useDaoOrganizations';

import { UNNAMED } from '../DashboardNavigation/DashboardNavigation.constants';
import { AccountOption } from '../DashboardNavigation/DashboardNavigation.types';
import { ProjectAccountSelector } from '../ProjectAccountSelector';

type MigrateProjectSelectOrgModalProps = RegenModalPropsWithOnClose & {
  migrateProject: ReturnType<typeof useMigrateProject>['migrateProject'];
  eligibleOrganizations: ReturnType<typeof useDaoOrganizations>;
};

export const MigrateProjectSelectOrgModal = ({
  open,
  onClose,
  migrateProject,
  eligibleOrganizations,
}: MigrateProjectSelectOrgModalProps) => {
  const { _ } = useLingui();

  const organizationAccounts = useMemo(
    (): AccountOption[] =>
      eligibleOrganizations
        .filter(dao => !!dao)
        .map(dao => ({
          name: dao!.organizationByDaoAddress?.name || _(UNNAMED),
          address: dao!.address ?? '',
          image:
            dao!.organizationByDaoAddress?.image ||
            getDefaultAvatar({ type: AccountType.Organization }),
        })),
    [eligibleOrganizations, _],
  );

  const [selectedAddress, setSelectedAddress] = useState(
    organizationAccounts[0]?.address ?? '',
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Title variant="h4" className="mb-20 text-center">
        <Trans>
          Are you sure you want to migrate this project to your organization?
        </Trans>
      </Title>
      <Body size="lg" className="mb-30 text-center">
        <Trans>
          Migrating this project to your organization will enable project
          collaboration between all members of your organization.
        </Trans>
      </Body>
      <ProjectAccountSelector
        accounts={organizationAccounts}
        selectedAddress={selectedAddress}
        onSelect={setSelectedAddress}
        label={_(msg`Choose organization`)}
        menuPortal
      />
      <div className="mt-30">
        <CancelButtonFooter
          label={_(msg`yes, migrate`)}
          cancelLabel={_(WHOOPS_CANCEL)}
          onCancel={onClose}
          onClick={() =>
            migrateProject({ organizationAddress: selectedAddress })
          }
        />
      </div>
    </Modal>
  );
};
