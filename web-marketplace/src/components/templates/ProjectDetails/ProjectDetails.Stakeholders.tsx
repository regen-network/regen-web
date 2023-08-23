import { Grid } from '@mui/material';

import { Party } from 'web-components/lib/components/user/UserInfo';
import UserInfoWithTitle from 'web-components/lib/components/user/UserInfoWithTitle';
import { defaultFontFamily } from 'web-components/lib/theme/muiTheme';

type Props = {
  admin?: Party;
  projectDeveloper?: Party;
  projectVerifier?: Party;
  program?: Party;
};

export const ProjectDetailsStakeholders: React.FC<Props> = ({
  program,
  admin,
  projectDeveloper,
  projectVerifier,
}) => {
  const sm = Math.min(
    12 /
      [program, admin, projectDeveloper, projectVerifier].filter(u =>
        Boolean(u),
      ).length,
    4,
  );

  return (
    <Grid container>
      {program && (
        <Grid item xs={12} sm={sm} sx={{ mb: { xs: 8.25, sm: 0 } }}>
          <UserInfoWithTitle
            user={program}
            title="program"
            tooltip={
              <>
                A <b>program</b> involves the eligibility rules, monitoring and
                certification, and registration systems for credit trading and
                ownership tracking.
              </>
            }
            fontFamily={defaultFontFamily}
          />
        </Grid>
      )}
      {admin && (
        <Grid item xs={12} sm={sm} sx={{ mb: { xs: 8.25, sm: 0 } }}>
          <UserInfoWithTitle
            user={admin}
            title="admin"
            tooltip={
              <>
                <b>Project admin:</b> the entity who can update a given project
                on the blockchain.
              </>
            }
            fontFamily={defaultFontFamily}
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
            fontFamily={defaultFontFamily}
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
            fontFamily={defaultFontFamily}
          />
        </Grid>
      )}
    </Grid>
  );
};
