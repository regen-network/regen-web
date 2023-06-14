import { Link } from '@mui/material';
import { SxProps } from '@mui/system';

import { Box, Flex } from '../../../components/box';
import SmallArrowIcon from '../../../components/icons/SmallArrowIcon';
import { Body, Label } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { LinkType } from '../../../types/shared/linkType';
import { CreditClassCardItemType } from './CreditClassCard.types';
import { isLinkItem, isTextItem } from './CreditClassCard.utils';

type Props = {
  label: string;
  item?: CreditClassCardItemType;
  link?: Partial<LinkType>;
  sx?: SxProps<Theme>;
};

export const CreditClassCardItem = ({ label, link, item, sx }: Props) => {
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
          {isLinkItem(link) && (
            <Link
              href={link.href}
              target="_blank"
              onClick={e => e.stopPropagation()}
              sx={{ color: 'secondary.main', fontSize: 14, fontWeight: 700 }}
            >
              {link.text}
              <SmallArrowIcon
                sx={{ verticalAlign: 'middle', ml: 1, height: 10 }}
              />
            </Link>
          )}
          {isTextItem(link) && <Box sx={{ fontSize: 14 }}>{link.text}</Box>}
        </Flex>
      </Box>
    </Flex>
  );
};
