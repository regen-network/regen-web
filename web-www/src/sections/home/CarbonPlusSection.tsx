import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import ContainedButton from '@regen-network/web-components/lib/components/buttons/ContainedButton';
import {
  Body,
  Label,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { HomeCarbonplusSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(15),
      paddingBottom: theme.spacing(10),
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(30),
      paddingBottom: theme.spacing(20),
      paddingLeft: theme.spacing(37.5),
    },
  },
  image: {
    float: 'right',
    width: '100%',
  },
  imageContainer: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingLeft: theme.spacing(9.5),
    },
  },
  text: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(15),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(10),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
  },
  button: {
    fontSize: theme.spacing(4.5),
    height: theme.spacing(12.5),
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: '50%',
    },
  },
  grid: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      alignItems: 'center',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      flexDirection: 'column-reverse',
    },
  },
}));

const query = graphql`
  query homeCarbonplusSection {
    cow: file(relativePath: { eq: "marketplace-preview.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityHomePageWeb {
      carbonPlusSection {
        smallHeaderFeatured
        smallHeaderCreditName
        header
        description
        linkText
        linkUrl
      }
    }
  }
`;

const CarbonplusSection: React.FC = (): JSX.Element => {
  const data = useStaticQuery<HomeCarbonplusSectionQuery>(query);
  const content = data.sanityHomePageWeb?.carbonPlusSection;
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Grid className={styles.grid} container wrap="nowrap">
        <Grid item xs={12} className={styles.text}>
          <Label sx={{ pb: [5, 7] }}>
            <Box component="span" sx={{ color: 'info.main' }}>
              {content?.smallHeaderFeatured}{' '}
            </Box>
            <Box component="span" sx={{ color: 'secondary.main' }}>
              {ReactHtmlParser(content?.smallHeaderCreditName || '')}
            </Box>
          </Label>
          <Title variant="h3">{ReactHtmlParser(content?.header || '')}</Title>
          <Body size="lg" sx={{ color: 'info.dark', py: [4, 6] }}>
            {ReactHtmlParser(content?.description || '')}
          </Body>
          <ContainedButton
            size="large"
            className={styles.button}
            href={content?.linkUrl || ''}
          >
            {content?.linkText}
          </ContainedButton>
        </Grid>
        <Grid className={styles.imageContainer} item xs={12}>
          <Img
            className={styles.image}
            fluid={data?.cow?.childImageSharp?.fluid as any}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CarbonplusSection;
