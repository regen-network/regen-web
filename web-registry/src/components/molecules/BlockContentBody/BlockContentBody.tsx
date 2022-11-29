import { BlockContent } from 'web-components/lib/components/block-content';
import { Body } from 'web-components/lib/components/typography';

import { Scalars } from 'generated/sanity-graphql';

export interface Props {
  body: Scalars['JSON'];
}

const BlockContentBody = ({ body }: Props): JSX.Element => (
  <Body
    size="xl"
    textAlign="center"
    sx={{ margin: '0 auto', maxWidth: 800, pb: { xs: 12.5, sm: 12.5 } }}
  >
    <BlockContent content={body} />
  </Body>
);

export { BlockContentBody };
