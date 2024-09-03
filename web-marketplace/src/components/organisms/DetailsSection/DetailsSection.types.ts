import { SxProps } from '@mui/material';

import { SanityBlockContent } from 'web-components/src/components/block-content';
import { Theme } from 'web-components/src/theme/muiTheme';

import { DetailsCard, DetailsSection, Maybe } from 'generated/sanity-graphql';
import { CompactedNameUrl } from 'lib/rdf/types';

export interface DetailsSectionProps {
  header?: Maybe<DetailsSection>;
  credibilityCards?: Maybe<Array<Maybe<DetailsCard>>>;
  methodology?: CompactedNameUrl;
  creditClassDoc?: CompactedNameUrl;
  credit?: {
    creditImage?: string | null;
    creditTypeUnit?: string;
    creditTypeImage?: string | null;
    creditTypeUnitDefinition?: SanityBlockContent | null;
  };
  sx?: SxProps<Theme>;
}
