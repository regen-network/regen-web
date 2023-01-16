import { Body } from 'web-components/lib/components/typography';
import { parseText } from 'web-components/lib/utils/textParser';

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
        {link ? <LinkWithArrow href={link} label={data} /> : parseText(data)}
      </Body>
    </BasketGridItem>
  );
};
