import { useState } from 'react';
import { Collapse } from '@mui/material';

import { TextButton } from '../buttons/TextButton';
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
  const [expanded, setExpanded] = useState<boolean>(false);

  if (props.value.length <= 2) {
    return (
      <>
        {props.value.map(row => (
          <CardItemValue {...props} value={row} key={row.name} />
        ))}
      </>
    );
  }

  const alwaysVisible = props.value.slice(0, 2);
  const underCollapse = props.value.slice(2);

  return (
    <>
      {alwaysVisible.map(row => (
        <CardItemValue {...props} value={row} key={row.name} />
      ))}

      <TextButton
        textSize="xxs"
        onClick={() => setExpanded(!expanded)}
        sx={{
          px: [0],
          ':hover': { bgcolor: 'transparent !important' },
        }}
      >
        {expanded ? '- see less' : '+ see more'}
      </TextButton>

      <Collapse in={expanded}>
        {underCollapse.map(row => (
          <CardItemValue {...props} value={row} key={row.name} />
        ))}
      </Collapse>
    </>
  );
};
