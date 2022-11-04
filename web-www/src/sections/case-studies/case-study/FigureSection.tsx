import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { Body } from '@regen-network/web-components/lib/components/typography';
import type { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import Img, { FluidObject } from 'gatsby-image';

import BackgroundSection from '../../../components/BackgroundSection';
import type {
  SanityCaseStudyFigure,
  SanityCaseStudyFigureSection,
} from '../../../generated/graphql';

interface StyleProps {
  figures: SanityCaseStudyFigure[];
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  image: {
    borderRadius: '10px',
  },
  item: props => ({
    [theme.breakpoints.up('sm')]: {
      flexGrow: 0,
      '&:first-child': {
        flexBasis:
          props.figures.length === 1
            ? '100%'
            : props.figures[0].spacing || '50%',
        maxWidth:
          props.figures.length === 1
            ? '100%'
            : props.figures[0].spacing || '50%',
      },
      '&:nth-of-type(2)': {
        flexBasis:
          props.figures.length === 1
            ? '100%'
            : props.figures[1].spacing || '50%',
        maxWidth:
          props.figures.length === 1
            ? '100%'
            : props.figures[1].spacing || '50%',
      },
    },
  }),
}));

const FigureSection: React.FC<SanityCaseStudyFigureSection> = ({
  background,
  title,
  figures,
}) => {
  const styles = useStyles({ figures: figures ?? [] });
  return (
    <BackgroundSection
      topSection={false}
      linearGradient="unset"
      imageData={background?.image?.asset?.fluid}
    >
      <Grid container spacing={4}>
        {figures?.map((figure, i) => (
          <Grid key={i} item xs={12} className={styles.item}>
            <Img
              fluid={figure?.image?.image?.asset?.fluid as FluidObject}
              className={styles.image}
            />
            {figure?.title && (
              <Body size="sm" pt={[3, 4]}>
                {figure.title}
              </Body>
            )}
          </Grid>
        ))}
      </Grid>
      {title && (
        <Body size="sm" pt={[3, 4]}>
          {title}
        </Body>
      )}
    </BackgroundSection>
  );
};

export default FigureSection;
