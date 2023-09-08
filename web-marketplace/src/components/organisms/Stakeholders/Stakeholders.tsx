import { Grid, TooltipProps } from '@mui/material';

import { CollapseList } from 'web-components/lib/components/organisms/CollapseList/CollapseList';
import UserInfo, { Party } from 'web-components/lib/components/user/UserInfo';
import UserInfoWithTitle from 'web-components/lib/components/user/UserInfoWithTitle';
import { defaultFontFamily } from 'web-components/lib/theme/muiTheme';

export type Stakeholder = {
  parties: Party | Party[] | undefined;
  title: string;
  tooltip: TooltipProps['title'];
};

type Props = {
  stakeholders: Stakeholder[];
  minSm: number;
};

export const Stakeholders = ({ stakeholders, minSm }: Props) => {
  const filtered = stakeholders.filter(u =>
    Array.isArray(u.parties) ? u.parties.length > 0 : Boolean(u.parties),
  );
  const sm = Math.min(12 / filtered.length, minSm);

  return (
    <Grid container columnSpacing={{ xs: 0, sm: 5 }}>
      {filtered.map(({ parties, title, tooltip }, i) => {
        const sx =
          i !== filtered.length - 1 ? { mb: { xs: 8.25, sm: 0 } } : undefined;
        return (
          <Grid item xs={12} sm={sm} sx={sx}>
            {Array.isArray(parties) ? (
              <>
                <UserInfoWithTitle
                  user={parties[0]}
                  title={title}
                  tooltip={tooltip}
                  fontFamily={defaultFontFamily}
                  sx={{ mb: 7.5 }}
                />
                {parties.length > 1 && (
                  <CollapseList
                    max={0}
                    items={parties.slice(1, parties.length).map(party => (
                      <UserInfo
                        user={party}
                        key={party?.name}
                        fontFamily={defaultFontFamily}
                        sx={{ mb: 7.5 }}
                      />
                    ))}
                  />
                )}
              </>
            ) : (
              <UserInfoWithTitle
                user={parties}
                title={title}
                tooltip={tooltip}
                fontFamily={defaultFontFamily}
              />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};
