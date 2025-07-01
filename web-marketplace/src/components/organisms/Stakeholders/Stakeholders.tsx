import { useMemo } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Grid, TooltipProps } from '@mui/material';

import { CollapseList } from 'web-components/src/components/organisms/CollapseList/CollapseList';
import Section from 'web-components/src/components/section';
import { Title } from 'web-components/src/components/typography';
import UserInfo, { Account } from 'web-components/src/components/user/UserInfo';
import UserInfoWithTitle from 'web-components/src/components/user/UserInfoWithTitle';
import { defaultFontFamily } from 'web-components/src/theme/muiTheme';
import { cn } from 'web-components/src/utils/styles/cn';

import { SEE_LESS, SEE_MORE } from 'lib/constants/shared.constants';

import { Link } from 'components/atoms/Link';

export type Stakeholder = {
  accounts: Account | Account[] | undefined;
  title: string;
  tooltip: TooltipProps['title'];
};

type Props = {
  stakeholders: Stakeholder[];
  className?: string;
};

export const Stakeholders = ({ stakeholders, className }: Props) => {
  const { _ } = useLingui();

  const filtered = stakeholders.filter(u =>
    Array.isArray(u.accounts) ? u.accounts.length > 0 : Boolean(u.accounts),
  );
  const sm = filtered.length === 4 ? 3 : 4;

  const hasStakeholders = useMemo(
    () =>
      stakeholders.some(
        stakeholder =>
          stakeholder.accounts &&
          (Array.isArray(stakeholder.accounts)
            ? stakeholder.accounts.length > 0
            : Boolean(stakeholder.accounts)),
      ),
    [stakeholders],
  );

  return (
    <>
      {hasStakeholders && (
        <Section className={cn('pt-0 mb-[80px] sm:mb-[100px]', className)}>
          <div className="flex flex-col">
            <Title variant="h2" py={3} className="mb-30 sm:mb-50 py-0">
              {_(msg`Stakeholders`)}
            </Title>
            <Grid
              container
              columnSpacing={{ xs: 0, sm: 5 }}
              rowSpacing={{ sm: 10.75 }}
            >
              {filtered.map(({ accounts, title, tooltip }, i) => {
                const sx =
                  i !== filtered.length - 1
                    ? { mb: { xs: 8.25, sm: 0 } }
                    : undefined;
                return (
                  <Grid item xs={12} sm={sm} sx={sx} key={i}>
                    {Array.isArray(accounts) ? (
                      <>
                        <UserInfoWithTitle
                          user={accounts[0]}
                          title={title}
                          tooltip={tooltip}
                          fontFamily={defaultFontFamily}
                          sx={{
                            mb: accounts.length > 1 ? { xs: 5, sm: 7.5 } : 7.5,
                          }}
                          linkComponent={Link}
                        />
                        {accounts.length > 1 && (
                          <CollapseList
                            seeMoreText={_(SEE_MORE)}
                            seeLessText={_(SEE_LESS)}
                            max={0}
                            items={accounts
                              .slice(1, accounts.length)
                              .map(account => (
                                <UserInfo
                                  user={account}
                                  key={account?.name}
                                  fontFamily={defaultFontFamily}
                                  sx={{ mb: { xs: 5, sm: 7.5 } }}
                                  linkComponent={Link}
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
                        linkComponent={Link}
                      />
                    )}
                  </Grid>
                );
              })}
            </Grid>{' '}
          </div>
        </Section>
      )}
    </>
  );
};
