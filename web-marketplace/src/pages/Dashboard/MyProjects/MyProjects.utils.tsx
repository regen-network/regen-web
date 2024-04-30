import { ProjectCardProps } from 'web-components/src/components/cards/ProjectCard';
import EditIcon from 'web-components/src/components/icons/EditIcon';

import { EDIT_PROJECT } from 'pages/ProjectEdit/ProjectEdit.constants';

export const getDefaultProject = (disabled: boolean): ProjectCardProps => ({
  name: '',
  imgSrc: '/jpg/default-project.jpg',
  place: '',
  area: 0,
  areaUnit: 'ha',
  button: {
    text: EDIT_PROJECT,
    startIcon: (
      <EditIcon
        sx={{ width: 20, height: 20, color: disabled ? 'grey.100' : 'inherit' }}
      />
    ),
    disabled,
  },
});
