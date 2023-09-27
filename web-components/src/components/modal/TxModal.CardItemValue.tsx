import { CollapseList } from '../organisms/CollapseList/CollapseList';
import { Subtitle } from '../typography';
import { ItemValue, LinkComponentProp } from './TxModal';

interface CardItemValueProps {
  value: ItemValue;
  color?: string;
  linkComponent: LinkComponentProp;
}

export const CardItemValue = ({
  value,
  color,
  linkComponent: LinkComponent,
}: CardItemValueProps): JSX.Element => {
  return (
    <Subtitle
      key={value.name}
      size="lg"
      mobileSize="sm"
      color={color || 'info.dark'}
    >
      {value.icon && value.icon}
      {value.url ? (
        <LinkComponent
          sx={{ color: 'secondary.main' }}
          href={value.url}
          target={value.url.startsWith('/') ? '_self' : '_blank'}
        >
          {value.name}
        </LinkComponent>
      ) : (
        <>{value.name}</>
      )}
    </Subtitle>
  );
};

interface CardItemValueListProps {
  value: ItemValue[];
  color?: string;
  linkComponent: LinkComponentProp;
}

export const CardItemValueList = (
  props: CardItemValueListProps,
): JSX.Element => {
  return (
    <CollapseList
      buttonTextSize="xxs"
      max={2}
      items={props.value.map(row => (
        <CardItemValue {...props} value={row} key={row.name} />
      ))}
    />
  );
};
