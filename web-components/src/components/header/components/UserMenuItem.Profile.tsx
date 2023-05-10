import { Box, Grid } from '@mui/material';

import Card from '../../cards/Card';
import CheckIcon from '../../icons/CheckIcon';
import { Body, Subtitle } from '../../typography';
import UserAvatar from '../../user/UserAvatar';

export type UserMenuItemProfileProps = {
  profileImage: string;
  name: string;
  address: string;
  selected?: boolean;
};

const UserMenuItemProfile: React.FC<UserMenuItemProfileProps> = ({
  profileImage,
  name,
  address,
  selected = false,
}) => {
  return (
    <Card
      borderColor={selected ? undefined : 'transparent'}
      sx={{
        p: 2.5,
        mb: 2.5,
        backgroundColor: selected ? 'grey.50' : 'primary.main',
      }}
    >
      <Grid container>
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
              <CheckIcon sx={{ width: 13, height: 13 }} />
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
