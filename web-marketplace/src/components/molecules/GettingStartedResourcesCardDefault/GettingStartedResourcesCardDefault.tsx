import { GettingStartedResourcesCard } from 'web-components/src/components/cards/GettingStartedResourcesCard';
import { getLinkTarget } from 'web-components/src/utils/linkTarget';

import {
  GettingStartedResourcesCard as GettingStartedResourcesCardType,
  Maybe,
} from 'generated/sanity-graphql';
import { getBtnHref } from 'lib/button';
import { getSanityImgSrc } from 'lib/imgSrc';

import { Link } from 'components/atoms';

type Props = {
  card: Maybe<GettingStartedResourcesCardType>;
};

export const GettingStartedResourcesCardDefault = ({
  card,
}: Props): JSX.Element => (
  <>
    {card && (
      <GettingStartedResourcesCard
        fullWidth
        header={card.header}
        description={card.descriptionRaw}
        imageUrl={getSanityImgSrc(card.image)}
        mobileImageUrl={getSanityImgSrc(card.mobileImage)}
        links={
          card.links?.map(link => ({
            buttonText: link?.buttonText,
            buttonHref: getBtnHref(link),
            buttonTarget: getLinkTarget(link?.buttonBlankTarget),
          })) || []
        }
        linkComponent={Link}
      />
    )}
  </>
);
