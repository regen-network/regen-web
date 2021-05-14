import React from 'react';

import { projects } from '../../mocks';
import { ProjectList } from '../organisms';

function Projects(): JSX.Element {
  return <ProjectList projects={projects} />;
}

export { Projects };
