import React from 'react';
import { FluidObject } from 'gatsby-image';

import BackgroundSection from '../../../components/BackgroundSection';

interface TopSectionProps {
  background: FluidObject;
  name: string;
}

const TopSection = ({ background, name }: TopSectionProps): JSX.Element => {
  const gradient =
    name === 'Fibershed' // hacky but only Fibershed case study requires a different gradient per design
      ? 'linear-gradient(180deg, rgba(255, 249, 238, 0.74) 0%, rgba(255, 249, 238, 0) 46.68%), linear-gradient(209.5deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)'
      : 'linear-gradient(180deg, rgba(255, 249, 238, 0.74) 0%, rgba(255, 249, 238, 0) 46.68%), linear-gradient(209.5deg, rgba(250, 235, 209, 0.8) 12.63%, rgba(125, 201, 191, 0.8) 44.03%, rgba(81, 93, 137, 0.8) 75.43%)';
  const gradientMobile =
    'linear-gradient(209.5deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)';

  return (
    <BackgroundSection
      linearGradient={gradient}
      linearGradientMobile={gradientMobile}
      header={`Case Study: ${name}`}
      imageData={background}
    />
  );
};

export default TopSection;
