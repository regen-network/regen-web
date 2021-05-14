import React from 'react';
import { projects, projectDefault, Project as ProjectType } from '../mocks';
import { useParams } from 'react-router-dom';

import { ProjectDetails } from '../components/organisms';

function Project(): JSX.Element {
  let { projectId } = useParams<{ projectId: string }>();
  const project: ProjectType | undefined = projects.find(p => p.id === projectId);

  if (project) {
    return <ProjectDetails projects={projects} project={project} projectDefault={projectDefault} />;
  }
  return <div>No project found</div>;
}

export { Project };
