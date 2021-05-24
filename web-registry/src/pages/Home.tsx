import React from 'react';

import { HomeTemplate } from '../components/templates';
import { projects, creditClasses } from '../mocks';

import cowsImg from '../assets/cows-by-barn.png';
import topographyImg from '../assets/background.jpg';
import horsesImg from '../assets/horses-grazing.png';

const Home: React.FC = () => {
  return (
    <HomeTemplate
      creditClasses={creditClasses}
      topImg={cowsImg}
      topSectionTitle="Welcome to Regen Registry"
      topSectionDescription="Regen Registry is lrem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn."
      projectBackgroundImg={topographyImg}
      bottomBackgroundImg={horsesImg}
      projects={projects}
    />
  );
};

export { Home };
