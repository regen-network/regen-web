import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Img from "gatsby-image";

import Title from 'web-components/lib/components/title';
import ImageItem, { ImageItemProps } from 'web-components/lib/components/image-item';
import Section from '../../components';

const useStyles = makeStyles((theme: Theme) => ({

}));

// TODO Get from yaml/md
const items: ImageItemProps[] = [
  {
    img: 
  }
]

const ApproachSection = () => {
  const classes = useStyles({});
  return (
    <Section>
      <Title variant="subtitle1">
        Our innovative approach directly incentivizes land stewards to do good for the planet
      </Title>
    </Section>
  );
};

export default ApproachSection;
