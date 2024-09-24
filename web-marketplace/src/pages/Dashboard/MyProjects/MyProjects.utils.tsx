import { ProjectCardProps } from 'web-components/src/components/cards/ProjectCard';
import EditIcon from 'web-components/src/components/icons/EditIcon';

import {
  DRAFT_TEXT,
  getProjectCardBodyTextMapping,
  getProjectCardButtonMapping,
  getProjectCardPurchaseDetailsTitleMapping,
} from 'lib/constants/shared.constants';
import { TranslatorType } from 'lib/i18n/i18n.types';

import { ProjectsDraftStatus } from 'pages/ProjectCreate/ProjectCreate.store';
import { EDIT_PROJECT } from 'pages/ProjectEdit/ProjectEdit.constants';
import { ProjectWithOrderData } from 'pages/Projects/AllProjects/AllProjects.types';

export const getDefaultProject = (
  disabled: boolean,
  _: TranslatorType,
): ProjectCardProps => ({
  name: '',
  imgSrc: '/jpg/default-project.jpg',
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
        draft: project.offChain && !project.published,
      });
    } else {
      // Project exists, update its 'draft' status
      newState[projectIndex] = {
        ...newState[projectIndex],
        draft: project.offChain && !project.published,
      };
    }
  });

  return newState;
};
