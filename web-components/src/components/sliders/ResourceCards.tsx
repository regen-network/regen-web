import React from 'react';
import { Variant } from '@material-ui/core/styles/createTypography';
import { useTheme } from '@material-ui/core';

import ResourcesCard, { ResourcesCardProps } from '../cards/ResourcesCard';
import ResponsiveSlider from './ResponsiveSlider';

export interface ResourceCardsProps {
  items: ResourcesCardProps[];
  titleVariant?: Variant;
  imageClassName?: string;
  arrows?: boolean;
  slidesToShow?: number;
  title?: string;
  className?: string;
}

export default function ResourceCards({
  items,
  titleVariant,
  slidesToShow,
  arrows = false,
  title,
  className,
}: ResourceCardsProps): JSX.Element {
  const theme = useTheme();
  return (
    <ResponsiveSlider
      className={className}
      titleVariant={titleVariant}
      title={title}
      slidesToShow={slidesToShow}
      arrows={arrows}
      itemWidth={`${theme.spacing(91.75)}`}
      items={items.map(item => (
        <ResourcesCard
          image={item.image}
          title={item.title}
          updated={item.updated}
          description={item.description}
          buttonText={item.buttonText}
          link={item.link}
        />
      ))}
    />
  );
}
