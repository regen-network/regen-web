import React from 'react';

import MediaCard, { MediaCardProps } from '../../cards/MediaCard';

const Photo: React.FC<MediaCardProps> = ({ imgSrc }) => (
  <MediaCard sx={{ mt: 9, mb: 2 }} imgSrc={imgSrc} backgroundGradient={false} />
);

export { Photo };
