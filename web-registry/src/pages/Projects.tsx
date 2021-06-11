import React from 'react';

import { projects } from '../mocks';
import { ProjectList } from '../components/templates';

const Projects: React.FC = () => {
  return <ProjectList projects={projects} />;
};

export { Projects };
