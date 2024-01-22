import React from 'react';
import { SxProps } from '@mui/material';

import { ImageItemProps } from 'web-components/src/components/image-item';
import Section from 'web-components/src/components/section';
import ImageItems from 'web-components/src/components/sliders/ImageItems';
import { Theme } from 'web-components/src/theme/muiTheme';

import { ImageItemsSection as ImageItemsSectionProps } from '../../../generated/sanity-graphql';
import { useImageItemsStyles } from './ImageItemsSection.styles';

interface Props {
  content: ImageItemsSectionProps;
  sx?: {
    root?: SxProps<Theme>;
    title?: SxProps<Theme>;
    description?: SxProps<Theme>;
    imageItem?: { title: SxProps<Theme> };
  };
}

const ImageItemsSection: React.FC<React.PropsWithChildren<Props>> = ({
  content,
  sx,
}) => {
  const { classes: styles } = useImageItemsStyles();
  const imageItems: ImageItemProps[] =
    content?.imageCards?.map(i => ({
      img: <img src={i?.icon?.asset?.url || ''} alt={`${i?.title}`} />,
      title: i?.title || '',
      description: i?.descriptionRaw[0]?.children[0]?.text,
    })) || [];

  return (
    <Section
      withSlider
      className={styles.root}
      title={content?.title || ''}
      description={content?.description ?? ''}
      sx={sx}
    >
      <ImageItems items={imageItems} sx={sx?.imageItem} />
    </Section>
  );
};

export { ImageItemsSection };
