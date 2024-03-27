import { ProjectCardProps } from 'web-components/src/components/cards/ProjectCard';
import EditIcon from 'web-components/src/components/icons/EditIcon';

export const getDefaultProject = (disabled: boolean): ProjectCardProps => ({
  name: '',
  imgSrc: '/jpg/default-project.jpg',
  place: '',
  area: 0,
  areaUnit: 'ha',
  button: {
    text: 'Edit project',
    startIcon: (
      <EditIcon
        sx={{ width: 20, height: 20, color: disabled ? 'grey.100' : 'inherit' }}
      />
    ),
    disabled,
  },
});
