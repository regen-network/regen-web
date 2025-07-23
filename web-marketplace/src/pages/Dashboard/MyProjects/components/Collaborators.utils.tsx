import AuthorIcon from 'web-components/src/components/icons/AuthorIcon';
import { CogIcon } from 'web-components/src/components/icons/CogIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import EyeIcon from 'web-components/src/components/icons/EyeIcon';

import { Collaborator, ProjectRoleType } from './Collaborators.types';

export const mockCollaborators: Collaborator[] = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane@example.com',
    description: 'Project Lead & Designer',
    organization: 'Regen Network',
    projectRole: 'admin',
    orgRole: 'admin',
    avatar: 'https://i.pravatar.cc/299',
    isCurrentUser: true,
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    description: 'Marketing & Content Manager',
    organization: 'Ecometric',
    projectRole: 'admin',
    orgRole: 'editor',
    avatar: 'https://i.pravatar.cc/300',
    isCurrentUser: false,
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    description: 'Financial Analyst',
    organization: 'Ecometric',
    projectRole: 'viewer',
    orgRole: 'viewer',
    avatar: 'https://i.pravatar.cc/301',
    isCurrentUser: false,
  },
  {
    id: '4',
    name: 'Bob Brown',
    email: 'bob@example.com',
    description: 'Farmer',
    projectRole: 'author',
    orgRole: '',
    avatar: 'https://i.pravatar.cc/302',
    isCurrentUser: false,
  },
  {
    id: '5',
    name: 'Charlie Green',
    email: 'charlie@example.com',
    description: 'External Consultant',
    projectRole: 'admin',
    orgRole: '',
    avatar: 'https://i.pravatar.cc/303',
    isCurrentUser: false,
  },
  {
    id: '6',
    name: 'Dana White',
    email: 'dana@example.com',
    description: 'Project Manager',
    organization: 'Regen Network',
    projectRole: 'admin',
    orgRole: '',
    avatar: 'https://i.pravatar.cc/304',
    isCurrentUser: false,
  },
];

export const ROLE_OPTIONS: {
  key: ProjectRoleType;
  label: string;
  Icon: React.FC<any>;
  description: string;
}[] = [
  {
    key: 'admin',
    label: 'Admin',
    Icon: CogIcon,
    description:
      'Manages user access and can edit all project info and project credits.',
  },
  {
    key: 'editor',
    label: 'Editor',
    Icon: EditIcon,
    description:
      'Can edit all project page info and posts. Cannot manage users or credits.',
  },
  {
    key: 'author',
    label: 'Author',
    Icon: AuthorIcon,
    description:
      'Can create, edit, and delete their own data posts. Cannot see private post data.',
  },
  {
    key: 'viewer',
    label: 'Viewer',
    Icon: EyeIcon,
    description:
      'Can view all posts, documents, and location data, even when private.',
  },
];

export const ROLE_HIERARCHY: Record<ProjectRoleType, number> = {
  viewer: 0,
  author: 1,
  editor: 2,
  admin: 3,
};
