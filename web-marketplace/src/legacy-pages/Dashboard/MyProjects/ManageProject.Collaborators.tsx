import { useLocation, useParams } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { ProjectCollaborators } from 'components/organisms/ProjectCollaborators/ProjectCollaborators';
import { ProjectRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';

const Collaborators = (): JSX.Element => {
  const { projectId } = useParams<{ projectId: string }>();
  const { _ } = useLingui();
  const location = useLocation();

  return (
    <>
      <ProjectCollaborators
        collaborators={[]}
        onInvite={function (): void {
          throw new Error('Function not implemented.');
        }}
        onToggleSort={function (): void {
          throw new Error('Function not implemented.');
        }}
        onUpdateRole={function (id: string, role: ProjectRole): void {
          throw new Error('Function not implemented.');
        }}
        onRemove={function (id: string): void {
          throw new Error('Function not implemented.');
        }}
        onEditOrgRole={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};

export default Collaborators;
