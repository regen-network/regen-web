import { Box, Grid } from '@mui/material';

import { CopyButton, CopyButtonProps } from '../../buttons/CopyButton';
import Card from '../../cards/Card';
import CheckIcon from '../../icons/CheckIcon';
import SmallArrowIcon from '../../icons/SmallArrowIcon';
import { Body, Subtitle } from '../../typography';
import UserAvatar from '../../user/UserAvatar';

export type UserMenuProfile = {
  id: string;
  profileImage: string;
  name: string;
  address?: string | null;
};
export type UserMenuItemProfileProps = UserMenuProfile & {
  onProfileClick: () => void;
  publicProfileText: string;
  copyText: Pick<CopyButtonProps, 'tooltipText' | 'toastText'>;
};

const UserMenuItemProfile: React.FC<UserMenuItemProfileProps> = ({
  profileImage,
  name,
  address,
  onProfileClick,
  publicProfileText,
  copyText,
}) => {
  return (
    <Card className="hover:border-grey-300 hover:bg-grey-100 border-[transparent] bg-grey-0 w-full shadow-none mx-10 p-5 max-w-[290px]">
      <Grid container wrap="nowrap">
        <Grid item mr={3} position="relative">
          <UserAvatar size="medium" src={profileImage} />
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
        </Grid>
        <Grid item>
          <Subtitle size="md">{name}</Subtitle>
          <div className="flex flex-row items-baseline gap-30">
            {address && (
              <div className="flex flex-row items-center gap-3 hover:underline">
                <Body size="xs">{address}</Body>
                <CopyButton
                  content={address}
                  {...copyText}
                  // eslint-disable-next-line lingui/no-unlocalized-strings
                  iconClassName="h-[14px] w-[14px] hover:text-ac-success-400 hover:stroke-none text-sc-icon-standard-disabled"
                />
              </div>
            )}
            <Subtitle
              className="underline text-sc-text-sub-header hover:text-sc-text-paragraph"
              size="xs"
              onClick={onProfileClick}
            >
              {publicProfileText}
              <SmallArrowIcon className="h-[8px] ml-3" />
            </Subtitle>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export { UserMenuItemProfile };
