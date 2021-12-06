import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { GatsbyImage, GatsbyImageData } from 'gatsby-plugin-image';

import { Theme } from 'web-components/lib/theme/muiTheme';
import BackgroundSection from '../../../components/BackgroundSection';
import Description from 'web-components/lib/components/description';

interface Figure {
  title?: string;
  spacing?: string;
  image: {
    childImageSharp: {
      gatsbyImageData: GatsbyImageData;
    };
  };
}

interface FigureSectionProps {
  title?: string;
  background: {
    childImageSharp: {
      gatsbyImageData: GatsbyImageData;
    };
  };
  figures: Figure[];
}

interface StyleProps {
  figures: Figure[];
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  figureTitle: {
    lineHeight: '150%',
    [theme.breakpoints.down('xs')]: {
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

const FigureSection = ({ background, title, figures }: FigureSectionProps): JSX.Element => {
  const classes = useStyles({ figures });

  return (
    <BackgroundSection topSection={false} linearGradient="unset" imageData={background.childImageSharp.gatsbyImageData}>
      <Grid container spacing={4}>
        {figures.map((figure: Figure, i: number) => (
          <Grid key={i} item xs={12} className={classes.item}>
            <GatsbyImage
              image={figure.image.childImageSharp.gatsbyImageData}
              className={classes.image} />
            {figure.title && <Description className={classes.figureTitle}>{figure.title}</Description>}
          </Grid>
        ))}
      </Grid>
      {title && <Description className={classes.figureTitle}>{title}</Description>}
    </BackgroundSection>
  );
};

export default FigureSection;
