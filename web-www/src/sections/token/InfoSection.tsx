import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Img, { FluidObject } from 'gatsby-image';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';
import Card from 'web-components/lib/components/cards/Card';
import Description from 'web-components/lib/components/description';
import { TokenInfoSectionQuery } from '../../generated/graphql';
import { BlockContent } from 'web-components/src/components/block-content';

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
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(10),
      '&:last-child': {
        paddingBottom: theme.spacing(12),
      },
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(10, 4.5),
    },
  },
  subtitle: {
    margin: theme.spacing(4, 0),
    color: theme.palette.info.main,
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(18),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  body: {
    color: theme.palette.info.dark,
    fontSize: theme.typography.pxToRem(22),
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      cursor: 'pointer',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(22),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
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
        <CardContent className={styles.cardContent}>
          <Title variant="h3">{data?.title}</Title>
          <Typography className={styles.subtitle}>{data?.subtitle}</Typography>
          <Description>
            <BlockContent className={styles.body} content={data?._rawBody} />
          </Description>
        </CardContent>
      </Card>
    </Section>
  );
};

export default InfoSection;
