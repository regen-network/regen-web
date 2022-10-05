import { LinkWithArrow } from '../../atoms';

export const LinkOrDash = ({
  href,
  label,
}: {
  href?: string;
  label?: string;
}): JSX.Element => {
  if (!href) return <>-</>;
  return <LinkWithArrow href={href} label={label || ''} />;
};
