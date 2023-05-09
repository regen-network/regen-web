import { useCallback, useRef } from 'react';
import LazyLoad from 'react-lazyload';
import Slider from 'react-slick';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import { BlockContent } from 'web-components/lib/components/block-content';
import PrevNextButton from 'web-components/lib/components/buttons/PrevNextButton';
import ProjectImpactCard from 'web-components/lib/components/cards/ProjectImpactCard/ProjectImpactCard';
import Section from 'web-components/lib/components/section';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { EcologicalImpact } from '../../../generated/sanity-graphql';
import { getSanityImgSrc } from '../../../lib/imgSrc';
import { PROJECT_STANDARD_DEFAULT_VALUE } from './ProjectImpactSection.constants';
import { useProjectImpactSectionStyles } from './ProjectImpactSection.styles';
import { getSdgsImages } from './ProjectImpactSection.utils';

interface ProjectImpactProps {
  impact: Array<EcologicalImpact>;
  title?: string;
  classes?: {
    root?: string;
  };
}

function ProjectImpactSection({
  impact,
  title,
  classes,
}: ProjectImpactProps): JSX.Element {
  const { classes: styles, cx } = useProjectImpactSectionStyles();
  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  const hasButtons = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  const settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 857,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slider: any = useRef(null);

  const slickPrev = useCallback(() => {
    if (slider && slider.current) {
      slider.current.slickPrev();
    }
  }, [slider]);

  const slickNext = useCallback(() => {
    if (slider && slider.current) {
      slider.current.slickNext();
    }
  }, [slider]);

  const hasStandardLogo = impact.some(item => !!item.standard);
  const standardDefaultValue = hasStandardLogo
    ? PROJECT_STANDARD_DEFAULT_VALUE
    : undefined;

  return (
    <Section
      visibleOverflow
      classes={{
        root: cx(styles.root, classes?.root),
        title: styles.title,
      }}
      title={title || 'Impact'}
      titleVariant="h2"
      titleAlign="left"
      topRight={
        <>
          {hasButtons && (
            <Grid
              container
              justifyContent="flex-end"
              className={styles.buttons}
            >
              <PrevNextButton direction="prev" onClick={slickPrev} />
              <PrevNextButton direction="next" onClick={slickNext} />
            </Grid>
          )}
        </>
      }
    >
      <LazyLoad offset={300}>
        {isMobile ? (
          <div className={styles.swipe}>
            {impact.map(
              (
                { name, descriptionRaw, image, sdgs, standard },
                index: number,
              ) => (
                <div className={styles.item} key={index}>
                  <ProjectImpactCard
                    name={name}
                    description={<BlockContent content={descriptionRaw} />}
                    imgSrc={getSanityImgSrc(image)}
                    sdgs={getSdgsImages({ sdgs })}
                    standard={getSanityImgSrc(standard, standardDefaultValue)}
                    monitored={index === 0}
                  />
                </div>
              ),
            )}
          </div>
        ) : (
          <Slider
            {...settings}
            variableWidth
            ref={slider}
            className={styles.slider}
          >
            {impact.map(
              (
                { name, descriptionRaw, image, standard, sdgs },
                index: number,
              ) => (
                <ProjectImpactCard
                  key={index}
                  className={styles.item}
                  name={name}
                  description={<BlockContent content={descriptionRaw} />}
                  imgSrc={getSanityImgSrc(image)}
                  sdgs={getSdgsImages({ sdgs })}
                  standard={getSanityImgSrc(standard, standardDefaultValue)}
                  monitored={index === 0}
                />
              ),
            )}
          </Slider>
        )}
      </LazyLoad>
    </Section>
  );
}

export { ProjectImpactSection };
