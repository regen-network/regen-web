import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Img from 'gatsby-image';
import ReactHtmlParser from 'react-html-parser';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { Title } from 'web-components/lib/components/typography';
import Description from 'web-components/lib/components/description';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { HomeCarbonplusSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(15),
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(30),
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
  smallHeader: {
    fontWeight: 800,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(7),
    },
  },
  header: {
    lineHeight: '140%',
  },
  featured: {
    color: theme.palette.info.main,
  },
  creditName: {
    color: theme.palette.secondary.main,
  },
  description: {
    color: theme.palette.info.dark,
    lineHeight: '150%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      paddingTop: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      paddingBottom: theme.spacing(6),
      paddingTop: theme.spacing(6),
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
    cow: file(relativePath: { eq: "cow.png" }) {
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
          <Title variant="h6" className={styles.smallHeader}>
            <span className={styles.featured}>
              {content?.smallHeaderFeatured}{' '}
            </span>
            <span className={styles.creditName}>
              {ReactHtmlParser(content?.smallHeaderCreditName || '')}
            </span>
          </Title>
          <Title className={styles.header} variant="h3">
            {ReactHtmlParser(content?.header || '')}
          </Title>
          <Description className={styles.description}>
            {ReactHtmlParser(content?.description || '')}
          </Description>
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
