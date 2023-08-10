import { LinkWithArrow, LinkWithArrowProps } from 'components/atoms';

export const ArrowLink = (props: LinkWithArrowProps): JSX.Element => (
  <LinkWithArrow sx={{ fontSize: { xs: '18px', sm: '22px' } }} {...props} />
);
