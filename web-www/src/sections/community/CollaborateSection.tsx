import React from 'react';
import { makeStyles } from '@mui/styles';
import { ResourcesCardProps } from '@regen-network/web-components/lib/components/cards/ResourcesCard';
import Section from '@regen-network/web-components/lib/components/section';
import ResourceCardsSlider from '@regen-network/web-components/lib/components/sliders/ResourceCards';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import { graphql, useStaticQuery } from 'gatsby';

import { CommunityCollaborateSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.5),
      paddingBottom: theme.spacing(23.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingTop: theme.spacing(17),
      paddingBottom: theme.spacing(25),
    },
  },
}));

const query = graphql`
  query communityCollaborateSection {
    sanityCommunityPage {
      collaborateSection {
        titleBody {
          title
          _rawBody
        }
        cards {
          image {
            image {
              asset {
                url
              }
            }
          }
          title
          description
          buttonText
          buttonHref
        }
      }
    }
  }
`;

const CollaborateSection = (): JSX.Element => {
  const styles = useStyles();
  const { sanityCommunityPage } =
    useStaticQuery<CommunityCollaborateSectionQuery>(query);
  const data = sanityCommunityPage?.collaborateSection;
  const resourceCards = data?.cards?.map(card => {
    return {
      description: card?.description,
      image: { publicURL: card?.image?.image?.asset?.url },
      link: card?.buttonHref,
      title: card?.title,
    } as ResourcesCardProps;
  });
  return (
    <Section className={styles.section}>
      <Title variant="h2" align="center" sx={{ mb: [8.5, 6.75] }}>
        {data?.titleBody?.title}
      </Title>
      <Body
        as="div"
        size="xl"
        mobileSize="md"
        sx={theme => ({
          maxWidth: theme.spacing(225),
          textAlign: 'center',
          m: '0 auto',
          pt: { sm: 4 },
          pb: { xs: 20, sm: 23.25 },
        })}
      >
        <BlockContent content={data?.titleBody?._rawBody} />
      </Body>
      <ResourceCardsSlider target="_self" items={resourceCards || []} />
    </Section>
  );
};

export default CollaborateSection;
