import React from 'react';
import { useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';

import ImpactCard from 'web-components/lib/components/cards/ImpactCard';
import Section from 'web-components/lib/components/section';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import { TitleBody } from 'web-components/lib/components/text-layouts';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { BlockContent } from 'web-components/src/components/block-content';

import { ScienceTitleDescriptionSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  outcomes: {
    marginTop: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),
    },
    '& .slick-slide': {
      '& div:first-child': {
        height: '100%',
      },
    },
  },
}));

const query = graphql`
  query scienceTitleDescriptionSection {
    sanitySciencePage {
      titleDescriptionSection {
        title
        _rawDescription
        outcomes {
          image {
            imageHref
            image {
              asset {
                extension
                url
              }
            }
          }
          title
          _rawDescription
        }
      }
    }
  }
`;

const TitleDescriptionSection = (): JSX.Element => {
  const theme = useTheme();
  const styles = useStyles();
  const { sanitySciencePage } =
    useStaticQuery<ScienceTitleDescriptionSectionQuery>(query);
  const data = sanitySciencePage?.titleDescriptionSection;

  const outcomesElement: JSX.Element[] = (data?.outcomes || []).map(o => {
    return (
      <ImpactCard
        name={o?.title || ''}
        imgSrc={o?.image?.imageHref || o?.image?.image?.asset?.url || ''}
        description={<BlockContent content={o?._rawDescription} />}
        largeFontSize
      />
    );
  });

  return (
    <Section>
      <TitleBody title={data?.title || ''} body={data?._rawDescription} />
      <ResponsiveSlider
        itemWidth="90%"
        padding={theme.spacing(2.5)}
        className={styles.outcomes}
        title={'Ecological Outcomes'}
        arrows
        slidesToShow={3}
        items={outcomesElement}
      />
    </Section>
  );
};

export default TitleDescriptionSection;
