import React from 'react';
import { Variant } from '@material-ui/core/styles/createTypography';

import ImageItem, { ImageItemProps } from '../image-item';
import ResponsiveSlider from './ResponsiveSlider';

export interface ImageItemsProps {
  items: ImageItemProps[];
  titleVariant?: Variant;
  imageHeight?: string;
  arrows?: boolean;
  slidesToShow?: number;
  title?: string;
  className?: string;
}

export default function ImageItems({
  items,
  imageHeight,
  titleVariant,
  slidesToShow,
  arrows = false,
  title,
  className,
}: ImageItemsProps): JSX.Element {
  return (
    <ResponsiveSlider
      className={className}
      imageHeight={imageHeight}
      titleVariant={titleVariant}
      title={title}
      slidesToShow={slidesToShow}
      arrows={arrows}
      items={items.map(item => (
        <ImageItem
          imageHeight={imageHeight}
          img={item.img}
          title={item.title}
          titleVariant={titleVariant}
          description={item.description}
        />
      ))}
    />
  );
}
