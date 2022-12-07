import { tabsStyles } from 'styles/tabs';

import { Flex } from 'web-components/lib/components/box';
import Card from 'web-components/lib/components/cards/Card';
import { GettingStartedResourcesCard } from 'web-components/lib/components/cards/GettingStartedResourcesCard';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';
import { getLinkTarget } from 'web-components/lib/utils/linkTarget';

import { useAllBridgePageQuery } from 'generated/sanity-graphql';
import { getBtnHref } from 'lib/button';
import { getSanityImgSrc } from 'lib/imgSrc';
import { client } from 'sanity';

import { Link } from 'components/atoms';

import { useActiveTab } from './hooks/useActiveTab';

export const Bridge = ({
  tabs,
  hideTabIndicator,
}: {
  tabs: IconTabProps[];
  hideTabIndicator?: boolean;
}): JSX.Element => {
  const { data } = useAllBridgePageQuery({ client });
  const card = data?.allBridgePage?.[0]?.gettingStartedResourcesCard;
  const activeTab = useActiveTab(tabs);

  return (
    <Flex flexDirection="column" sx={{ width: '100%' }}>
      <Card sx={{ mb: 5 }}>
        <IconTabs
          tabs={tabs}
          size={'xl'}
          sxs={tabsStyles.tabsInsideCard}
          hideIndicator={hideTabIndicator}
          activeTab={activeTab}
          linkComponent={Link}
        />
      </Card>
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
    </Flex>
  );
};
