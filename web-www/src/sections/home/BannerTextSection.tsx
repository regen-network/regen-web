import React from 'react';
import { makeStyles } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import Box from '@mui/material/Box';

import { Title } from 'web-components/lib/components/typography';
import { BlockContent } from 'web-components/src/components/block-content';

import type { Theme } from 'web-components/lib/theme/muiTheme';
import type { BannerTextSectionQuery } from '../../generated/graphql';
import type { FluidObject } from 'gatsby-image';

const useStyles = makeStyles((theme: Theme) => ({
  gradient: {
    height: '100%',
    zIndex: -1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    background:
      'linear-gradient(180deg, rgba(255, 249, 238, 0.74) 0%, rgba(255, 249, 238, 0) 27.6%), linear-gradient(194.2deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)',
    [theme.breakpoints.up('sm')]: {
      background:
        'linear-gradient(180deg, rgba(255, 249, 238, 0.74) 0%, rgba(255, 249, 238, 0) 27.6%), linear-gradient(194.2deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)',
    },
    opacity: 0.8,
  },
}));

const query = graphql`
  query bannerTextSection {
    sanityHomePageWeb {
      bannerTextSection {
        title
        _rawBody
        image {
          ...fluidCustomImageFields
        }
      }
    }
  }
`;

const BannerTextSection: React.FC = () => {
  const styles = useStyles();
  const { sanityHomePageWeb } = useStaticQuery<BannerTextSectionQuery>(query);
  const data = sanityHomePageWeb?.bannerTextSection;
  return (
    <BackgroundImage
      Tag="section"
      fluid={data?.image?.image?.asset?.fluid as FluidObject}
      backgroundColor={`#040e18`}
    >
      <div className={styles.gradient} />
      <Box
        sx={theme => ({
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: {
            xs: theme.spacing(21.25, 4),
            sm: theme.spacing(50, 30),
            tablet: theme.spacing(50, 46.25),
          },
        })}
      >
        <Title sx={{ color: 'primary.main' }} variant="h2">
          {data?.title}
        </Title>
        <Title variant="h4" sx={{ color: 'primary.main' }}>
          <BlockContent content={data?._rawBody} />
        </Title>
      </Box>
    </BackgroundImage>
  );
};

export { BannerTextSection };
