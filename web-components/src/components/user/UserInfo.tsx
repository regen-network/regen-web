import { isValidElement } from 'react';
import { Link, SxProps } from '@mui/material';
import Grid, { GridDirection, GridProps } from '@mui/material/Grid';

import { headerFontFamily, Theme } from '../../theme/muiTheme';
import { formatDate } from '../../utils/format';
import { cn } from '../../utils/styles/cn';
import { BlockContent, SanityBlockContent } from '../block-content';
import { TextButton } from '../buttons/TextButton';
import { LinkComponentProp } from '../modal/ConfirmModal';
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
  timestamp?: string;
  tag?: string;
}

export interface Account extends User {
  address: string;
  id?: string;
}

interface UserInfoProps {
  user: User;
  size?: TextSize;
  fontFamily?: string;
  direction?: GridDirection;
  titleComponent?: 'title' | 'subtitle';
  border?: boolean;
  sx?: SxProps<Theme>;
  nameHasPadding?: boolean;
  classNames?: {
    info?: string;
    title?: string;
    timestamp?: string;
  };
  linkComponent?: LinkComponentProp;
  alignItems?: GridProps['alignItems'];
}
export default function UserInfo({
  user,
  size = 'lg',
  fontFamily = headerFontFamily,
  direction,
  border = true,
  titleComponent = 'title',
  sx = [],
  nameHasPadding = true,
  classNames,
  linkComponent: LinkComponent = Link,
  alignItems = 'center',
}: UserInfoProps): JSX.Element {
  const sizeVariant = getSizeVariant(size);
  const mobileSizeVariant = getSizeVariant(getMobileSize(size));
  const TitleComponent = titleComponent === 'title' ? Title : Subtitle;
  const { name: userName, nameRaw } = user;
  const name = nameRaw ? (
    isValidElement(nameRaw) ? (
      nameRaw
    ) : (
      <BlockContent className={classNames?.title} content={nameRaw} />
    )
  ) : (
    <TitleComponent
      className={classNames?.title}
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
    <Grid
      container
      direction={direction}
      wrap="nowrap"
      sx={sx}
      alignItems={alignItems}
    >
      <Grid item>
        <UserAvatar
          alt={userName}
          src={user.image}
          href={user.link}
          size={size}
          border={border}
          icon={user.image}
        />
      </Grid>
      <Grid
        item
        sx={{
          ml: nameHasPadding ? (size === 'xs' ? 3.5 : 4.8) : 0,
          textAlign: direction === 'column' ? 'center' : 'left',
          pt: nameHasPadding ? 2 : 0,
        }}
        className={classNames?.info}
      >
        <Grid container alignItems="center">
          <Grid item>
            {user.link ? (
              <LinkComponent
                sx={{ color: 'primary.contrastText' }}
                href={user.link}
              >
                {name}
              </LinkComponent>
            ) : (
              name
            )}
          </Grid>
          {user.tag && (
            <TextButton className="cursor-default ml-5 text-[10px] text-grey-500 bg-grey-300 rounded hover:text-grey-500 hover:bg-grey-300 leading-[18px] min-w-fit px-3">
              {user.tag}
            </TextButton>
          )}
        </Grid>
        {user.timestamp && (
          <Body
            size="md"
            className={cn('text-grey-400 pt-5', classNames?.timestamp)}
          >
            {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
            {formatDate(user.timestamp, 'MMMM D, YYYY | h:mm A')}
          </Body>
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
