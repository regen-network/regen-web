import { SxProps } from '@mui/system';

import { Box, Flex } from '../../../components/box';
import SmallArrowIcon from '../../../components/icons/SmallArrowIcon';
import { Body, Label } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { LinkComponentType } from '../../../types/shared/linkComponentType';
import { LinkType } from '../../../types/shared/linkType';
import { CreditClassCardItemType } from './CreditClassCard.types';

type Props = {
  label: string;
  item?: CreditClassCardItemType;
  link?: LinkType;
  linkComponent?: LinkComponentType;
  sx?: SxProps<Theme>;
};

export const CreditClassCardItem = ({
  label,
  link,
  item,
  linkComponent,
  sx,
}: Props) => {
  const { name, icon } = item ?? {};
  return (
    <Flex sx={[...(Array.isArray(sx) ? sx : [sx])]} flexDirection="column">
      <Label size="xs" sx={{ mb: 1.25 }}>
        {label}
      </Label>
      <Box component="ul" sx={{ pl: 0, my: 0 }}>
        <Flex component="li" key={name} alignItems="center">
          {icon && icon.src && (
            <Box
              component="img"
              src={icon?.src}
              alt={icon?.alt}
              sx={{ mr: 2.5, width: 24, height: 24 }}
            />
          )}
          {name && <Body>{name}</Body>}
          {link && linkComponent && (
            <Box
              component={linkComponent}
              href={link.text}
              sx={{ color: 'secondary.main', fontSize: 14, fontWeight: 700 }}
            >
              {link.text}
              <SmallArrowIcon
                sx={{ verticalAlign: 'middle', ml: 1, height: 10 }}
              />
            </Box>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};
