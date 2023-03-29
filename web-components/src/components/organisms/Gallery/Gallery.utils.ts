import { UseStateSetter } from '../../../types/react/useState';

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
export const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

type PaginateGalleryParams = {
  newDirection: number;
  page: number;
  setPage: UseStateSetter<[number, number]>;
};

export const paginateGallery = ({
  newDirection,
  page,
  setPage,
}: PaginateGalleryParams) => {
  setPage([page + newDirection, newDirection]);
};
