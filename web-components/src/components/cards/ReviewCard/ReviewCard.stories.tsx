import { ReviewCard } from './ReviewCard';
import { ItemDisplay } from './ReviewCard.ItemDisplay';
import { Photo } from './ReviewCard.Photo';

export default {
  title: 'Cards/ReviewCard',
  Component: ReviewCard,
};

const onClick = () => void null;

const imgSrc =
  'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80';

export const reviewCardBase = () => (
  <ReviewCard title="review card" onEditClick={onClick} editText="Edit">
    body
  </ReviewCard>
);

export const itemDisplay = () => (
  <ItemDisplay name="Item">Some content</ItemDisplay>
);

export const photo = () => <Photo src={imgSrc} locationText="Location" />;

export const reviewCard = () => (
  <ReviewCard title="review card" onEditClick={onClick} editText="Edit">
    <Photo src={imgSrc} locationText="Location" />
  </ReviewCard>
);
