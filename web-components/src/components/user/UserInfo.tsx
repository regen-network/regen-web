import { isValidElement } from 'react';
import { Link, SxProps } from '@mui/material';
import Grid, { GridDirection } from '@mui/material/Grid';

import { headerFontFamily, Theme } from '../../theme/muiTheme';
import { BlockContent, SanityBlockContent } from '../block-content';
import { Body, Subtitle, Title } from '../typography';
import { getMobileSize, getSizeVariant, TextSize } from '../typography/sizing';
import UserAvatar from './UserAvatar';
import { UserInfoTypes } from './UserInfo.types';

export interface User {
  name: string;
  nameRaw?: string | JSX.Element | SanityBlockContent;
  type: UserInfoTypes;
  location?: string;
  image?: string | null;
  description?: string | null;
  link?: string | null;
}

export interface Account extends User {
  address: string;
}

interface UserInfoProps {
  user: User;
  size?: TextSize;
  fontFamily?: string;
  direction?: GridDirection;
  titleComponent?: 'title' | 'subtitle';
  border?: boolean;
  sx?: SxProps<Theme>;
  avatarSx?: SxProps<Theme>;
}
export default function UserInfo({
  user,
  size = 'lg',
  fontFamily = headerFontFamily,
  direction,
  border = true,
  titleComponent = 'title',
  sx = [],
  avatarSx = [],
}: UserInfoProps): JSX.Element {
  const sizeVariant = getSizeVariant(size);
  const mobileSizeVariant = getSizeVariant(getMobileSize(size));
  const TitleComponent = titleComponent === 'title' ? Title : Subtitle;
  const { name: userName, nameRaw } = user;
  const name = nameRaw ? (
    isValidElement(nameRaw) ? (
      nameRaw
    ) : (
      <BlockContent content={nameRaw} />
    )
  ) : (
    <TitleComponent
      sx={({ typography }) => {
        return {
          fontFamily,
          fontSize: [
            typography[mobileSizeVariant].fontSize,
            typography[sizeVariant].fontSize,
          ],
        };
      }}
    >
      {userName}
    </TitleComponent>
  );

  return (
    <Grid container direction={direction} wrap="nowrap" sx={sx}>
      <Grid item>
        <UserAvatar
          alt={userName}
          src={user.image}
          href={user.link}
          size={size}
          border={border}
          icon={user.image}
          sx={avatarSx}
        />
      </Grid>
      <Grid
        item
        sx={{
          ml: size === 'xs' ? 3.5 : 4.8,
          textAlign: direction === 'column' ? 'center' : 'left',
          pt: 2,
        }}
      >
        {user.link ? (
          <Link sx={{ color: 'primary.contrastText' }} href={user.link}>
            {name}
          </Link>
        ) : (
          name
        )}
        {user.location && (
          <Body size="sm" pt={1.6}>
            {user.location}
          </Body>
        )}
        {user.description && (
          <Body size="xs" pt={2.8}>
            {user.description}
          </Body>
        )}
      </Grid>
    </Grid>
  );
}
