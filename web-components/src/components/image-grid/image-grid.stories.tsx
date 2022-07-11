import ImageGrid from '.';

export default {
  title: 'Image Grid',
  component: ImageGrid,
};
const titleText = 'Verified outcomes';
const descriptionText =
  'Software-based and remote-sensing monitoring keeps costs low and transparency high.';

export const imageGrid = (): JSX.Element => (
  <ImageGrid
    even={true}
    img={<img src="./andover.jpg" alt="andover" />}
    title={titleText}
    description={descriptionText}
  />
);
