export const getProjectKey = (projectId?: string): string[] => [
  'project',
  projectId ?? '',
];
