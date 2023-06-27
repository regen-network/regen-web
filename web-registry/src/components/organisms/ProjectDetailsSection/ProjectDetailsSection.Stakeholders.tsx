import { Grid } from '@mui/material';

import UserInfoWithTitle from 'web-components/lib/components/user/UserInfoWithTitle';

import { ProjectDetailsSectionStakeholdersProps } from './ProjectDetailsSection.types';

export const ProjectDetailsSectionStakeholders: React.FC<ProjectDetailsSectionStakeholdersProps> =
  ({ program, projectAdmin, projectDeveloper, projectVerifier }) => {
    const sm = Math.min(
      12 /
        [program, projectAdmin, projectDeveloper, projectVerifier].filter(u =>
          Boolean(u),
        ).length,
      4,
    );

    return (
      <Grid container>
        {program && (
          <Grid item xs={12} sm={sm}>
            <UserInfoWithTitle
              user={program}
              title="program"
              tooltip={
                <>
                  A <b>program</b> involves the eligibility rules, monitoring
                  and certification, and registration systems for credit trading
                  and ownership tracking.
                </>
              }
            />
          </Grid>
        )}
        {projectAdmin && (
          <Grid item xs={12} sm={sm}>
            <UserInfoWithTitle
              user={projectAdmin}
              title="admin"
              tooltip={
                <>
                  <b>Project admin:</b> the entity who can update a given
                  project on the blockchain.
                </>
              }
            />
          </Grid>
        )}
        {projectDeveloper && (
          <Grid item xs={12} sm={sm}>
            <UserInfoWithTitle
              user={projectDeveloper}
              title="project developer"
              tooltip={
                <>
                  <b>Project developer:</b> the entity that is in charge of
                  managing the project. The project developer can be the land
                  owner, land steward, or a third party.
                </>
              }
            />
          </Grid>
        )}
        {projectVerifier && (
          <Grid item xs={12} sm={sm}>
            <UserInfoWithTitle
              user={projectVerifier}
              title="verifier"
              tooltip={
                <>
                  <b>Verifier:</b> A third party who provides a independent,
                  impartial assessment of project plan and project reports (that
                  is not the monitor).
                </>
              }
            />
          </Grid>
        )}
      </Grid>
    );
  };
