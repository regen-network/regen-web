import { Grid } from '@mui/material';

import UserInfoWithTitle from 'web-components/lib/components/user/UserInfoWithTitle';

import { ProjectDetailsSectionStakeholdersProps } from './ProjectDetailsSection.types';

export const ProjectDetailsSectionStakeholders: React.FC<ProjectDetailsSectionStakeholdersProps> =
  ({ program, projectAdmin, projectDeveloper, projectVerifier }) => {
    const sm = Math.max(
      12 /
        [program, projectAdmin, projectDeveloper, projectVerifier].filter(u =>
          Boolean(u),
        ).length,
      2,
    );

    return (
      <Grid container>
        {program && (
          <Grid item xs={12} sm={sm}>
            <UserInfoWithTitle user={program} title="program" />
          </Grid>
        )}
        {projectAdmin && (
          <Grid item xs={12} sm={sm}>
            <UserInfoWithTitle user={projectAdmin} title="admin" />
          </Grid>
        )}
        {projectDeveloper && (
          <Grid item xs={12} sm={sm}>
            <UserInfoWithTitle
              user={projectDeveloper}
              title="project developer"
            />
          </Grid>
        )}
        {projectVerifier && (
          <Grid item xs={12} sm={sm}>
            <UserInfoWithTitle user={projectVerifier} title="verifier" />
          </Grid>
        )}
      </Grid>
    );
  };
