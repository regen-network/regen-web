import { BlockContent } from 'web-components/src/components/block-content';
import { Body } from 'web-components/src/components/typography';

import { Scalars } from 'generated/sanity-graphql';

export interface Props {
  body: Scalars['JSON'];
  className?: string;
}

const BlockContentBody = ({ body, className }: Props): JSX.Element => (
  <Body
    size="xl"
    textAlign="center"
    sx={{
      mx: 'auto',
      mt: { xs: -4, sm: 0 },
      maxWidth: 800,
      pb: { xs: 7.5, sm: 12.5 },
    }}
    className={className}
  >
    <BlockContent content={body} />
  </Body>
);

export { BlockContentBody };
