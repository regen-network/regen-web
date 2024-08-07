import { TextButton } from '../buttons/TextButton';
import { CollapseList } from '../organisms/CollapseList/CollapseList';
import { Subtitle } from '../typography';
import { TextSize } from '../typography/sizing';
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
    <div className="flex">
      {value.label && (
        <TextButton
          textSize="sm"
          className="font-extrabold text-grey-400 hover:text-grey-400 pr-3"
        >
          {value.label}:
        </TextButton>
      )}
      <Subtitle
        className={value.className}
        key={value.name}
        size={value.size || 'lg'}
        mobileSize={value.mobileSize || 'sm'}
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
    </div>
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
