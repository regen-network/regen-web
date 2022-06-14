import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';

import { TeamContributorSectionQuery } from '../../generated/graphql';
import { TeamItemProps } from 'web-components/lib/components/team-item';
import { Theme } from 'web-components/lib/theme/muiTheme';
import TeamSection from 'web-components/lib/components/team-section';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: `${theme.palette.grey[50]}`,
    borderTop: `1px solid ${theme.palette.info.light}`,
    borderBottom: `1px solid ${theme.palette.info.light}`,
  },
}));

const query = graphql`
  query teamContributorSection {
    background: file(relativePath: { eq: "team-bg.png" }) {
      publicURL
    }
    sanityTeamPage {
      contributorSection {
        ...teamSectionFields
      }
    }
  }
`;

const ContributorSection = (): JSX.Element => {
  const { background, sanityTeamPage } =
    useStaticQuery<TeamContributorSectionQuery>(query);
  const data = sanityTeamPage?.contributorSection;
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <TeamSection
        bgUrl={background?.publicURL || ''}
        members={(data?.members || []).map(
          m => ({ imgUrl: m?.image?.asset?.url, ...m } as TeamItemProps),
        )}
        title={data?.title || ''}
      />
    </div>
  );
};

export default ContributorSection;
