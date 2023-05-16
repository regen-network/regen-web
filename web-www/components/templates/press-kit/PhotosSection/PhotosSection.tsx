import Section from 'web-components/lib/components/section';
import ProjectMedia, {
  Media,
} from 'web-components/lib/components/sliders/ProjectMedia';

import { usePhotosSectionStyles } from './PhotosSection.styles';

import { PressKitPhotosSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  photosSectionData?: PressKitPhotosSectionFieldsFragment['photosSection'];
};

const PhotosSection = ({ photosSectionData }: Props): JSX.Element => {
  const { classes: styles } = usePhotosSectionStyles();
  const assets = (photosSectionData?.photos || []).map(photo => {
    return {
      src: photo?.asset?.url,
      thumbnail: photo?.asset?.url,
      type: 'image',
    } as Media;
  });

  return (
    <Section
      title={photosSectionData?.header || ''}
      classes={{ root: styles.root, title: styles.title }}
    >
      <div className={styles.slider}>
        <ProjectMedia xsBorderRadius assets={assets} />
      </div>
    </Section>
  );
};

export default PhotosSection;
