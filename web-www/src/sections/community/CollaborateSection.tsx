import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';

import Title from 'web-components/lib/components/title';
import ResourceCardsSlider from 'web-components/lib/components/sliders/ResourceCards';
import Section from 'web-components/lib/components/section';
import Description from 'web-components/lib/components/description';
import { CommunityCollaborateSectionQuery, CommunityConnectSectionQuery } from '../../generated/graphql';
import { BlockContent } from 'web-components/src/components/block-content';
import { ResourcesCardProps } from 'web-components/lib/components/cards/ResourcesCard';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.5),
      paddingBottom: theme.spacing(23.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(3),
      paddingTop: theme.spacing(17),
      paddingBottom: theme.spacing(25),
    },
  },
  title: {
    marginBottom: theme.spacing(8.5),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(6.75),
      fontSize: theme.typography.pxToRem(38),
    },
  },
  body: {
    textAlign: 'center',
    marginBottom: theme.spacing(15),
    maxWidth: theme.spacing(225),
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
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
  const { sanityCommunityPage } = useStaticQuery<CommunityCollaborateSectionQuery>(query);
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
      <Title className={styles.title} variant="h3" align="center">
        {data?.titleBody?.title}
      </Title>
      <Description className={styles.body}>
        <BlockContent content={data?.titleBody?._rawBody} />
      </Description>
      <ResourceCardsSlider target="_self" items={resourceCards || []} />
    </Section>
  );
};

export default CollaborateSection;
