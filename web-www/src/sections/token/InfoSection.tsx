import React from 'react';
import { CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import Card from '@regen-network/web-components/lib/components/cards/Card';
import Section from '@regen-network/web-components/lib/components/section';
import {
  Body,
  Subtitle,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import type { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';

import type { TokenInfoSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  card: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  image: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '40%',
      maxHeight: '100%',
    },
    [theme.breakpoints.between('xs', 834)]: {
      '& picture img': {
        objectPosition: '71% !important',
      },
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
      maxHeight: theme.spacing(50),
      '& picture img': {
        objectPosition: 'center 27% !important',
      },
    },
  },
}));

const query = graphql`
  query tokenInfoSection {
    sanityTokenPage {
      infoSection {
        title
        subtitle
        _rawBody
        image {
          ...fluidCustomImageFields_withWebp
        }
      }
    }
  }
`;

const InfoSection = (): JSX.Element => {
  const styles = useStyles();
  const { sanityTokenPage } = useStaticQuery<TokenInfoSectionQuery>(query);
  const data = sanityTokenPage?.infoSection;

  return (
    <Section>
      <Card className={styles.card}>
        <Img
          className={styles.image}
          fluid={data?.image?.image?.asset?.fluid as FluidObject}
          title={data?.image?.imageAlt || ''}
          alt={data?.image?.imageAlt || ''}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 10,
            px: [4.5, 10],
          }}
        >
          <Title variant="h3">{data?.title}</Title>
          <Subtitle size="lg" color="info.main" my={4}>
            {data?.subtitle}
          </Subtitle>
          <Body as="div" size="xl">
            <BlockContent content={data?._rawBody} />
          </Body>
        </CardContent>
      </Card>
    </Section>
  );
};

export default InfoSection;
