import React from 'react';
import { makeStyles } from '@mui/styles';
import { ImageItemProps } from '@regen-network/web-components/lib/components/image-item';
import Section from '@regen-network/web-components/lib/components/section';
import ImageItems from '@regen-network/web-components/lib/components/sliders/ImageItems';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';
import SanityImage from 'gatsby-plugin-sanity-image';

import { HomeValuesSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(14),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(30),
    },
  },
  sliderContainer: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(7.75),
    },
  },
  image: {
    height: theme.spacing(39),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(6.25),
    },
  },
}));

const query = graphql`
  query homeValuesSection {
    sanityHomePageWeb {
      valuesSection {
        header
        imageItems {
          title
          description
          image {
            ...Image
          }
        }
      }
    }
  }
`;

const HomeValues: React.FC<{ className?: string }> = ({ className }) => {
  const styles = useStyles();
  const { sanityHomePageWeb } = useStaticQuery<HomeValuesSectionQuery>(query);
  const content = sanityHomePageWeb?.valuesSection;

  const imageItems: ImageItemProps[] = (content?.imageItems || []).map(item => {
    return {
      title: item?.title || '',
      description: item?.description || '',
      img: <SanityImage {...(item?.image as any)} alt={item?.title || ''} />,
    };
  }) as ImageItemProps[];

  return (
    <Section
      withSlider
      className={styles.root}
      titleVariant="h1"
      titleLineHeight="130%"
      title={content?.header || ''}
    >
      <div className={styles.sliderContainer}>
        <ImageItems
          imageClassName={styles.image}
          titleVariant="h3"
          items={imageItems}
        />
      </div>
    </Section>
  );
};

export default HomeValues;
