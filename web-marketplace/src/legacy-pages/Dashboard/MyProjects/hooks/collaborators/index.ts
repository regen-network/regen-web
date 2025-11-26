import { CollaboratorsHookParams } from './types';
import { useAddCollaborator } from './useAddCollaborator';
// import { useRemoveCollaborator } from './useRemoveCollaborator';
// import { useUpdateCollaboratorRole } from './useUpdateCollaboratorRole';
// import { useUpdateCollaboratorVisibility } from './useUpdateCollaboratorVisibility';

export function useUpdateCollaborators(params: CollaboratorsHookParams) {
  const addCollaborator = useAddCollaborator(params);
  // const removeCollaborator = useRemoveCollaborator(params);
  // const updateRole = useUpdateCollaboratorRole(params);
  // const updateVisibility = useUpdateCollaboratorVisibility({
  //   daoAddress: params.daoAddress,
  //   collaborators: params.collaborators,
  //   daoAccountsOrderBy: params.daoAccountsOrderBy,
  // });
  return {
    addCollaborator,
    //removeCollaborator, updateRole, updateVisibility
  };
}
