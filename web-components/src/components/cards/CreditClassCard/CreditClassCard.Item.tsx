import { Link } from '@mui/material';
import { SxProps } from '@mui/system';

import { Box, Flex } from '../../../components/box';
import SmallArrowIcon from '../../../components/icons/SmallArrowIcon';
import { Body, Label } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { LinkType } from '../../../types/shared/linkType';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { CreditClassCardItemType } from './CreditClassCard.types';
import { isLinkItem, isTextItem } from './CreditClassCard.utils';

type Props = {
  label: string;
  items?: CreditClassCardItemType[];
  link?: Partial<LinkType>;
  sx?: SxProps<Theme>;
  sxListContainer?: SxProps<Theme>;
  sxListItem?: SxProps<Theme>;
};

export const CreditClassCardItem = ({
  label,
  link,
  items,
  sx,
  sxListContainer,
  sxListItem,
}: Props) => {
  return (
    <Flex sx={[...(Array.isArray(sx) ? sx : [sx])]} flexDirection="column">
      <Label size="xs" sx={{ mb: 1.25 }}>
        {label}
      </Label>
      <Flex
        component="ul"
        sx={[
          { alignItems: 'center', pl: 0, my: 0 },
          ...sxToArray(sxListContainer),
        ]}
      >
        {items?.map(({ name, icon }) => (
          <Flex key={name} component="li" sx={[...sxToArray(sxListItem)]}>
            {icon && <div className="flex mr-10">{icon}</div>}
            {name && typeof name == 'string' && <Body>{name}</Body>}
          </Flex>
        ))}
        {isLinkItem(link) && (
          <Link
            href={link?.href}
            target="_blank"
            onClick={e => e.stopPropagation()}
            sx={{ color: 'secondary.main', fontSize: 14, fontWeight: 700 }}
          >
            {link?.text}
            <SmallArrowIcon
              sx={{ verticalAlign: 'middle', ml: 1, height: 10 }}
            />
          </Link>
        )}
        {isTextItem(link) && <Box sx={{ fontSize: 14 }}>{link.text}</Box>}
      </Flex>
    </Flex>
  );
};
