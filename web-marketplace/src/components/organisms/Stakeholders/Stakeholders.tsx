import { Grid, TooltipProps } from '@mui/material';

import { CollapseList } from 'web-components/lib/components/organisms/CollapseList/CollapseList';
import UserInfo, { Account } from 'web-components/lib/components/user/UserInfo';
import UserInfoWithTitle from 'web-components/lib/components/user/UserInfoWithTitle';
import { defaultFontFamily } from 'web-components/lib/theme/muiTheme';

export type Stakeholder = {
  accounts: Account | Account[] | undefined;
  title: string;
  tooltip: TooltipProps['title'];
};

type Props = {
  stakeholders: Stakeholder[];
  minSm: number;
};

export const Stakeholders = ({ stakeholders, minSm }: Props) => {
  const filtered = stakeholders.filter(u =>
    Array.isArray(u.accounts) ? u.accounts.length > 0 : Boolean(u.accounts),
  );
  const sm = Math.min(12 / filtered.length, minSm);

  return (
    <Grid container columnSpacing={{ xs: 0, sm: 5 }}>
      {filtered.map(({ accounts, title, tooltip }, i) => {
        const sx =
          i !== filtered.length - 1 ? { mb: { xs: 8.25, sm: 0 } } : undefined;
        return (
          <Grid item xs={12} sm={sm} sx={sx}>
            {Array.isArray(accounts) ? (
              <>
                <UserInfoWithTitle
                  user={accounts[0]}
                  title={title}
                  tooltip={tooltip}
                  fontFamily={defaultFontFamily}
                  sx={{ mb: 7.5 }}
                />
                {accounts.length > 1 && (
                  <CollapseList
                    max={0}
                    items={accounts.slice(1, accounts.length).map(account => (
                      <UserInfo
                        user={account}
                        key={account?.name}
                        fontFamily={defaultFontFamily}
                        sx={{ mb: 7.5 }}
                      />
                    ))}
                  />
                )}
              </>
            ) : (
              <UserInfoWithTitle
                user={accounts}
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
