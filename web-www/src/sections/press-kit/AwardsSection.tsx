import React from 'react';
import { makeStyles } from '@mui/styles';
import Section from '@regen-network/web-components/lib/components/section';
import ResponsiveSlider from '@regen-network/web-components/lib/components/sliders/ResponsiveSlider';
import { Title } from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import { PresskitAwardsSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(8),
    },
  },
  slider: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(7.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(15),
    },
    '& .slick-slide': {
      [theme.breakpoints.down('sm')]: {
        paddingRight: `${theme.spacing(4.125)} !important`,
      },
    },
    '& a': {
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  image: {
    borderRadius: '5px',
  },
}));

const query = graphql`
  query presskitAwardsSection {
    sanityPresskitPage {
      awardsSection {
        header
        items {
          title
          link
          image {
            ...fluidSanityImageFields_withWebp
          }
        }
      }
    }
  }
`;

const AwardsSection = (): JSX.Element => {
  const styles = useStyles();
  const { sanityPresskitPage } =
    useStaticQuery<PresskitAwardsSectionQuery>(query);
  const data = sanityPresskitPage?.awardsSection;
  const items: JSX.Element[] = (data?.items || []).map(item => (
    <a href={item?.link || ''} target="_blank" rel="noopener noreferrer">
      <Img
        className={styles.image}
        fluid={item?.image?.asset?.fluid as FluidObject}
      />
      <Title variant="h5" sx={{ pt: [4, 4.5] }} color="black">
        {item?.title}
      </Title>
    </a>
  ));

  return (
    <Section
      withSlider
      title={data?.header || ''}
      classes={{ title: styles.title }}
    >
      <ResponsiveSlider
        infinite={false}
        className={styles.slider}
        itemWidth="90%"
        slidesToShow={4}
        items={items}
      />
    </Section>
  );
};

export default AwardsSection;
