import { Body } from 'web-components/src/components/typography';

import { LinkWithArrow } from '../../atoms/LinkWithArrow';
import { BasketGridItem } from './BasketOverview.GridItem';

interface ItemProps {
  label: string;
  data: string;
  link?: string;
}

export const BasketItem = ({ label, data, link }: ItemProps): JSX.Element => {
  return (
    <BasketGridItem label={label}>
      <Body styleLinks={false} mobileSize="md" color="info.dark">
        <LinkWithArrow href={link} label={data} />
      </Body>
    </BasketGridItem>
  );
};
