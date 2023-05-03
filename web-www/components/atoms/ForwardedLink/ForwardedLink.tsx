import React from 'react';
import Link, { LinkProps } from '@mui/material/Link';

type Props = LinkProps & {
  href: string;
};

const ForwardedLink = React.forwardRef<HTMLAnchorElement, Props>(
  (props, ref) => {
    const { target, ...rest } = props;
    return <Link ref={ref} target={target || '_blank'} {...rest} />;
  },
);

ForwardedLink.displayName = 'ForwardedLink';

export default ForwardedLink;
