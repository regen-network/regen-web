import { Body } from 'web-components/src/components/typography';

import { LinkWithArrow } from 'components/atoms';

import { BasketGridItem } from './BasketOverview.GridItem';
import { CreditClass } from './BasketOverview.types';

interface ItemWithListProps {
  label: string;
  data: CreditClass[];
  link: string;
}

export const BasketItemWithLinkList = ({
  label,
  data,
  link,
}: ItemWithListProps): JSX.Element => {
  return (
    <BasketGridItem label={label}>
      {data.map(item => (
        <Body
          key={`baskets-${item.id}`}
          styleLinks={false}
          mobileSize="md"
          color="info.dark"
        >
          <LinkWithArrow
            href={link + item.id}
            label={item.name}
            sx={{ fontWeight: 'normal' }}
          />
        </Body>
      ))}
    </BasketGridItem>
  );
};
