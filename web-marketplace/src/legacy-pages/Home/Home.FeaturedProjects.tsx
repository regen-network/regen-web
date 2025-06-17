import { Link } from 'react-router-dom';
import { Trans } from '@lingui/react/macro';
import { Box } from '@mui/material';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';

import {
  HomePageProjectsSection,
  Maybe,
  Scalars,
} from 'generated/sanity-graphql';

import { ProjectCardsSection } from 'components/organisms/ProjectCardsSection/ProjectCardsSection';
import { useOnBuyButtonClick } from 'hooks/useOnBuyButtonClick';

import { useFeaturedProjects } from './hooks/useFeaturedProjects';

type Props = {
  title: string;
  body: Maybe<Scalars['JSON']>;
  sanityFeaturedProjects: HomePageProjectsSection['projects'];
};

export function FeaturedProjects({
  title,
  body,
  sanityFeaturedProjects,
}: Props): JSX.Element {
  const pinnedIds = sanityFeaturedProjects?.map(project =>
    String(project?.projectId),
  );
  const { featuredProjects, loading } = useFeaturedProjects({ pinnedIds });
  const onBuyButtonClick = useOnBuyButtonClick();

  return (
    <div id="projects">
      <ProjectCardsSection
        title={title}
        body={body}
        projects={featuredProjects}
        onButtonClick={({ project }) => {
          onBuyButtonClick({
            projectId: project?.id,
            cardSellOrders: project?.cardSellOrders,
            loading,
          });
        }}
        loading={loading}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 20 }}>
        <Link to="/projects/1">
          <ContainedButton>
            <Trans>DISCOVER PROJECTS</Trans>
          </ContainedButton>
        </Link>
      </Box>
    </div>
  );
}
