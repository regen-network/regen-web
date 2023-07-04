import { Grid } from '@mui/material';
import cx from 'classnames';

import { CollapseList } from 'web-components/lib/components/organisms/CollapseList/CollapseList';
import Section from 'web-components/lib/components/section';
import UserInfo, { Party } from 'web-components/lib/components/user/UserInfo';
import UserInfoWithTitle from 'web-components/lib/components/user/UserInfoWithTitle';
import { defaultFontFamily } from 'web-components/lib/theme/muiTheme';

import { useWallet } from 'lib/wallet/wallet';

interface Props {
  program?: Party;
  admin?: Party;
  issuers?: Party[];
}

export const CreditClassDetailsStakeholders = ({
  admin,
  issuers,
  program,
}: Props) => {
  const { isKeplrMobileWeb } = useWallet();
  const sm = Math.min(
    12 / [program, admin, issuers].filter(item => Boolean(item)).length,
    6,
  );

  return (
    <div
      className={cx('topo-background-alternate', isKeplrMobileWeb && 'dark')}
    >
      <Section sx={{ root: { pb: [20, 21.25] } }}>
        <Grid container>
          {program && (
            <Grid item xs={12} sm={sm} sx={{ mb: { xs: 8.25, sm: 0 } }}>
              <UserInfoWithTitle
                user={program}
                title="program"
                tooltip={
                  <>
                    A <b>program</b> involves the eligibility rules, monitoring
                    and certification, and registration systems for credit
                    trading and ownership tracking.
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
                    <b>Credit class admin</b>: the entity who can update a given
                    credit class.
                  </>
                }
                fontFamily={defaultFontFamily}
              />
            </Grid>
          )}
          {issuers && issuers?.length > 0 && (
            <Grid item xs={12} sm={sm}>
              <UserInfoWithTitle
                user={issuers[0]}
                title="issuers"
                tooltip={
                  <>
                    <b>Credit class issuer</b>: the entity who can issue credit
                    batches under the given credit class.
                  </>
                }
                fontFamily={defaultFontFamily}
                sx={{ mb: 7.5 }}
              />
              {issuers?.length > 1 && (
                <CollapseList
                  max={0}
                  items={issuers.slice(1, issuers.length).map(issuer => (
                    <UserInfo
                      user={issuer}
                      key={issuer?.name}
                      fontFamily={defaultFontFamily}
                      sx={{ mb: 7.5 }}
                    />
                  ))}
                />
              )}
            </Grid>
          )}
        </Grid>
      </Section>
    </div>
  );
};
