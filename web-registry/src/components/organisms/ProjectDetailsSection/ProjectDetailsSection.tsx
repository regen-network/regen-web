import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { BlockContent } from 'web-components/lib/components/block-content';
import { CredibilityCard } from 'web-components/lib/components/cards/CredibilityCard/CredibilityCard';
import Section from 'web-components/lib/components/section';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import { Body, Label, Title } from 'web-components/lib/components/typography';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getPartyByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getPartyByAddrQuery/getPartyByAddrQuery';

import { usePartyInfos } from 'pages/ProfileEdit/hooks/usePartyInfos';

import { ProjectDetailsSectionStakeholders } from './ProjectDetailsSection.Stakeholders';
import { useSectionStyles } from './ProjectDetailsSection.styles';
import { ProjectDetailsSectionProps } from './ProjectDetailsSection.types';
import { getDisplayAdmin } from './ProjectDetailsSection.utils';

export const ProjectDetailsSection: React.FC<ProjectDetailsSectionProps> = ({
  header,
  credibilityCards,
  program,
  projectDeveloper,
  projectVerifier,
  adminAddr,
}) => {
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { classes } = useSectionStyles();

  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { data: csrfData } = useQuery(getCsrfTokenQuery({}));
  const { data: partyByAddr } = useQuery(
    getPartyByAddrQuery({
      client: graphqlClient,
      addr: adminAddr ?? '',
      enabled: !!adminAddr && !!graphqlClient && !!csrfData,
    }),
  );
  const { party, defaultAvatar } = usePartyInfos({ partyByAddr });

  const projectAdmin = getDisplayAdmin(adminAddr, party, defaultAvatar);

  return (
    <Section visibleOverflow sx={{ root: { pb: [20, 21.25] } }}>
      <ProjectDetailsSectionStakeholders
        program={program}
        projectAdmin={projectAdmin}
        projectDeveloper={projectDeveloper}
        projectVerifier={projectVerifier}
      />
      {header && credibilityCards?.length && (
        <ResponsiveSlider
          renderTitle={() => (
            <Box>
              <Label size="sm" mobileSize="sm" color="info.main">
                {header.label}
              </Label>
              <Title variant="h2" py={3}>
                {header.title}
              </Title>
              <Body size="lg" mobileSize="md" maxWidth={718}>
                <BlockContent content={header.descriptionRaw} />
              </Body>
            </Box>
          )}
          visibleOverflow
          arrows
          mobileItemWidth="90%"
          itemWidth="85%"
          infinite={false}
          slidesToShow={isMobile ? 1 : 2}
          classes={{ headerWrap: classes.headerWrap }}
          padding={theme.spacing(2.5)}
          items={credibilityCards.map((card, index) => (
            <CredibilityCard
              index={index}
              title={card?.credibilityCard?.title as string}
              descriptionRaw={card?.credibilityCard?.descriptionRaw}
              icon={card?.credibilityCard?.icon?.asset?.url}
              claims={
                card?.claims?.map(claim => ({
                  description: claim?.description as string,
                })) || []
              }
            />
          ))}
        />
      )}
    </Section>
  );
};
