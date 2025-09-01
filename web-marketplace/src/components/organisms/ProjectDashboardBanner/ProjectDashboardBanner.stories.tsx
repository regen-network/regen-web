import type { Meta } from '@storybook/react';

import ProjectDashboardBanner from './ProjectDashboardBanner';
import { ProjectBannerProps } from './ProjectDashboardBanner.types';

const meta: Meta<typeof ProjectDashboardBanner> = {
  title: 'Marketplace/Organisms/ProjectBanner',
  component: ProjectDashboardBanner,
  argTypes: {
    project: {
      control: 'object',
      description: 'Project data for the banner',
    },
    canEdit: {
      control: 'boolean',
      description: 'Show edit button',
      defaultValue: true,
    },
  },
};
export default meta;

const exampleProject: ProjectBannerProps['project'] = {
  id: '1',
  name: 'Rainforest Reforest',
  place: 'Amazon Basin, Brazil',
  area: 1200,
  areaUnit: 'ha',
  imgSrc:
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  slug: 'rainforest-restoration',
};

export const Default = (args: ProjectBannerProps) => (
  <ProjectDashboardBanner {...args} />
);

Default.args = {
  project: exampleProject,
  canEdit: true,
};
