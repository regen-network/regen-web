import { ProjectsDraftStatus } from 'legacy-pages/ProjectCreate/ProjectCreate.store';
import { EDIT_PROJECT } from 'legacy-pages/ProjectEdit/ProjectEdit.constants';
import { ProjectWithOrderData } from 'legacy-pages/Projects/AllProjects/AllProjects.types';

import { ProjectCardProps } from 'web-components/src/components/cards/ProjectCard';
import EditIcon from 'web-components/src/components/icons/EditIcon';

import { Assignment } from 'generated/graphql';
import {
  DRAFT_TEXT,
  getProjectCardBodyTextMapping,
  getProjectCardButtonMapping,
  getProjectCardPurchaseDetailsTitleMapping,
} from 'lib/constants/shared.constants';
import { TranslatorType } from 'lib/i18n/i18n.types';

import { ROLE_ADMIN } from 'components/organisms/ActionDropdown/ActionDropdown.constants';
import { ProjectRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';

import defaultProject from '../../../../public/jpg/default-project.jpg';
import { UseCanAccessManageProjectWithRoleParams } from './hooks/useCanAccessManageProjectWithRole';

export const getDefaultProject = (
  disabled: boolean,
  _: TranslatorType,
): ProjectCardProps => ({
  name: '',
  imgSrc: defaultProject.src,
  place: '',
  area: 0,
  areaUnit: 'ha',
  containedButton: {
    text: _(EDIT_PROJECT),
    startIcon: (
      <EditIcon
        sx={{
          width: 20,
          height: 20,
          color: disabled ? 'primary.main' : 'inherit',
        }}
      />
    ),
    disabled,
  },
  draftText: _(DRAFT_TEXT),
  bodyTexts: getProjectCardBodyTextMapping(_),
  buttons: getProjectCardButtonMapping(_),
  purchaseDetailsTitles: getProjectCardPurchaseDetailsTitleMapping(_),
});

export const handleProjectsDraftStatus = (
  state: ProjectsDraftStatus,
  projects: ProjectWithOrderData[],
): ProjectsDraftStatus => {
  let newState = [...state];

  projects.forEach(project => {
    const projectIndex = newState.findIndex(item => item.id === project.id);

    if (projectIndex === -1) {
      // Project does not exist, add it
      newState.push({
        id: project.id,
        draft: project.offChain && project.draft,
      });
    } else {
      // Project exists, update its 'draft' status
      newState[projectIndex] = {
        ...newState[projectIndex],
        draft: project.offChain && project.draft,
      };
    }
  });

  return newState;
};

export type CanAccessManageProjectWithRoleParams =
  UseCanAccessManageProjectWithRoleParams & {
    assignments?: (Pick<Assignment, 'accountId' | 'roleName'> | null)[] | null;
  };
export const canAccessManageProjectWithRole = ({
  onChainProject,
  offChainProject,
  activeAccountId,
  wallet,
  assignments,
}: CanAccessManageProjectWithRoleParams) => {
  const isAccountAdmin =
    (onChainProject?.admin && wallet?.address === onChainProject.admin) ||
    (offChainProject?.adminAccountId &&
      activeAccountId === offChainProject?.adminAccountId);

  const activeAccountRole = assignments?.find(
    assignment => assignment?.accountId === activeAccountId,
  )?.roleName;

  const isProjectCollaborator = Boolean(activeAccountRole);

  return {
    canAccessManageProject: isAccountAdmin || isProjectCollaborator,
    role: (offChainProject?.daoByAdminDaoAddress
      ? activeAccountRole
      : isAccountAdmin
      ? ROLE_ADMIN
      : undefined) as ProjectRole | undefined,
  };
};
