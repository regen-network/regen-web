import { CollapseList } from '../organisms/CollapseList/CollapseList';
import { Subtitle } from '../typography';
import { TextSize } from '../typography/sizing';
import { ItemValue, LinkComponentProp } from './TxModal';

interface CardItemValueProps {
  value: ItemValue;
  color?: string;
  linkComponent: LinkComponentProp;
  size?: TextSize;
  mobileSize?: TextSize;
  className?: string;
}

export const CardItemValue = ({
  value,
  color,
  linkComponent: LinkComponent,
  size,
  mobileSize,
  className,
}: CardItemValueProps): JSX.Element => {
  return (
    <>
      {value.name && (
        <Subtitle
          className={className}
          key={value.name}
          size={size || 'lg'}
          mobileSize={mobileSize || 'sm'}
          color={color || 'info.dark'}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          {value.icon && value.icon}
          {value.url ? (
            <LinkComponent
              sx={{
                color: 'secondary.main',
              }}
              href={value.url}
              target={value.url.startsWith('/') ? '_self' : '_blank'}
            >
              {value.name}
            </LinkComponent>
          ) : (
            <>{value.name}</>
          )}
          {value.children && value.children}
        </Subtitle>
      )}
      {value.component}
    </>
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
