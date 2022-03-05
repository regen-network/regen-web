import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { TitleDescription } from 'web-components/lib/components/text-layouts';
import Section from 'web-components/lib/components/section';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import ImpactCard from 'web-components/lib/components/cards/ImpactCard';
import { ScienceTitleDescriptionSectionQuery } from '../../generated/graphql';
import { BlockContent } from 'web-components/src/components/block-content';

const useStyles = makeStyles((theme: Theme) => ({
  outcomes: {
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
      <TitleDescription
        title={data?.title || ''}
        description={data?._rawDescription}
      ></TitleDescription>
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
