import React from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { Title } from '@regen-network/web-components/lib/components/typography';
import type { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import type { FluidObject } from 'gatsby-image';

import type { BannerTextSectionQuery } from '../../generated/graphql';

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
        <Title variant="h2" color="primary" align="center">
          {data?.title}
        </Title>
        <Title
          as="div"
          variant="h4"
          mobileVariant="h6"
          color="primary"
          align="center"
          mt={[3, 5]}
        >
          <BlockContent content={data?._rawBody} />
        </Title>
      </Box>
    </BackgroundImage>
  );
};

export { BannerTextSection };
