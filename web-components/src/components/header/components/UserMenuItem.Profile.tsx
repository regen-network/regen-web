import { Box, Grid } from '@mui/material';

import Card from '../../cards/Card';
import CheckIcon from '../../icons/CheckIcon';
import { Body, Subtitle } from '../../typography';
import UserAvatar from '../../user/UserAvatar';
import { OnProfileClickType } from './UserMenuItem.types';

export type UserMenuItemProfileProps = {
  id: string;
  profileImage: string;
  name: string;
  address?: string | null;
  selected?: boolean;
  onProfileClick?: OnProfileClickType;
};

const UserMenuItemProfile: React.FC<UserMenuItemProfileProps> = ({
  id,
  profileImage,
  name,
  address,
  selected = false,
  onProfileClick,
}) => {
  return (
    <Card
      className={`${
        selected
          ? 'border-grey-300 bg-grey-100'
          : 'border-transparent bg-grey-0'
      } w-full shadow-none cursor-pointer mx-10 p-10 mb-10`}
      onClick={() => onProfileClick && onProfileClick(id, selected)}
    >
      <Grid container wrap="nowrap">
        <Grid item mr={3} position="relative">
          <UserAvatar size="medium" src={profileImage} />
          {selected && (
            <Box
              sx={{
                width: 13,
                height: 13,
                borderRadius: '50%',
                backgroundColor: 'secondary.light',
                display: 'flex',
                position: 'absolute',
                right: 0,
                bottom: 12,
              }}
            >
              <CheckIcon className="w-[13px] h-[13px] text-brand-400" />
            </Box>
          )}
        </Grid>
        <Grid item>
          <Subtitle size="lg">{name}</Subtitle>
          <Body size="sm">{address}</Body>
        </Grid>
      </Grid>
    </Card>
  );
};

export { UserMenuItemProfile };
