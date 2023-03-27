import { ReactNode } from 'react';
import Slider, { Settings } from 'react-slick';
import { SxProps } from '@mui/material';

import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import Section from '../Section';
import { carouselDefaultSettings } from './CarouselSection.config';

export interface CarouselSectionProps {
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  settings?: Settings;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

const CarouselSection = ({
  title,
  description,
  children,
  settings = {},
  sx,
}: CarouselSectionProps) => {
  return (
    <Section
      title={title}
      description={description}
      sx={{ section: [{ maxWidth: '100%' }, ...sxToArray(sx)] }}
    >
      <Slider {...carouselDefaultSettings} {...settings}>
        {children}
      </Slider>
    </Section>
  );
};

export { CarouselSection };
