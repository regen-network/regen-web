import { ReactNode } from 'react';
import Slider, { Settings } from 'react-slick';
import { SxProps } from '@mui/material';

import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import Section from '../Section';
import { carrouselDefaultSettings } from './CarouselSection.config';

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
      sx={[{ maxWidth: '100%' }, ...sxToArray(sx)]}
    >
      <Slider {...carrouselDefaultSettings} {...settings}>
        {children}
      </Slider>
    </Section>
  );
};

export { CarouselSection };
