import React, { useState } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ReactHtmlParser from 'react-html-parser';

import Section from 'web-components/lib/components/section';

interface ProjectTopProps {

}

const useStyles = makeStyles((theme: Theme) => ({
}));

export default function ProjectTop(): JSX.Element {
  const classes = useStyles();
  return (
  <Section>
    <Grid container>
      <Grid item xs={12} sm={7}>
        <Title variant="h1">{project.name}</Title>
        <div className={classes.projectPlace}>
          <ProjectPlaceInfo place={project.place} area={project.area} areaUnit={project.areaUnit} />
        </div>
      </Grid>
      <Grid item xs={12} sm={5}></Grid>
    </Grid>
  </Section>
  );
}