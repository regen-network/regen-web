import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Img, { FluidObject } from 'gatsby-image';

import { Theme } from 'web-components/lib/theme/muiTheme';
import BackgroundSection from '../../../components/BackgroundSection';
import Description from 'web-components/lib/components/description';
import { SanityCaseStudyFigure, SanityCaseStudyFigureSection } from '../../../generated/graphql';

interface StyleProps {
  figures: SanityCaseStudyFigure[];
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  figureTitle: {
    lineHeight: '150%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
      paddingTop: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
      paddingTop: theme.spacing(4),
    },
  },
  image: {
    borderRadius: '10px',
  },
  item: props => ({
    [theme.breakpoints.up('sm')]: {
      flexGrow: 0,
      '&:first-child': {
        flexBasis: props.figures.length === 1 ? '100%' : props.figures[0].spacing || '50%',
        maxWidth: props.figures.length === 1 ? '100%' : props.figures[0].spacing || '50%',
      },
      '&:nth-child(2)': {
        flexBasis: props.figures.length === 1 ? '100%' : props.figures[1].spacing || '50%',
        maxWidth: props.figures.length === 1 ? '100%' : props.figures[1].spacing || '50%',
      },
    },
  }),
}));

const FigureSection: React.FC<SanityCaseStudyFigureSection> = ({ background, title, figures }) => {
  const styles = useStyles({ figures: figures ?? [] });
  return (
    <BackgroundSection topSection={false} linearGradient="unset" imageData={background?.image?.asset?.fluid}>
      <Grid container spacing={4}>
        {figures?.map((figure, i) => (
          <Grid key={i} item xs={12} className={styles.item}>
            <Img fluid={figure?.image?.image?.asset?.fluid as FluidObject} className={styles.image} />
            {figure?.title && <Description className={styles.figureTitle}>{figure.title}</Description>}
          </Grid>
        ))}
      </Grid>
      {title && <Description className={styles.figureTitle}>{title}</Description>}
    </BackgroundSection>
  );
};

export default FigureSection;
