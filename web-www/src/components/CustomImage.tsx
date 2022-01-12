import React from 'react';
import SanityImage from 'gatsby-plugin-sanity-image';

/**
 *
 * Takes the output of our `customImage` sanity schema and returns a normal image for URLs, or an optimized sanity image for content uploaded to the CMS.
 * NOTE this should only be used within gatsby
 */
export const CustomImage: React.FC<{
  imageAlt: string;
  imageHref?: string;
  image?: any;
  className?: string;
}> = ({ imageAlt, imageHref, image, className }) => {
  if (imageHref) {
    // not optimized
    return <img className={className} src={imageHref} alt={imageAlt} />;
  }
  return <SanityImage {...image} className={className} alt={imageAlt} />;
};
