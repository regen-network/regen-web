import { CollaboratorsHookParams } from './types';
import { useAddCollaborator } from './useAddCollaborator';
import { useRemoveCollaborator } from './useRemoveCollaborator';
import { useUpdateCollaboratorRole } from './useUpdateCollaboratorRole';

export function useUpdateCollaborators(params: CollaboratorsHookParams) {
  const addCollaborator = useAddCollaborator(params);
  const removeCollaborator = useRemoveCollaborator(params);
  const updateCollaboratorRole = useUpdateCollaboratorRole(params);

  return {
    addCollaborator,
    removeCollaborator,
    updateCollaboratorRole,
  };
}
